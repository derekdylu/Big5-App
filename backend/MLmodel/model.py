import numpy as np
import pandas as pd

import os
import pickle as pickle

import torch
import torch.nn as nn
from torchinfo import summary
from functools import partial
import torch.nn.functional as F


def load_checkpoint(model=None, optimizer=None, filepath=None):

  if not os.path.isfile(filepath):
    print('Warning: No checkpoint exists')
    return 0
  print("Loading checkpoint '{}'".format(filepath))
  if torch.cuda.is_available():
    # Load all tensors onto previous state
    model.cuda() # move to cuda before load state, or else error will occur at optimizer.step
    checkpoint = torch.load(filepath)
  else:
    # Load all tensors onto the CPU
    checkpoint = torch.load(filepath, map_location=lambda storage, loc: storage)
  epoch = checkpoint['epoch']
  if optimizer:
    try:
      optimizer.load_state_dict(checkpoint['optimizer'])
    except ValueError as err:
      print('[WARNING]', err)
      print('[WARNING] optimizer not restored from last checkpoint, continue without previous state')

  if model:
    model.load_state_dict(checkpoint['model'])  # _extract_state_from_dataparallel
    return epoch

"""#### Backbone

https://github.com/kenshohara/3D-ResNets-PyTorch
"""



def get_inplanes():
    return [64, 128, 256, 512]


def conv3x3x3(in_planes, out_planes, stride=1):
    return nn.Conv3d(in_planes, out_planes, kernel_size=3, stride=stride, padding=1, bias=False)

def conv1x1x1(in_planes, out_planes, stride=1):
    return nn.Conv3d(in_planes, out_planes, kernel_size=1, stride=stride, bias=False)

class BasicBlock(nn.Module):
    expansion = 1

    def __init__(self, in_planes, planes, stride=1, downsample=None, dropout_rate = 0):
        super().__init__()

        self.conv1 = conv3x3x3(in_planes, planes, stride)
        self.bn1 = nn.BatchNorm3d(planes)
        self.relu = nn.ReLU(inplace=True)
        self.dropout1 = nn.Dropout(dropout_rate)
        self.conv2 = conv3x3x3(planes, planes)
        self.bn2 = nn.BatchNorm3d(planes)
        self.dropout2 = nn.Dropout(dropout_rate)
        self.downsample = downsample
        self.stride = stride

    def forward(self, x):
        residual = x

        out = self.conv1(x)
        out = self.bn1(out)
        out = self.relu(out)
        out = self.dropout1(out)
        out = self.conv2(out)
        out = self.bn2(out)
        out = self.dropout2(out)

        if self.downsample is not None:
            residual = self.downsample(x)

        out += residual
        out = self.relu(out)

        return out

class Bottleneck(nn.Module):  # block for deeper layers
    expansion = 4

    def __init__(self, in_planes, planes, stride=1, downsample=None):
        super().__init__()

        self.conv1 = conv1x1x1(in_planes, planes)
        self.bn1 = nn.BatchNorm3d(planes)
        self.conv2 = conv3x3x3(planes, planes, stride)
        self.bn2 = nn.BatchNorm3d(planes)
        self.conv3 = conv1x1x1(planes, planes * self.expansion)
        self.bn3 = nn.BatchNorm3d(planes * self.expansion)
        self.relu = nn.ReLU(inplace=True)
        self.downsample = downsample
        self.stride = stride

    def forward(self, x):
        residual = x

        out = self.conv1(x)
        out = self.bn1(out)
        out = self.relu(out)

        out = self.conv2(out)
        out = self.bn2(out)
        out = self.relu(out)

        out = self.conv3(out)
        out = self.bn3(out)

        if self.downsample is not None:
            residual = self.downsample(x)

        out += residual
        out = self.relu(out)

        return out

