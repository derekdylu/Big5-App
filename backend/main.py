import os
import uvicorn
from fastapi import FastAPI, Body, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from dotenv import load_dotenv
from typing import List

# import model
from . import model

if __name__ == "__main__":
    uvicorn.run("app", host="0.0.0.0", port=8000, reload=True)

load_dotenv()
app = FastAPI()

MONGO_URI = os.environ.get("MONGO_URI")
PORT = os.environ.get("PORT")

client = MongoClient(MONGO_URI, int(PORT))

database = client["db"]
users_col = database["users"]
interviews_col = database["interviews"]

origins = [
  "http://localhost",
  "http://localhost:3000",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_headers=["*"],
  allow_methods=["*"],
)

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
  return {"big5": "server ok"}

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

@app.post("/post_user", response_description="post a user by ID", response_model=model.User)
def post_user(user: model.User = Body(...)):
  user = jsonable_encoder(user)
  insert_user = users_col.insert_one(user)
  inserted_user = users_col.find_one({"_id": insert_user.inserted_id})

  return JSONResponse(status_code=status.HTTP_201_CREATED, content=jsonable_encoder(model.user_helper(inserted_user)))

@app.put("/update_user/{id}", response_description="update an user by ID", response_model=model.User)
def update_user(id: str, user: model.User = Body(...)):
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

@app.get("/interview/{id}", response_description="get an interview by ID", response_model=model.Interview)
def get_interview(id: str):
  if (interview := interviews_col.find_one({"_id": id})) is not None:
    return interview
  raise HTTPException(status_code=404, detail=f"Interview id {id} not found")

@app.post("/post_interview", response_description="post an interview", response_model=model.Interview)
def post_interview(interview: model.Interview = Body(...)):
  interview = jsonable_encoder(interview)
  insert_interview = interviews_col.insert_one(interview)
  inserted_interview = interviews_col.find_one({"_id": insert_interview.inserted_id})

  return JSONResponse(status_code=status.HTTP_201_CREATED, content=jsonable_encoder(model.interview_helper(inserted_interview)))

@app.put("/update_interview/{id}", response_description="update an interview", response_model=model.Interview)
def update_interview(id: str, interview: model.Interview = Body(...)):
  interview = {k: v for k, v in interview.dict().items() if v is not None}
  print(interview)

  if len(interview) >= 1:
    update_result = interviews_col.update_one({"_id": id}, {"$set": interview})

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