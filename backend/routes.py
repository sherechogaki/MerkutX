from fastapi import APIRouter, UploadFile, File, HTTPException
from schemas import Question
from pydantic import BaseModel
from gemini_service import summarize_text, question_generate, ask_gemini
from file_processing_service import FileProcessor

router = APIRouter()
file_processor = FileProcessor()

@router.post("/process-and-summarize")
async def process_and_summarize(file: UploadFile = File(...)):
    try:
        # First process the file based on its type
        if file.filename.lower().endswith(('.mp4', '.avi', '.mov', '.mkv')):
            text = await file_processor.process_video(file)
        elif file.filename.lower().endswith('.pdf'):
            text = await file_processor.process_pdf(file)
        elif file.filename.lower().endswith(('.ppt', '.pptx')):
            text = await file_processor.process_slides(file)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        summary = summarize_text(text)
        
        return {
            "original_text": text,
            "summary": summary
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/generate-questions")
async def process_and_generate_questions(file: UploadFile = File(...)):
    try:
        # First process the file based on its type
        if file.filename.lower().endswith(('.mp4', '.avi', '.mov', '.mkv')):
            text = await file_processor.process_video(file)
        elif file.filename.lower().endswith('.pdf'):
            text = await file_processor.process_pdf(file)
        elif file.filename.lower().endswith(('.ppt', '.pptx')):
            text = await file_processor.process_slides(file)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        response = question_generate(text)
        
        return {"questions": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class AskRequest(BaseModel):
    context: str
    prompt: str

@router.post("/ask")
async def process_and_ask_questions(request: AskRequest):
    try:
        response = ask_gemini(request.context, request.prompt)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))