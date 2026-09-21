import json
from app.ai import get_ai_response


def analyze_cultural_intent(message):
    """
    Analyze a workplace message from a cultural
    and communication perspective.
    """

    prompt = f"""
You are K-LINK AI, a multilingual workplace culture
and communication intelligence system.

Analyze the following workplace message carefully.

MESSAGE:
{message}

Your task is to identify:

1. Detected language
2. Literal English meaning
3. Cultural meaning
4. Workplace context
5. Cultural intent
6. Formality level
7. Respect level
8. Potential cultural misunderstanding
9. Professional workplace equivalent
10. Cultural explanation

Return ONLY valid JSON.

Use exactly this format:

{{
    "language": "",
    "literal_meaning": "",
    "cultural_meaning": "",
    "workplace_context": "",
    "cultural_intent": "",
    "formality": "",
    "respect_level": "",
    "misunderstanding_risk": 0,
    "professional_equivalent": "",
    "cultural_explanation": ""
}}

Rules:

- Understand the message in its original language.
- Translate the actual meaning into natural English.
- Explain cultural meaning, not just dictionary meaning.
- Consider workplace hierarchy and politeness.
- Consider whether the expression is commonly used in professional communication.
- Do not make negative stereotypes about any culture.
- Do not change the original meaning.
- misunderstanding_risk must be a number from 0 to 100.
- Return JSON only.
"""

    try:
        response = get_ai_response(prompt)

        response = response.strip()

        # Remove Markdown code fences
        if response.startswith("```json"):
            response = response[7:]

        elif response.startswith("```"):
            response = response[3:]

        if response.endswith("```"):
            response = response[:-3]

        response = response.strip()

        result = json.loads(response)

        return result

    except Exception as e:

        print("Cultural Analysis Error:", e)

        return {
            "language": "Unknown",
            "literal_meaning": "",
            "cultural_meaning": "",
            "workplace_context": "",
            "cultural_intent": "",
            "formality": "",
            "respect_level": "",
            "misunderstanding_risk": 0,
            "professional_equivalent": "",
            "cultural_explanation": f"AI Error: {str(e)}"
        }