from unittest.mock import Base
from bson import ObjectId
from pydantic import BaseModel, Field
from typing import Dict, List, Optional
from sympy import true



class PyObjectId(ObjectId):
  @classmethod
  def __get_validators__(cls):
    yield cls.validate

  @classmethod
  def validate(cls, v):
    if not ObjectId.is_valid(v):
      raise ValueError("Invalid objectid")
    return ObjectId(v)

  @classmethod
  def __modify_schema__(cls, field_schema):
    field_schema.update(type="string")

class User(BaseModel):
  id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
  username: str = Field(...)
  email: str = Field(...)
  img: str = Field(...)
  interview: list = Field(...)

  class Config:
    allow_population_by_field_name = True
    arbitrary_types_allowed = True
    json_encoders = {ObjectId: str}
    schema_extra = {
      "example": {
        "username": "derekdylu",
        "email": "abc@bcg.com",
        "img": "./",
        "interview": [],
      }
    }

def user_helper(user) -> dict:
  return {
    "id": user["_id"],
    "username": user["username"],
    "email": user["email"],
    "img": user["img"],
    "interview": user["interview"]
  }

class Interview(BaseModel):
  id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
  userId: str = Field(...)
  timestamp: str = Field(...)
  topic: str = Field(...)
  industry: str = Field(...)
  score: int = Field(...)
  big: list = Field(...)
  note: str = Field(...)
  link: str = Field(...)

  class Config:
    allow_population_by_field_name = True
    arbitrary_types_allowed = True
    json_encoders = {ObjectId: str}
    schema_extra = {
      "example": {
        "userId": "abc1234567890",
        "timestamp": "1234567890",
        "topic": "topic",
        "industry": "軟體工程師",
        "score": 0,
        "big": [1,2,3,4,5],
        "note": "note",
        "link": "./"
      }
    }

def interview_helper(interview) -> dict:
  return {
    "id": interview["_id"],
    "userId": interview["userId"],
    "timestamp": interview["timestamp"],
    "topic": interview["topic"],
    "score": interview["score"],
    "big": interview["big"],
    "note": interview["note"],
    "industry": interview["industry"]
  }
