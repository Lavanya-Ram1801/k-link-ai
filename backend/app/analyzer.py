from app.ai import analyze_with_ai


def analyze_message(message, language, translation):

    result = analyze_with_ai(message)

    return {
        "language": result.get("language", language),
        "translation": result.get("translation", translation),
        "intent": result.get("intent", ""),
        "emotion": result.get("emotion", ""),
        "tone": result.get("tone", ""),
        "professionalism": result.get("professionalism", ""),
        "risk_score": result.get("risk_score", 0),
        "rewrite": result.get("rewrite", ""),
        "translated_rewrite": result.get("translated_rewrite", ""),
        "explanation": result.get("explanation", "")
    }