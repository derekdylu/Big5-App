''' Description:
    1. mp4 & mov files are for testing (but still some error to fix for MOV files...)
    2. best.pkl and pretrain_weight_3d18.pth : for model weight 
    3. In preprocess_video.py, 'nb_frames' are the frames of the whole video. 
       It is set to 459 for our testing data, because the training data we used mostly consists 459 frames.
    4. Pytoch in windows only available for python 3.7-3.9'''

''' Step:
    1. pip install -r requirements.txt
    2. Extract ffmpeg_2022.zip, and get the absolute path of the bin folder 
    3. Set the 'ffmpeg_path' in preprocess_video.py
    4. In main.py, set the video as 'filePath' as you like '''

import datetime
import numpy as np
import cv2
import pickle as pickle
import torch
import torchvision.transforms as tf
from mlmodel import *
from mlpreprocess_video import *

def big5model(filePath: str):
    t1 = datetime.datetime.utcnow()


    '''load the parameters onto the model'''
    model = Res_CNN(in_planes = 3, num_classes = 5, droprate = 0.4)
    # summary(model, input_size=(8, 3, 30, 256, 256))

    # test_model_path = './best.pkl'
    # _ = load_checkpoint(model, filepath=test_model_path)
    # model.eval()

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model=model.to(device)


    '''prepocess data'''
    filePath = './test_clip.mp4'
    images = preprocessing_input(file_path= filePath, dictionary= None)

    # 如果影片檔不能preprocess，可先改用已process好的.dat試試看model的部分有無問題
    # with open('./p1.000.dat', "rb") as dat:
    #   images = pickle.load(dat)

    result = np.concatenate(images,axis=1)
    show_64_image = cv2.resize(result, dsize=(3840, 128), interpolation=cv2.INTER_LINEAR)  #*255.0
    # cv2.imshow('press any key to close the window',show_64_image)
    # cv2.waitKey(0) 

    images = torch.from_numpy(images).float()
    images = torch.unsqueeze(images, 0)          #  add channel (D,H,W) -> (C,D,H,W) 
    images = torch.cat((images, images, images), 0)   # resnet needs input channel = 3
    images = torch.unsqueeze(images, 0)          # add batch size = 1, (C,D,H,W) -> (B,C,D,H,W) 
    # print('input shape', images.shape)
    inputs_hf = tf.functional.hflip(images)


    '''testing...'''
    output = model(images)
    outputs_hf = model(inputs_hf)  # horizon flip augmentation
    output = torch.cat((output, outputs_hf), 0)
    output = torch.mean(output, 0, keepdim = True)
    # print('output (e,n,a,c,o)',output.tolist()[0])

    t2 = datetime.datetime.utcnow()
    print('Elapsed time: ' + str(t2-t1))
    return output.tolist()[0]

if __name__ == "__main__":

    filePath = './test_clip.mp4' 
    print(big5model(filePath))