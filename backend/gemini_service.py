import os
import google.generativeai as genai
from dotenv import load_dotenv
import requests
from bs4 import BeautifulSoup

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

class GeminiService:
    def __init__(self):
        self.model_name = "gemini-2.5-pro"
        self.SUM_SYSTEM_INSTRUCTION = (
            "Sen, verilen metni Türkçe olarak kısa, anlaşılır ve güvenli bir şekilde özetleyen bir asistansın."
            " Lütfen aşağıdaki soruya yanıt ver. Yanıtlarında Markdown veya özel biçimlendirme karakterleri kullanma, sadece sade metin ver."
        )
        self.GEN_SYSTEM_INSTRUCTION = (
            "Sen, öğrenci tipine ve seviyesine göre anlamlı, ders geçmeye yardımcı, "
            "    Lütfen aşağıdaki soruya yanıt ver. Yanıtlarında Markdown veya özel biçimlendirme karakterleri kullanma, sadece sade metin ver."
            "Türkçe sorular üreten bir yardımcı asistanısın."
        )
        self.ASK_SYSTEM_INSTRUCTION = (
            "Sen, verilen metni referans alarak, konuyla ilgili detaylı, "
            "    Lütfen aşağıdaki soruya yanıt ver. Yanıtlarında Markdown veya özel biçimlendirme karakterleri kullanma, sadece sade metin ver."
            "Türkçe ve açıklayıcı cevaplar veren bir asistansın."
        )

    def _safe_extract_text(self, response):
        if hasattr(response, "text") and response.text:
            return response.text
        elif hasattr(response, "candidates") and response.candidates:
            parts = response.candidates[0].content.parts
            return "".join(part.text for part in parts if hasattr(part, "text"))
        else:
            return "Yanıt boş döndü."

    def summarize_text(self, text: str) -> str:
        prompt = f"Lütfen aşağıdaki metni kısa ve öz şekilde Türkçe olarak özetle:\n\n{text}"
        try:
            model = genai.GenerativeModel(
                model_name=self.model_name,
                system_instruction=self.SUM_SYSTEM_INSTRUCTION,
            )
            response = model.generate_content(prompt)
            return self._safe_extract_text(response)
        except Exception as e:
            return f"Özetleme sırasında hata oluştu: {str(e)}"

    def generate_questions(self, text: str) -> str:
        prompt = f"Özet metinden yola çıkarak sorular üret:\n\n{text}"
        try:
            model = genai.GenerativeModel(
                model_name=self.model_name,
                system_instruction=self.GEN_SYSTEM_INSTRUCTION,
            )
            response = model.generate_content(prompt)

            # Response içeriğini düzgünce birleştir
            if hasattr(response, "text"):
                return response.text
            elif hasattr(response, "parts"):
                return "".join([part.text for part in response.parts if hasattr(part, "text")])
            else:
                return "Error: Unexpected response format."

        except Exception as e:
            return f"Soru üretme sırasında hata oluştu: {str(e)}"

    def ask_question(self, context: str, question: str) -> str:
        prompt = f"Bağlamı dikkate alarak aşağıdaki soruya Türkçe ve detaylı cevap ver:\n\nBağlam: {context}\nSoru: {question}"
        try:
            model = genai.GenerativeModel(
                model_name=self.model_name,
                system_instruction=self.ASK_SYSTEM_INSTRUCTION,
            )
            response = model.generate_content(prompt)
            return self._safe_extract_text(response)
        except Exception as e:
            return f"Cevaplama sırasında hata oluştu: {str(e)}"
    def extract_url_text(self, url: str) -> str:
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, "html.parser")

            # Temel içerik çıkarımı: başlıklar ve paragraflar
            texts = []
            for tag in soup.find_all(["p", "h1", "h2", "h3"]):
                if tag.text.strip():
                    texts.append(tag.text.strip())

            content = "\n".join(texts)
            return content[:5000]  # max token için sınırla
        except Exception as e:
            return f"URL içerik çekme hatası: {str(e)}"
