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
import os
from pathlib import Path

import torch
import torchvision.transforms as tf

from .mlmodel import Res_CNN, load_checkpoint
from .mlpreprocess_video import preprocessing_input


def big5model(file_path: str, model_path: str = None):
    t1 = datetime.datetime.utcnow()

    configured_model_path = Path(
        model_path or os.environ.get("BIG5_MODEL_PATH", "")
    ).expanduser()
    if not configured_model_path.is_file():
        raise RuntimeError(
            "Inference is disabled until BIG5_MODEL_PATH points to a trusted "
            "model checkpoint. Model weights are not distributed in this repository."
        )


    '''load the parameters onto the model'''
    model = Res_CNN(in_planes = 3, num_classes = 5, droprate = 0.4)
    load_checkpoint(model, filepath=str(configured_model_path))
    model.eval()

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model=model.to(device)


    '''prepocess data'''
    images = preprocessing_input(file_path=file_path, dictionary=None)

    # 如果影片檔不能preprocess，可先改用已process好的.dat試試看model的部分有無問題
    # with open('./p1.000.dat', "rb") as dat:
    #   images = pickle.load(dat)

    images = torch.from_numpy(images).float()
    images = torch.unsqueeze(images, 0)          #  add channel (D,H,W) -> (C,D,H,W) 
    images = torch.cat((images, images, images), 0)   # resnet needs input channel = 3
    images = torch.unsqueeze(images, 0)          # add batch size = 1, (C,D,H,W) -> (B,C,D,H,W) 
    images = images.to(device)
    # print('input shape', images.shape)
    inputs_hf = tf.functional.hflip(images)


    '''testing...'''
    with torch.no_grad():
        output = model(images)
        outputs_hf = model(inputs_hf)  # horizon flip augmentation
        output = torch.cat((output, outputs_hf), 0)
        output = torch.mean(output, 0, keepdim = True)
    # print('output (e,n,a,c,o)',output.tolist()[0])

    t2 = datetime.datetime.utcnow()
    print('Elapsed time: ' + str(t2-t1))
    return output.tolist()[0]

if __name__ == "__main__":

    file_path = './test_clip.mp4'
    print(big5model(file_path))
