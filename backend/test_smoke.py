import unittest

from bson import ObjectId
from fastapi import HTTPException

from backend import main, model


class BackendSmokeTests(unittest.TestCase):
  def test_openapi_schema_generation(self):
    schema = main.app.openapi()
    self.assertEqual(schema["info"]["title"], "FastAPI")
    self.assertIn("/test_interview/{id}", schema["paths"])

  def test_object_id_serialization(self):
    user = model.User(
      username="sample-user",
      email="alice@example.com",
      img="./",
      interview=[],
    )
    serialized = user.model_dump(mode="json", by_alias=True)
    self.assertTrue(ObjectId.is_valid(serialized["_id"]))

  def test_invalid_database_id_is_rejected(self):
    with self.assertRaises(HTTPException) as context:
      main.database_id("not-an-object-id")
    self.assertEqual(context.exception.status_code, 404)


if __name__ == "__main__":
  unittest.main()
