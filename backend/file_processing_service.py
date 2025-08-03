import whisper
import PyPDF2
import os
from typing import Optional
from fastapi import UploadFile
import tempfile

class FileProcessor:
    def __init__(self):
        # Initialize Whisper model
        self.whisper_model = whisper.load_model("base")
        
    async def process_video(self, file: UploadFile) -> Optional[str]:
        try:
            # Create temporary file to store the uploaded video
            with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_file:
                content = await file.read()
                temp_file.write(content)
                temp_file_path = temp_file.name

            # Transcribe video using Whisper
            result = self.whisper_model.transcribe(temp_file_path)
            
            # Clean up temporary file
            os.unlink(temp_file_path)
            
            return result["text"]
        except Exception as e:
            return f"Error processing video: {str(e)}"

    async def process_pdf(self, file: UploadFile) -> Optional[str]:
        try:
            # Create temporary file to store the uploaded PDF
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
                content = await file.read()
                temp_file.write(content)
                temp_file_path = temp_file.name

            text = ""
            with open(temp_file_path, 'rb') as pdf_file:
                pdf_reader = PyPDF2.PdfReader(pdf_file)
                for page in pdf_reader.pages:
                    text += page.extract_text()

            # Clean up temporary file
            os.unlink(temp_file_path)
            
            return text
        except Exception as e:
            return f"Error processing PDF: {str(e)}"

    async def process_slides(self, file: UploadFile) -> Optional[str]:
        # For now, handle PPT/PPTX files as PDFs since they're commonly exported as PDFs
        # You can extend this method to handle specific slide formats if needed
        return await self.process_pdf(file)
