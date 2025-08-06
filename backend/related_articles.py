from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
import os
import traceback

from article_scraper import fetch_article_text
from gemini_service import GeminiService

router = APIRouter()

# Ortam değişkenlerini al
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GOOGLE_SEARCH_ENGINE_ID = os.getenv("GOOGLE_SEARCH_ENGINE_ID")

# Gemini service örneği
gemini_service = GeminiService()

# İstek modelleri
class SummaryRequest(BaseModel):
    summary: str

class ArticleURLRequest(BaseModel):
    url: str

# İlgili makaleleri arayan endpoint
@router.post("/related-articles")
async def related_articles(request: SummaryRequest):
    if not GOOGLE_API_KEY or not GOOGLE_SEARCH_ENGINE_ID:
        raise HTTPException(status_code=500, detail="Google API bilgileri eksik.")

    query = request.summary

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
        response.raise_for_status()
        results = response.json()

        articles = []
        for item in results.get("items", []):
            articles.append({
                "title": item.get("title"),
                "link": item.get("link"),
                "snippet": item.get("snippet"),
            })

        return {"articles": articles}

    except Exception as e:
        traceback.print_exc()  # 🔍 Hata detaylarını terminale yazdır
        raise HTTPException(status_code=500, detail=f"Google araması başarısız: {str(e)}")

# Bir makalenin özetini çıkaran endpoint
@router.post("/related-article-summary")
async def related_article_summary(request: ArticleURLRequest):
    try:
        content = fetch_article_text(request.url)
        if not content or len(content) < 300:
            raise HTTPException(status_code=400, detail="Makale içeriği çok kısa veya alınamadı.")

        summary = gemini_service.summarize_text(content)
        return {"summary": summary}

    except Exception as e:
        traceback.print_exc()  # 🔍 Hata detaylarını terminale yazdır
        raise HTTPException(status_code=500, detail=f"Özetleme hatası: {str(e)}")
