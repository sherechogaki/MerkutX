from pydantic import BaseModel

class Question(BaseModel):
    prompt: str

class VideoRequest(BaseModel):
    videoUrl: str

class ContextRequest(BaseModel):
    context: str