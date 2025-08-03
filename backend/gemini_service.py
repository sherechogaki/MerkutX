import os
import google.generativeai as genai
from dotenv import load_dotenv
from model_config.video_summarization_config import SYSTEM_INSTRUCTION, PARAMETERS

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

def summarize_video(videoUrl: str) -> str:

    prompt = f"Summarize {videoUrl}"

    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        system_instruction=SYSTEM_INSTRUCTION,
        generation_config=PARAMETERS,
    )

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error: {str(e)}"
    
"""
def ask_gemini(prompt: str) -> str:
    system_instruction = ""
    generation_config = {
        "temperature": 0.6,
        "top_k": 40,
        "top_p": 0.9,
        "max_output_tokens": 512,
    }
    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        system_instruction=system_instruction,
        generation_config=generation_config,
    )
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error: {str(e)}"
    


def question_generate(str: str) -> str:
    system_instruction = ""
    generation_config = {
        "temperature": 0.5,
        "top_k": 30,
        "top_p": 0.85,
        "max_output_tokens": 300,
    }
    prompt = f""
    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        system_instruction=system_instruction,
        generation_config=generation_config,
    )
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error: {str(e)}"
"""