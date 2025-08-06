import os
from googleapiclient.discovery import build

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GOOGLE_SEARCH_ENGINE_ID = os.getenv("GOOGLE_SEARCH_ENGINE_ID")

def search_articles(query, num_results=5):
    service = build("customsearch", "v1", developerKey=GOOGLE_API_KEY)
    res = service.cse().list(
        q=query,
        cx=GOOGLE_SEARCH_ENGINE_ID,
        num=num_results
    ).execute()

    results = []
    for item in res.get("items", []):
        results.append({
            "title": item["title"],
            "link": item["link"],
            "snippet": item.get("snippet", "")
        })

    return results
