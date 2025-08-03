from fastapi import APIRouter
from schemas import Question, VideoRequest, ContextRequest
from gemini_service import summarize_video
# from gemini_service import ask_gemini, summarize_video, question_generate

router = APIRouter()

@router.post("/video-summary")
async def video_summary(data: VideoRequest):
    try:
        # Video içeriği metne çevrilip gemini modeline gönderilecek
        prompt = f"{data.videoUrl}"
        response = summarize_video(prompt)

        return {"summary": response}
    except Exception as e:
        return {"error": str(e)}
    
"""
@router.post("/ask")
async def ask_question(data: Question):
    try:
        response = ask_gemini(data.prompt)

        return {"response": response}
    except Exception as e:
        return {"error": str(e)}
    
@router.post("/generate-questions")
async def generate_questions(data: ContextRequest):
    try:
        prompt = f"Bu metinden 3 tane önemli soru üret:\n{data.context}"
        response = question_generate(prompt)

        return {"questions": response}
    except Exception as e:
        return {"error": str(e)}
"""