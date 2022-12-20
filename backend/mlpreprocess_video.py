'''functions for preprocessing videos'''

# import os
# ffmpeg_path = "./ffmpeg_2022"
# os.environ["PATH"] += os.pathsep + ffmpeg_path

import numpy as np
import ffmpeg as ff
from typing import List, Tuple, Dict
import matplotlib.pyplot as plt
import cv2
import dlib

# from imutils import face_utils
from PIL import Image
pretrained_dlib_detector = "./shape_predictor_68_face_landmarks.dat"
detector = dlib.get_frontal_face_detector()

# default
audio_modal = False
frame_per_video = 30
n_class = 5
imput_size = 256


def extract_audio_from_video(file_path: str) -> np.ndarray:
    inputfile = ff.input(filePath)
    out = inputfile.output('-', format='f32le', acodec='pcm_f32le', ac=1, ar='44100')
    raw = out.run(capture_stdout=True)
    del inputfile, out
    return np.frombuffer(raw[0],np.float32)

def preprocess_audio_series(raw_data: np.ndarray) -> np.ndarray:
    N, M = 24, 1319
    # mfcc_data = librosa.feature.mfcc(raw_data, n_mfcc= 24)
    
    # #Getting spectral mean (centroid)
    # #mean = librosa.feature.spectral_centroid(result)
    
    # #Standardizing MFCC (zero mean and unit variance)
    # mfcc_data_standardized = (mfcc_data - np.mean(mfcc_data)) / np.std(mfcc_data)
    
    # # Use pre-padding (Note: with 0, which is also the mean after standardization) to unify the length of the samples.
    # number_of_columns_to_fill = M - mfcc_data_standardized.shape[1]
    # padding = np.zeros((N,number_of_columns_to_fill))
    
    # padded_data = np.hstack((padding, mfcc_data_standardized))
    
    # #Reshaping to N,M,1
    # return padded_data.reshape(N,M,1)

def get_number_of_frames(file_path: str) -> int:
    probe = ff.probe(file_path)
    video_streams = [stream for stream in probe["streams"] if stream["codec_type"] == "video"]
    #width = video_streams[0]['coded_width']
    #height = video_streams[0]['coded_height']
    del probe
    return video_streams[0]['nb_frames']

# TODO: rotate face
def crop_image_window(rect, image: np.ndarray, training: bool = True) -> np.ndarray:
    if image.ndim == 2:
      height, width = image.shape
    elif image.ndim == 3:
      height, width, channel = image.shape
    
    square = []

    if len(rect) == 0:
      print('detect no face so crop center')
      crop_width = min(height, width)
      top = (height - crop_width)/2
      bottom = top + crop_width
      left = (width - crop_width)/2
      right = left + crop_width
      return int(top), int(bottom), int(left), int(right)

    max_area = 0
    for i, d in enumerate(rect):
        
      # choose rectangle with max area
      area = ( d.bottom()-d.top() )*( d.right()-d.left() )
      if max_area < area:
        max_area = area
        print(max_area)
        square = [d.top(), d.bottom(), d.left(), d.right()]

    return square[0], square[1], square[2], square[3]


