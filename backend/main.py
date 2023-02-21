import os
import uvicorn
from fastapi import FastAPI, Body, HTTPException, status, UploadFile, Request, File, UploadFile
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
# from starlette.middleware import Middleware
# from starlette.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from dotenv import load_dotenv
from typing import List, Optional
import random
import math
import numpy as np
import aiofiles

from starlette.config import Config
from authlib.integrations.starlette_client import OAuth
# from starlette.middleware.sessions import SessionMiddleware
# from starlette.responses import RedirectResponse
# from authlib.integrations.starlette_client import OAuthError

# import ffmpeg
from mlmain import *

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")

# import model
from . import model

if __name__ == "__main__":
  uvicorn.run("app", host="0.0.0.0", port=8000, reload=True)

load_dotenv()
app = FastAPI()

origins = [
  "http://localhost",
  "http://localhost:3000",
  "https://5eeyou.netlify.app",
  "https://5eeyou.netlify.app/"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

MONGO_URI = os.environ.get("MONGO_URI")
PORT = os.environ.get("PORT")

client = MongoClient(MONGO_URI, int(PORT))

database = client["db"]
users_col = database["users"]
interviews_col = database["interviews"]

# OAuth settings
GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID') or None
GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET') or None

if GOOGLE_CLIENT_ID is None or GOOGLE_CLIENT_SECRET is None:
  raise BaseException('Missing env variables')

# Set up OAuth
config_data = {'GOOGLE_CLIENT_ID': GOOGLE_CLIENT_ID, 'GOOGLE_CLIENT_SECRET': GOOGLE_CLIENT_SECRET}
starlette_config = Config(environ=config_data)
oauth = OAuth(starlette_config)
oauth.register(
    name='google',
    server_metadata_url='',
    client_kwargs={'scope': 'openid email profile'},
)

# middleware, secret key
# SECRET_KEY = os.environ.get('SECRET_KEY') or None
# SECRET_KEY="OulLJiqkldb436-X6M11hKvr7wvLyG8TPi5PkLf4"
# if SECRET_KEY is None:
#     raise 'Missing SECRET_KEY'
# app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)

def ResponseModel(data, message="success"):
  return {
    "data": [data],
    "code": 200,
    "message": message,
  }

def ErrorResponseModel(error, code, message):
  return {"error": error, "code": code, "message": message}

@app.get("/")
def home():
  return {"server": "ok"}

@app.get("/users", response_description="get all users", response_model=List[model.User])
def get_users():
  list = []
  for ele in users_col.find():
    list.append(model.user_helper(ele))
  
  return list

@app.get("/user/{id}", response_description="get an user by ID", response_model=model.User)
def get_user(id: str):
  if (user := users_col.find_one({"_id": id})) is not None:
    return user
  raise HTTPException(status_code=404, detail=f"User id {id} not found")

@app.get("/user_by_email/{email}", response_description="get an user by email", response_model=model.User)
def get_user_by_email(email: str):
  if (user := users_col.find_one({"email": email})) is not None:
    return user
  raise HTTPException(status_code=404, detail=f"User email {email} not found")

@app.post("/post_user", response_description="post a user by ID", response_model=model.User)
def post_user(user: model.User = Body(...)):
  user = jsonable_encoder(user)
  insert_user = users_col.insert_one(user)
  inserted_user = users_col.find_one({"_id": insert_user.inserted_id})

  return JSONResponse(status_code=status.HTTP_201_CREATED, content=jsonable_encoder(model.user_helper(inserted_user)))

@app.put("/update_user/{id}", response_description="update an user by ID", response_model=model.User)
def update_user(id: str, user: model.UpdatedUser = Body(...)):
  user = {k: v for k, v in user.dict().items() if v is not None}

  if len(user) >= 1:
    update_result = users_col.update_one({"_id": id}, {"$set": user})

    if update_result.modified_count == 1:
      if (updated_result := users_col.find_one({"_id": id})) is not None:
        return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(model.user_helper(updated_result)))
  
  if (existing_result := users_col.find_one({"_id": id})) is not None:
    return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(model.user_helper(existing_result)))

  raise HTTPException(status_code=404, detail=f"User id {id} not found")

