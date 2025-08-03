SYSTEM_INSTRUCTION = "Summarize only the given text. Do not include the introductory text and do not refer to the material like 'the text says that..' in the response. Immediately start to summarize. If there is no text, return 'No text found.'"

PARAMETERS = {
        "temperature": 0.1,
        "top_p": 0.95,
        "max_output_tokens": 65536, # Max limit of the model
    }
