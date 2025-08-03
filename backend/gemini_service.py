import os
import google.generativeai as genai
from dotenv import load_dotenv
from model_config.model_config import SUM_SYSTEM_INSTRUCTION, SUM_PARAMETERS, GEN_SYSTEM_INSTRUCTION, GEN_PARAMETERS, ASK_SYSTEM_INSTRUCTION, ASK_PARAMETERS

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

def summarize_text(text: str) -> str:
    prompt = f"Please provide a concise summary of the following text:\n\n{text}"
    
    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        system_instruction=SUM_SYSTEM_INSTRUCTION,
        generation_config=SUM_PARAMETERS,
    )

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error: {str(e)}"
    
def question_generate(text: str) -> str:
    prompt = f"Generate 3 important questions from this text:\n{text}"

    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        system_instruction=GEN_SYSTEM_INSTRUCTION,
        generation_config=GEN_PARAMETERS,
    )
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error: {str(e)}"
    
def ask_gemini(text: str, user_question: str) -> str:
    prompt = f"Please answer the following question based on the provided context:\n context: {text}\n question: {user_question}"

    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        system_instruction=ASK_SYSTEM_INSTRUCTION,
        generation_config=ASK_PARAMETERS,
    )
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error: {str(e)}"
