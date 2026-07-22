from typing import Optional

from bson import ObjectId
from pydantic import BaseModel, ConfigDict, Field
from pydantic_core import core_schema


class PyObjectId(ObjectId):
  @classmethod
  def validate(cls, value):
    if isinstance(value, ObjectId):
      return value
    if not ObjectId.is_valid(value):
      raise ValueError("Invalid ObjectId")
    return ObjectId(value)

  @classmethod
  def __get_pydantic_core_schema__(cls, _source_type, _handler):
    string_schema = core_schema.chain_schema([
      core_schema.str_schema(),
      core_schema.no_info_plain_validator_function(cls.validate),
    ])
    return core_schema.json_or_python_schema(
      json_schema=string_schema,
      python_schema=core_schema.union_schema([
        core_schema.is_instance_schema(ObjectId),
        string_schema,
      ]),
      serialization=core_schema.plain_serializer_function_ser_schema(str),
    )

  @classmethod
  def __get_pydantic_json_schema__(cls, _core_schema, _handler):
    return {"type": "string"}


class User(BaseModel):
  model_config = ConfigDict(
    validate_by_name=True,
    arbitrary_types_allowed=True,
    json_schema_extra={
      "example": {
        "username": "sample-user",
        "email": "alice@example.com",
        "img": "./",
        "interview": [],
      }
    },
  )

  id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
  username: str
  email: str
  img: str
  interview: list


class UpdatedUser(BaseModel):
  model_config = ConfigDict(
    validate_by_name=True,
    arbitrary_types_allowed=True,
    json_schema_extra={
      "example": {
        "username": "sample-user",
        "email": "alice@example.com",
        "img": "./",
        "interview": [],
      }
    },
  )

  username: Optional[str] = None
  email: Optional[str] = None
  img: Optional[str] = None
  interview: Optional[list] = None


def user_helper(user) -> dict:
  return {
    "id": str(user["_id"]),
    "username": user["username"],
    "email": user["email"],
    "img": user["img"],
    "interview": user["interview"],
  }


class Interview(BaseModel):
  model_config = ConfigDict(
    validate_by_name=True,
    arbitrary_types_allowed=True,
    json_schema_extra={
      "example": {
        "userId": "abc1234567890",
        "timestamp": "1234567890",
        "topic": "topic",
        "industry": "software engineering",
        "score": 0,
        "big": [1, 2, 3, 4, 5],
        "note": "note",
        "link": "./",
      }
    },
  )

  id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
  userId: str
  timestamp: str
  topic: str
  industry: str
  score: int
  big: list
  note: str
  link: str


class UpdatedInterview(BaseModel):
  model_config = ConfigDict(
    validate_by_name=True,
    arbitrary_types_allowed=True,
    json_schema_extra={
      "example": {
        "userId": "abc1234567890",
        "timestamp": "1234567890",
        "topic": "topic",
        "industry": "software engineering",
        "score": 0,
        "big": [1, 2, 3, 4, 5],
        "note": "note",
        "link": "./",
      }
    },
  )

  userId: Optional[str] = None
  timestamp: Optional[str] = None
  topic: Optional[str] = None
  industry: Optional[str] = None
  score: Optional[int] = None
  big: Optional[list] = None
  note: Optional[str] = None
  link: Optional[str] = None


def interview_helper(interview) -> dict:
  return {
    "id": str(interview["_id"]),
    "userId": interview["userId"],
    "timestamp": interview["timestamp"],
    "topic": interview["topic"],
    "industry": interview["industry"],
    "score": interview["score"],
    "big": interview["big"],
    "note": interview["note"],
    "link": interview["link"],
  }
