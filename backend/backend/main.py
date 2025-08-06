from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware

# Ana route
from routes import router as main_router

# Yeni oluşturduğumuz related_articles router
from related_articles import router as related_articles_router

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route'ları ekle
app.include_router(main_router)
app.include_router(related_articles_router)

@app.get("/")
def read_root():
    return {"message": "Gemini API is ready."}
