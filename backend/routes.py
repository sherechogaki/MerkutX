from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
#from article_search_service import search_articles
from article_scraper import fetch_article_text
import requests
import os
from gemini_service import GeminiService

router = APIRouter()
gemini_service = GeminiService()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GOOGLE_SEARCH_ENGINE_ID = os.getenv("GOOGLE_SEARCH_ENGINE_ID")

def read_transcript_from_file():
    transcript_path = "static/transcript.txt"
    with open(transcript_path, "r", encoding="utf-8") as f:
        return f.read()

@router.post("/demo-video-summary")
async def demo_video_summary():
    try:
        text = read_transcript_from_file()
        if not text:
            raise HTTPException(status_code=400, detail="Transcript dosyası boş veya okunamadı.")

        summary = gemini_service.summarize_text(text)

        if not isinstance(summary, str):
            raise HTTPException(status_code=500, detail="Özetleme sonucu beklenmeyen formatta döndü.")

        if any(keyword in summary.lower() for keyword in ["hata", "engellendi", "error"]):
            raise HTTPException(status_code=500, detail=summary)

        return {"transcript": text, "summary": summary}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Sunucu hatası: {str(e)}")

@router.post("/demo-video-questions")
async def demo_video_questions():
    try:
        text = read_transcript_from_file()
        questions = gemini_service.generate_questions(text)
        if questions.startswith("Error"):
            raise HTTPException(status_code=500, detail=questions)
        return {"questions": questions.split("\n")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class AskRequest(BaseModel):
    context: str
    prompt: str

@router.post("/ask")
async def ask(request: AskRequest):
    try:
        response = gemini_service.ask_question(request.context, request.prompt)
        if response.startswith("Error"):
            raise HTTPException(status_code=500, detail=response)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class QuestionRequest(BaseModel):
    summary: str

# İstek modelleri
class SummaryRequest(BaseModel):
    summary: str

class ArticleURLRequest(BaseModel):
    url: str

@router.post("/related-articles")
async def related_articles(request: SummaryRequest):
    if not GOOGLE_API_KEY or not GOOGLE_SEARCH_ENGINE_ID:
        raise HTTPException(status_code=500, detail="Google API bilgileri eksik.")

    query = request.summary
    print(f"📨 Gelen özet: {query}")
    print(f"🔑 API KEY: {GOOGLE_API_KEY[:4]}...")  # tamamını yazma güvenlik için
    print(f"🔍 Search Engine ID: {GOOGLE_SEARCH_ENGINE_ID}")

    search_url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": GOOGLE_API_KEY,
        "cx": GOOGLE_SEARCH_ENGINE_ID,
        "q": query,
        "num": 5,
        "lr": "lang_tr",
    }

    try:
        response = requests.get(search_url, params=params)
        print("🧾 Google'dan dönen raw response:", response.text)
        response.raise_for_status()

        results = response.json()
        articles = [
            {
                "title": item.get("title"),
                "link": item.get("link"),
                "snippet": item.get("snippet"),
            }
            for item in results.get("items", [])
        ]

        return {"articles": articles}

    except Exception as e:
        print("🚨 Hata:", str(e))  # Terminale logla
        raise HTTPException(status_code=500, detail=f"Google araması başarısız: {str(e)}")

@router.post("/related-article-summary")
async def related_article_summary(request: ArticleURLRequest):
    try:
        content = fetch_article_text(request.url)
        if not content or len(content) < 300:
            raise HTTPException(status_code=400, detail="Makale içeriği çok kısa veya alınamadı.")

        summary = gemini_service.summarize_text(content)
        return {"summary": summary}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Özetleme hatası: {str(e)}")
