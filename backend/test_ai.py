from app.ai import analyze_with_ai


message = "화나셨나요?"

result = analyze_with_ai(message)

print("\n==============================")
print("K-LINK AI TEST")
print("==============================")

print("Language:", result["language"])
print("Translation:", result["translation"])
print("Intent:", result["intent"])
print("Emotion:", result["emotion"])
print("Tone:", result["tone"])
print("Professionalism:", result["professionalism"])
print("Risk Score:", result["risk_score"])
print("Rewrite:", result["rewrite"])
print("Translated Rewrite:", result["translated_rewrite"])
print("Explanation:", result["explanation"])