import os
from googleapiclient.discovery import build

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GOOGLE_SEARCH_ENGINE_ID = os.getenv("GOOGLE_SEARCH_ENGINE_ID")

def search_articles(query, num_results=5):
    # Çok uzun sorguları 100 karakterle sınırla, ama kelimelerin ortasında kesmemek için
    if len(query) > 40:
        query = query[:40]
        # Son kelimeyi tamamlamak için son boşluk noktası bulunup kırpılabilir
        last_space = query.rfind(' ')
        if last_space != -1:
            query = query[:last_space]

    service = build("customsearch", "v1", developerKey=GOOGLE_API_KEY)
    res = service.cse().list(
        q=query,
        cx=GOOGLE_SEARCH_ENGINE_ID,
        num=num_results,
        lr='lang_tr'  # Türkçe sonuçlar için
    ).execute()

    results = []
    for item in res.get("items", []):
        results.append({
            "title": item.get("title"),
            "link": item.get("link"),
            "snippet": item.get("snippet", "")
        })

    return results
