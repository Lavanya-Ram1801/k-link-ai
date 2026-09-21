import os
import google.generativeai as genai

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is not set.")

genai.configure(api_key=api_key)

models = genai.list_models()

for model in models:
    print(model.name)