def extract_N_video_frames(file_path: str, number_of_samples: int = 6) -> List[np.ndarray]:
    nb_frames = int(get_number_of_frames(file_path= file_path))
    # print('nb_frames ', nb_frames)
    video_dict = {}
    video_frames = []
    if nb_frames > 459:
      nb_frames = 459
    block = (nb_frames-10) // number_of_samples
    random_indexes = list(range(block, block*number_of_samples+1, block))

    find = False
    # print('nb_frames ',nb_frames, random_indexes)
    for ind in random_indexes:
      cap = cv2.VideoCapture(file_path)
      cap.set(1,ind)
      res, frame = cap.read()
      
      frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
      # cv2_imshow(frame)
      if '_01AyUz9J9I.0' in file_path:
        h = frame.shape[0]
        w = frame.shape[1]
        frame = frame[0:h, 0:w//2]
      rect = detector(frame, 1)
      
      if len(rect) > 0:
        # print('detected')
        max_area = 0
        for i, d in enumerate(rect):
          # choose rectangle with max area
          area = ( d.bottom()-d.top() )*( d.right()-d.left() )
          if max_area < area:
            max_area = area
            square = [d.top(), d.bottom(), d.left(), d.right()]
        if max_area/frame.shape[0]/frame.shape[1] > 0.009:
          
          # frame= cv2.copyMakeBorder(frame,300,300,300,300,cv2.BORDER_CONSTANT,value=(255,255,255))
          # rect = detector(frame, 1)
          find = True
          break
    if find:
      # top, bottom, left, right = crop_image_window(rect, frame)
      top = square[0]+300
      bottom = square[1]+300
      left = square[2]+300
      right = square[3]+300
    else:
      top, bottom, left, right = crop_image_window([], frame)
    square_h = bottom - top
    square_w = right - left
    # print('face size:' ,square_h, square_w, 'video size:',frame.shape)
    for ind in random_indexes:
        cap.set(1,ind)
        res, frame = cap.read()
        if frame.ndim == 2:
          height, width = frame.shape
        elif frame.ndim == 3:
          height, width, channel = frame.shape

        gray_image = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # showimage = gray_image.copy()
        # showimage = cv2.resize(showimage, dsize=(200,140), interpolation=cv2.INTER_LINEAR)
        # cv2_imshow(showimage)
        if find:
          gray_image= cv2.copyMakeBorder(gray_image,300,300,300,300,cv2.BORDER_CONSTANT,value=(255,255,255))
          croped_image = gray_image[max(0, int(top-2*square_h/3)): min(int(bottom+2*square_h/3), height+600), max(0, int(left-2*square_w/3)): min(int(right+2*square_w/3), width+600)]
        else:
          croped_image = gray_image[max(0, int(top)): min(int(bottom), height), max(0, int(left)): min(int(right), width)]
        
        croped_image = cv2.resize(croped_image, dsize=(imput_size, imput_size), interpolation=cv2.INTER_LINEAR)
        # frame = crop_image_window(frame)
        if frame is None:
          return None

        video_frames.append(croped_image)
        # video_dict[ind] = frame

    cap.release()
    
    # video_dict_sorted = sorted(video_dict)
    # # print(video_dict_sorted)
    # for i in video_dict_sorted:
    #   video_frames.append(video_dict[i])

    del cap, random_indexes
    # print('frame shape ', video_frames[0].shape)
    result = np.concatenate(video_frames,axis=1)
    show_64_image = cv2.resize(result, dsize=(1920,64), interpolation=cv2.INTER_LINEAR)
    plt.imshow(show_64_image)
    return video_frames

def resize_image(image: np.ndarray, new_size: Tuple[int,int]) -> np.ndarray:
    # print(image.shape)  # most of them 720*1280
    return cv2.resize(image, new_size, interpolation = cv2.INTER_AREA)

def reading_label_data(file_name: str, dictionary: Dict[str,str]) -> np.ndarray:
    features = ['extraversion', 'neuroticism', 'agreeableness', 'conscientiousness', 'openness']
    extracted_data = [float(dictionary[label][file_name]) for label in features]
    return np.stack(extracted_data).reshape(5,1)

def preprocessing_input(file_path: str, dictionary: Dict[str,str], use_audio = audio_modal) -> Tuple[np.ndarray,np.ndarray,np.ndarray]:
    # Audio
    if use_audio:
      extracted_audio_raw = extract_audio_from_video(file_path= filePath)
      preprocessed_audio = preprocess_audio_series(raw_data= extracted_audio_raw)
    
    #Video
    sampled = extract_N_video_frames(file_path= file_path, number_of_samples= frame_per_video)
    if sampled is None:
      return 0
    cropped_images = [resi / 255.0 for resi in sampled] 

    preprocessed_video = np.stack(cropped_images)

    if use_audio:
      del extracted_audio_raw, sampled, cropped_images 
      # return (preprocessed_video, video_gt, preprocessed_audio) 
    else:
      del sampled,  cropped_images  #resized_images,
      return preprocessed_video



if __name__ == "__main__":

  filePath = './video3.mov' 
  imgs = preprocessing_input(file_path= filePath, dictionary= None)
  result = np.concatenate(imgs,axis=1)
  show_64_image = cv2.resize(result, dsize=(3840, 128), interpolation=cv2.INTER_LINEAR)  #*255.0
  cv2.imshow('press any key to close the window',show_64_image)
  cv2.waitKey(0)