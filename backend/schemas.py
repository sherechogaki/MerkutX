from pydantic import BaseModel

class Question(BaseModel):
    prompt: str