@app.delete("/delete_user/{id}", response_description="delete an user by ID")
def delete_user(id: str):
  delete_result = users_col.delete_one({"_id": id})

  if delete_result.deleted_count == 1:
    return status.HTTP_204_NO_CONTENT

@app.get("/interviews", response_description="get all interviews", response_model=List[model.Interview])
def get_interviews():
  list = []

  for ele in interviews_col.find():
    list.append(model.interview_helper(ele))
  
  return list

@app.get("/interview/id/{id}", response_description="get an interview by ID", response_model=model.Interview)
def get_interview(id: str):
  if (interview := interviews_col.find_one({"_id": id})) is not None:
    return interview
  raise HTTPException(status_code=404, detail=f"Interview id {id} not found")

@app.get("/interviews/userid/{user_id}", response_description="get interviews by user id", response_model=List[model.Interview])
def get_interviews_by_user_id(user_id: str):
  list = []

  for ele in interviews_col.find({"userId": user_id}):
    list.append(model.interview_helper(ele))
  
  return list


@app.get("/interviews/industry/{industry}", response_description="get interviews by industry", response_model=List[model.Interview])
def get_interviews_by_user_id(industry: str):
  list = []

  for ele in interviews_col.find({"industry": industry}):
    list.append(model.interview_helper(ele))
  
  return list

@app.post("/post_interview", response_description="post an interview", response_model=model.Interview)
def post_interview(interview: model.Interview = Body(...)):
  interview = jsonable_encoder(interview)
  insert_interview = interviews_col.insert_one(interview)
  inserted_interview = interviews_col.find_one({"_id": insert_interview.inserted_id})

  return JSONResponse(status_code=status.HTTP_201_CREATED, content=jsonable_encoder(model.interview_helper(inserted_interview)))

@app.put("/update_interview/{id}", response_description="update an interview", response_model=model.Interview)
def update_interview(id: str, interview: model.UpdatedInterview = Body(...)):
  interview = {k: v for k, v in interview.dict().items() if v is not None}

  if len(interview) >= 1:
    update_result = interviews_col.update_one({"_id": id}, {"$set": interview})

    if update_result.modified_count == 1:
      if (updated_result := interviews_col.find_one({"_id": id})) is not None:
        return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(model.interview_helper(updated_result)))
  
  if (existing_result := interviews_col.find_one({"_id": id})) is not None:
    return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(model.interview_helper(existing_result)))

  raise HTTPException(status_code=404, detail=f"Interview id {id} not found")

@app.post("/test_interview/{id}", response_description="upload the clip to predict the result with interview ID")
async def test_interview(id: str, file: UploadFile = File(...)):
  # to access file, use file.file or file.file.read()
  # for example to pass it into the big5model
  # big5model(file.file.read())
  print(file.file.read())
  SAVE_FILE_PATH = os.path.join(UPLOAD_DIR, file.filename)
  print(SAVE_FILE_PATH)
  async with aiofiles.open(SAVE_FILE_PATH, 'wb') as out_file:
    content = await file.read()
    await out_file.write(content)
  
  big5 = []
  score = -1
  big5 = big5model(SAVE_FILE_PATH)
  if len(big5) == 5:
    score = (np.sum(big5) - big5[4] + (100 - big5[4])) / 5
  
  update_result = interviews_col.update_one({"_id": id}, {"$set": { "big": big5, "score": score }})
  os.remove(file.filename)
  if update_result.modified_count == 1:
    if (updated_result := interviews_col.find_one({"_id": id})) is not None:
      return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(model.interview_helper(updated_result)))
  
  if (existing_result := interviews_col.find_one({"_id": id})) is not None:
    return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(model.interview_helper(existing_result)))

  raise HTTPException(status_code=404, detail=f"Interview id {id} not found")


@app.delete("/delete_interview/{id}", response_description="delete an interview by ID")
def delete_interview(id: str):
  delete_result = interviews_col.delete_one({"_id": id})

  if delete_result.deleted_count == 1:
    return status.HTTP_204_NO_CONTENT

@app.get("/predict")
async def predict():
  return {"message": "Hello World"}