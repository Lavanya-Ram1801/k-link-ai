from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.language_detector import detect_language
from app.translator import translate_to_english
from app.analyzer import analyze_message
from app.cultural_analyzer import analyze_cultural_intent
from app.meeting_analyzer import analyze_meeting
from app.rag.rag_engine import ask_rag
from app.ai import analyze_with_ai, analyze_simulator_response


app = FastAPI()


# -----------------------------
# CORS
# -----------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Request Model
# -----------------------------

class MessageRequest(BaseModel):
    message: str


# -----------------------------
# Home
# -----------------------------

@app.get("/")
def home():
    return {
        "message": "Welcome to K-LINK AI"
    }


# -----------------------------
# Workplace Message Analysis
# -----------------------------

@app.post("/analyze")
def analyze(data: MessageRequest):

    message = data.message.strip()

    if not message:
        return {
            "original_message": "",
            "language": "Unknown",
            "translation": "",
            "intent": "",
            "emotion": "",
            "tone": "",
            "professionalism": "",
            "risk_score": 0,
            "rewrite": "",
            "translated_rewrite": "",
            "explanation": "Please enter a message."
        }

    # -------------------------
    # Detect Language
    # -------------------------

    language = detect_language(message)

    # -------------------------
    # Translate
    # -------------------------

    translation = translate_to_english(
        message,
        language
    )

    # -------------------------
    # AI Workplace Analysis
    # -------------------------

    analysis = analyze_message(
        message,
        language,
        translation
    )

    # -------------------------
    # Return Result
    # -------------------------

    return {
        "original_message": message,

        "language": analysis.get(
            "language",
            language
        ),

        "translation": analysis.get(
            "translation",
            translation
        ),

        "intent": analysis.get(
            "intent",
            ""
        ),

        "emotion": analysis.get(
            "emotion",
            ""
        ),

        "tone": analysis.get(
            "tone",
            ""
        ),

        "professionalism": analysis.get(
            "professionalism",
            ""
        ),

        "risk_score": analysis.get(
            "risk_score",
            0
        ),

        "rewrite": analysis.get(
            "rewrite",
            ""
        ),

        "translated_rewrite": analysis.get(
            "translated_rewrite",
            ""
        ),

        "explanation": analysis.get(
            "explanation",
            ""
        )
    }


# -----------------------------
# Cultural Analysis
# -----------------------------

@app.post("/cultural-analysis")
def cultural_analysis(data: MessageRequest):

    message = data.message.strip()

    if not message:
        return {
            "error": "Please enter a message."
        }

    result = analyze_cultural_intent(message)

    return result
@app.post("/meeting-analysis")
def meeting_analysis(data: MessageRequest):

    transcript = data.message.strip()

    if not transcript:
        return {
            "summary": "",
            "main_topics": [],
            "decisions": [],
            "action_items": [],
            "unresolved_issues": [],
            "communication_issues": [],
            "meeting_tone": "",
            "key_takeaways": [],
            "error": "Please enter a meeting transcript."
        }

    result = analyze_meeting(transcript)

    return result
class RAGRequest(BaseModel):
    question: str


@app.post("/rag-query")
def rag_query(data: RAGRequest):

    question = data.question.strip()

    if not question:
        return {
            "answer": "Please enter a question.",
            "sources": []
        }

    result = ask_rag(question)

    return {
        "question": question,
        "answer": result.get("answer", ""),
        "sources": result.get("sources", [])
    }
@app.post("/simulator-analysis")
def simulator_analysis(data: dict):

    role = data.get("role", "")
    scenario = data.get("scenario", "")
    response = data.get("response", "")

    if not response.strip():
        return {
            "error": "Response cannot be empty."
        }

    result = analyze_simulator_response(
        role,
        scenario,
        response
    )

    return result