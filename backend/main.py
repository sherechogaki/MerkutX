from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Gerekirse sadece frontend URL yazılabilir
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    prompt: str

class VideoRequest(BaseModel):
    videoId: str

class ContextRequest(BaseModel):
    context: str

@app.get("/")
def read_root():
    return {"message": "Gemini API is ready."}

@app.post("/ask")
async def ask_question(data: Question):
    try:
        model = genai.GenerativeModel("gemini-2.5-flash")  # Uygun model adıyla değiştir
        response = model.generate_content(data.prompt)
        return {"response": response.text}
    except Exception as e:
        return {"error": str(e)}

@app.post("/video-summary")
async def video_summary(data: VideoRequest):
    try:
        # Burada videoId ile gerçek video içeriği çekilip işlenebilir
        prompt = f"Bu videonun içeriğini özetle: {data.videoId}"
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        return {"summary": response.text}
    except Exception as e:
        return {"error": str(e)}

@app.post("/generate-questions")
async def generate_questions(data: ContextRequest):
    try:
        prompt = f"Bu metinden 3 tane önemli soru üret:\n{data.context}"
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        return {"questions": response.text}
    except Exception as e:
        return {"error": str(e)}
