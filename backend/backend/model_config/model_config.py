SUM_SYSTEM_INSTRUCTION = "Summarize only the given text. Do not include the introductory text and do not refer to the material like 'the text says that..' in the response. Immediately start to summarize. If there is no text, return 'No text found.'"

SUM_PARAMETERS = {
        "temperature": 0.1,
        "top_p": 0.95,
        "max_output_tokens": 65536, # Max limit of the model
    }

GEN_SYSTEM_INSTRUCTION = "Generate 3 important questions based on the provided text. Do not include any introductory text or explanations. Just provide the questions directly. If there is no provided text, return 'No text submitted.'"

GEN_PARAMETERS = {
        "temperature": 0.3,
        "top_p": 0.95,
        "max_output_tokens": 65536, # Max limit of the model
    }

ASK_SYSTEM_INSTRUCTION = "Answer the question based on the provided context. Do not include any introductory text or explanations. Just provide the answer directly. If there is no text, return 'No question submitted.'"

ASK_PARAMETERS = {
        "temperature": 0.2,
        "top_p": 0.95,
        "max_output_tokens": 65536, # Max limit of the model
    }