import os
import tempfile
from pathlib import Path
from typing import List

import numpy as np
import uvicorn
from bson import ObjectId
from fastapi import Body, FastAPI, File, HTTPException, Request, UploadFile, status
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from dotenv import load_dotenv

from .mlmain import big5model
from . import model

load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MAX_UPLOAD_BYTES = int(os.environ.get("MAX_UPLOAD_BYTES", 25 * 1024 * 1024))
ALLOWED_VIDEO_TYPES = {
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/quicktime": ".mov",
}

app = FastAPI()

origins = [origin.strip() for origin in os.environ.get(
  "CORS_ORIGINS",
  "http://localhost:5173,http://127.0.0.1:5173",
).split(",") if origin.strip()]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

MONGO_URI = os.environ.get("MONGO_URI")
ENABLE_UNAUTHENTICATED_DEMO_API = (
  os.environ.get("ENABLE_UNAUTHENTICATED_DEMO_API", "false").lower() == "true"
)

client = MongoClient(MONGO_URI) if MONGO_URI else None
database = client["db"] if client is not None else None
users_col = database["users"] if database is not None else None
interviews_col = database["interviews"] if database is not None else None

PUBLIC_PATHS = {"/", "/docs", "/docs/oauth2-redirect", "/openapi.json", "/redoc"}


@app.middleware("http")
async def require_explicit_demo_mode(request: Request, call_next):
  if request.url.path not in PUBLIC_PATHS:
    if not ENABLE_UNAUTHENTICATED_DEMO_API:
      return JSONResponse(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        content={
          "detail": "The unauthenticated research API is disabled by default."
        },
      )
    if database is None:
      return JSONResponse(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        content={"detail": "MONGO_URI is not configured."},
      )
  return await call_next(request)


def database_id(value: str) -> ObjectId:
  if not ObjectId.is_valid(value):
    raise HTTPException(status_code=404, detail="Record not found")
  return ObjectId(value)

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
  if (user := users_col.find_one({"_id": database_id(id)})) is not None:
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
  user = user.model_dump(exclude_none=True)

  if len(user) >= 1:
    object_id = database_id(id)
    update_result = users_col.update_one({"_id": object_id}, {"$set": user})

    if update_result.modified_count == 1:
      if (updated_result := users_col.find_one({"_id": object_id})) is not None:
        return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(model.user_helper(updated_result)))
  
  if (existing_result := users_col.find_one({"_id": database_id(id)})) is not None:
    return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(model.user_helper(existing_result)))

  raise HTTPException(status_code=404, detail=f"User id {id} not found")

@app.delete("/delete_user/{id}", response_description="delete an user by ID")
def delete_user(id: str):
  delete_result = users_col.delete_one({"_id": database_id(id)})

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
  if (interview := interviews_col.find_one({"_id": database_id(id)})) is not None:
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
  interview = interview.model_dump(exclude_none=True)

  if len(interview) >= 1:
    object_id = database_id(id)
    update_result = interviews_col.update_one({"_id": object_id}, {"$set": interview})

    if update_result.modified_count == 1:
      if (updated_result := interviews_col.find_one({"_id": object_id})) is not None:
        return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(model.interview_helper(updated_result)))
  
  if (existing_result := interviews_col.find_one({"_id": database_id(id)})) is not None:
    return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(model.interview_helper(existing_result)))

  raise HTTPException(status_code=404, detail=f"Interview id {id} not found")

@app.post("/test_interview/{id}", response_description="upload the clip to predict the result with interview ID")
async def test_interview(id: str, file: UploadFile = File(...)):
  suffix = ALLOWED_VIDEO_TYPES.get(file.content_type or "")
  if suffix is None:
    raise HTTPException(
      status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
      detail="Only MP4, WebM, and QuickTime video uploads are accepted.",
    )

  temporary_path = None
  try:
    total_bytes = 0
    with tempfile.NamedTemporaryFile(mode="wb", suffix=suffix, delete=False) as upload:
      temporary_path = Path(upload.name)
      while chunk := await file.read(1024 * 1024):
        total_bytes += len(chunk)
        if total_bytes > MAX_UPLOAD_BYTES:
          raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"Video exceeds the {MAX_UPLOAD_BYTES}-byte upload limit.",
          )
        upload.write(chunk)

    try:
      big5 = big5model(str(temporary_path))
    except RuntimeError as error:
      raise HTTPException(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        detail=str(error),
      ) from error
    except ValueError as error:
      raise HTTPException(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        detail="The uploaded video could not be processed.",
      ) from error
  finally:
    await file.close()
    if temporary_path is not None:
      temporary_path.unlink(missing_ok=True)

  score = -1
  if len(big5) == 5:
    score = (np.sum(big5) - big5[4] + (100 - big5[4])) / 5

  object_id = database_id(id)
  update_result = interviews_col.update_one({"_id": object_id}, {"$set": { "big": big5, "score": score }})
  if update_result.modified_count == 1:
    if (updated_result := interviews_col.find_one({"_id": object_id})) is not None:
      return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(model.interview_helper(updated_result)))
  
  if (existing_result := interviews_col.find_one({"_id": object_id})) is not None:
    return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(model.interview_helper(existing_result)))

  raise HTTPException(status_code=404, detail=f"Interview id {id} not found")


@app.delete("/delete_interview/{id}", response_description="delete an interview by ID")
def delete_interview(id: str):
  delete_result = interviews_col.delete_one({"_id": database_id(id)})

  if delete_result.deleted_count == 1:
    return status.HTTP_204_NO_CONTENT

@app.get("/predict")
async def predict():
  return {"message": "Hello World"}


if __name__ == "__main__":
  uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