class ResNet(nn.Module):

    def __init__(self, block, layers, block_inplanes, n_input_channels=1, conv1_t_size=7, conv1_t_stride=1, no_max_pool=False,
            shortcut_type='B', widen_factor=1.0, n_class=10, dropout_rate = 0):
        super().__init__()

        block_inplanes = [int(x * widen_factor) for x in block_inplanes]

        self.in_planes = block_inplanes[0]
        self.no_max_pool = no_max_pool

        self.conv1 = nn.Conv3d(n_input_channels,
                    self.in_planes,
                    kernel_size=(conv1_t_size, 7, 7),
                    stride=(conv1_t_stride, 2, 2),
                    padding=(conv1_t_size // 2, 3, 3),
                    bias=False)
        self.bn1 = nn.BatchNorm3d(self.in_planes)
        self.relu = nn.ReLU(inplace=True)
        self.maxpool = nn.MaxPool3d(kernel_size=3, stride=2, padding=1)
        self.layer1 = self._make_layer(block, block_inplanes[0], layers[0], shortcut_type)
        self.layer2 = self._make_layer(block,
                        block_inplanes[1],
                        layers[1],
                        shortcut_type,
                        stride=2)
        self.layer3 = self._make_layer(block,
                        block_inplanes[2],
                        layers[2],
                        shortcut_type,
                        stride=2)
        self.layer4 = self._make_layer(block,
                        block_inplanes[3],
                        layers[3],
                        shortcut_type,
                        stride=2, dropout_rate = dropout_rate)
        # self.dropout = nn.Dropout(p=dropout_rate)
        self.sigmoid = nn.Sigmoid()
        self.avgpool = nn.AdaptiveAvgPool3d((1, 1, 1))
        self.fc = nn.Linear(block_inplanes[3] * block.expansion,  n_class)

        for m in self.modules():
            if isinstance(m, nn.Conv3d):
                nn.init.kaiming_normal_(m.weight,
                            mode='fan_out',
                            nonlinearity='relu')
            elif isinstance(m, nn.BatchNorm3d):
                nn.init.constant_(m.weight, 1)
                nn.init.constant_(m.bias, 0)

    def _downsample_basic_block(self, x, planes, stride):
        out = F.avg_pool3d(x, kernel_size=1, stride=stride)
        zero_pads = torch.zeros(out.size(0), planes - out.size(1), out.size(2),
                                out.size(3), out.size(4))
        if isinstance(out.data, torch.cuda.FloatTensor):
            zero_pads = zero_pads.cuda()

        out = torch.cat([out.data, zero_pads], dim=1)

        return out

    def _make_layer(self, block, planes, blocks, shortcut_type, stride=1, dropout_rate = 0):
        downsample = None
        if stride != 1 or self.in_planes != planes * block.expansion:
            if shortcut_type == 'A':
                downsample = partial(self._downsample_basic_block,
                            planes=planes * block.expansion,
                            stride=stride)
            else:
                downsample = nn.Sequential(
                    conv1x1x1(self.in_planes, planes * block.expansion, stride),
                    nn.BatchNorm3d(planes * block.expansion))

        layers = []
        layers.append(
            block(in_planes=self.in_planes,
                planes=planes,
                stride=stride,
                downsample=downsample))
        self.in_planes = planes * block.expansion
        for i in range(1, blocks):
            layers.append(block(self.in_planes, planes, dropout_rate = dropout_rate))

        return nn.Sequential(*layers)

    def forward(self, x):
        x = self.conv1(x)
        x = self.bn1(x)
        x = self.relu(x)
        if not self.no_max_pool:
            x = self.maxpool(x)

        x = self.layer1(x)
        x = self.layer2(x)
        x = self.layer3(x)
        x = self.layer4(x)
        x = self.avgpool(x)
        # x = self.dropout(x)
        x = x.view(x.size(0), -1)
        x = self.fc(x)
        x = self.sigmoid(x)
        return x

def generate_resnet_model(model_depth, **kwargs):
    assert model_depth in [10, 18, 34, 50, 101, 152, 200]

    if model_depth == 10:
        model = ResNet(BasicBlock, [1, 1, 1, 1], get_inplanes(), **kwargs)
    elif model_depth == 18:
        model = ResNet(BasicBlock, [2, 2, 2, 2], get_inplanes(), **kwargs)
    elif model_depth == 34:
        model = ResNet(BasicBlock, [3, 4, 6, 3], get_inplanes(), **kwargs)
    elif model_depth == 50:
        model = ResNet(Bottleneck, [3, 4, 6, 3], get_inplanes(), **kwargs)
    elif model_depth == 101:
        model = ResNet(Bottleneck, [3, 4, 23, 3], get_inplanes(), **kwargs)
    elif model_depth == 152:
        model = ResNet(Bottleneck, [3, 8, 36, 3], get_inplanes(), **kwargs)
    elif model_depth == 200:
        model = ResNet(Bottleneck, [3, 24, 36, 3], get_inplanes(), **kwargs)

    return model

# def get_module_name(name):
#     name = name.split('.')
#     if name[0] == 'module':
#         i = 1
#     else:
#         i = 0
#     if name[i] == 'features':
#         i += 1
#     return name[i]

# def get_fine_tuning_parameters(model, ft_begin_module):
#     if not ft_begin_module:
#         return model.parameters()

#     parameters = []
#     add_flag = False
#     for k, v in model.named_parameters():
#         if ft_begin_module == get_module_name(k):
#             add_flag = True
#         if add_flag:
#             parameters.append({'params': v})
#     return parameters


def load_pretrained_model(model, pretrain_path, model_name, n_finetune_classes, freeze = False):
    if pretrain_path:
        print('loading pretrained model {}'.format(pretrain_path))
        pretrain = torch.load(pretrain_path, map_location='cpu')

        model.load_state_dict(pretrain['state_dict'])
        # freeze weight
        if freeze:
          for param in model.parameters():
            param.requires_grad = False
          for param in model.layer4[1].parameters():
            param.requires_grad = True
          # but not freeze batch norm
          for i in [0,1]:
            model.layer1[i].bn1 = nn.BatchNorm3d(64)
            model.layer1[i].bn2 = nn.BatchNorm3d(64)
            model.layer2[i].bn1 = nn.BatchNorm3d(128)
            model.layer2[i].bn2 = nn.BatchNorm3d(128)
            model.layer3[i].bn1 = nn.BatchNorm3d(256)
            model.layer3[i].bn2 = nn.BatchNorm3d(256)
            model.layer4[i].bn1 = nn.BatchNorm3d(512)
            model.layer4[i].bn2 = nn.BatchNorm3d(512)
          model.layer2[0].downsample[1] = nn.BatchNorm3d(128)
          model.layer3[0].downsample[1] = nn.BatchNorm3d(256)
          model.layer4[0].downsample[1] = nn.BatchNorm3d(512)
          model.layer4[1].conv1 = nn.Conv3d(512, 512, kernel_size=(3, 3, 3),stride=(1, 1, 1), padding=(1, 1, 1), bias=False)
          model.layer4[1].conv2 = nn.Conv3d(512, 512, kernel_size=(3, 3, 3),stride=(1, 1, 1), padding=(1, 1, 1), bias=False)
          model.bn1 = nn.BatchNorm3d(64)
        tmp_model = model
        if model_name == 'densenet':
            tmp_model.classifier = nn.Linear(tmp_model.classifier.in_features, n_finetune_classes)
        else:
            tmp_model.fc = nn.Linear(tmp_model.fc.in_features, n_finetune_classes)

    return model

# resCNN3
class Res_CNN(nn.Module):

    def __init__(self, in_planes, num_classes, downsample=None, droprate = 0, freeze = True):
        super(Res_CNN, self).__init__()

        resnet = generate_resnet_model(model_depth=18,
                  n_class=700,
                  n_input_channels=in_planes,
                  shortcut_type='B',
                  conv1_t_size=7,
                  conv1_t_stride=1,
                  no_max_pool=True,
                  widen_factor=1, dropout_rate = 0)
        pretrain_path = './pretrain_weight_3d18.pth'
        self.resnet = load_pretrained_model(resnet, pretrain_path, model_name = None, n_finetune_classes = num_classes)
        
        # freeze weight
        if freeze:
          for param in self.resnet.parameters():
            param.requires_grad = False
          # for param in self.resnet.layer4.parameters():
          #   param.requires_grad = True
          # but not freeze batch norm weight
          for i in [0,1]:
            self.resnet.layer1[i].bn1 = nn.BatchNorm3d(64)
            self.resnet.layer1[i].bn2 = nn.BatchNorm3d(64)
            self.resnet.layer2[i].bn1 = nn.BatchNorm3d(128)
            self.resnet.layer2[i].bn2 = nn.BatchNorm3d(128)
            self.resnet.layer3[i].bn1 = nn.BatchNorm3d(256)
            self.resnet.layer3[i].bn2 = nn.BatchNorm3d(256)
            self.resnet.layer4[i].bn1 = nn.BatchNorm3d(512)
            self.resnet.layer4[i].bn2 = nn.BatchNorm3d(512)
          self.resnet.layer2[0].downsample[1] = nn.BatchNorm3d(128)
          self.resnet.layer3[0].downsample[1] = nn.BatchNorm3d(256)
          self.resnet.bn1 = nn.BatchNorm3d(64)
          self.resnet.layer4 = None

        '''256'''
        self.conv1 = nn.Conv3d(256, 64, kernel_size=(1,5,5), stride = (1,1,1), padding=(0,1,1))
        # self.conv1 = nn.ConvTranspose3d(512, 128, kernel_size=(2,2,2), stride = (1,1,1), padding=0)
        self.relu1 = nn.ReLU()
        self.avgpool1 = nn.AvgPool3d(kernel_size=(1,3,3), stride=1, padding=0)
        self.conv2 = nn.Conv3d(64,16, kernel_size=(1,5,5), stride = 1, padding=(0,1,1))  
        self.relu2 = nn.ReLU()
        # self.conv3 = nn.Conv3d(16,8, kernel_size=(1,3,3), stride = (1,1,1), padding=0)  
        # self.avgpool3 = nn.AvgPool3d(kernel_size=(2,3,3), stride=1, padding=0)
        self.dropout = nn.Dropout(droprate)
        # self.conv4 = nn.Conv3d(8,8, kernel_size=(1,5,5), stride = (1,1,1), padding=0)  
        self.fc1 = nn.Linear( 16* 4* 10* 10 , 4000)
        self.fc2 = nn.Linear(4000 ,400)
        self.fc3 = nn.Linear(400 , num_classes)
        self.sigmoid = nn.Sigmoid()
        # self.res_avgpool = nn.AvgPool3d(kernel_size=3, stride=2, padding=1)

    def forward(self, x):
        x = self.resnet.conv1(x)
        x = self.resnet.bn1(x)
        x = self.resnet.relu(x)
        x = self.resnet.maxpool(x)
        x = self.resnet.layer1(x)
        x = self.resnet.layer2(x)
        x = self.resnet.layer3(x)
        # x = self.resnet.layer4(x)
        # print('x' ,x.shape)
        out = self.conv1(x)
        # print('conv1' ,out.shape)
        out = self.relu1(out)
        out = self.avgpool1(out)
        # print('maxpool' ,out.shape)
        out = self.dropout(out)
        out = self.conv2(out)
        # print('conv2' ,out.shape)
        out = self.relu2(out)
        
        out = self.dropout(out)
        # # out = self.conv4(out)
        out = out.view(out.size(0), -1)
        out = self.fc1(out)
        # print('fc1 ' ,out.shape)
        out = self.fc2(out)
        out = self.fc3(out)
        # print('fc2 ' ,out.shape)
        out = self.sigmoid(out)
        return out


if __name__ == "__main__":
    model = Res_CNN(in_planes = 3, num_classes = 5, droprate = 0.4)
    summary(model, input_size=(8, 3, 30, 256, 256))