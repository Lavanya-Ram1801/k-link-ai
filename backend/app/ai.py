import json
from google import genai
from google.genai import types


# ==========================================
# Gemini Client
# ==========================================

# The SDK automatically reads GEMINI_API_KEY
client = genai.Client(
    http_options=types.HttpOptions(
        retry_options=types.HttpRetryOptions(
            attempts=6,
            initial_delay=1.0,
            max_delay=20.0,
            exp_base=2.0,
            jitter=1.0,
            http_status_codes=[408, 429, 500, 502, 503, 504],
        )
    )
)


# ==========================================
# Common Gemini Function
# ==========================================

def get_ai_response(prompt):
    """
    Sends a prompt to Gemini and returns
    the raw text response.
    """

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )

    if not response.text:
        raise ValueError("Gemini returned an empty response.")

    return response.text.strip()


# ==========================================
# Workplace Miscommunication Analysis
# ==========================================

def analyze_with_ai(message):

    prompt = f"""
You are K-LINK AI, a multilingual workplace communication assistant.

Analyze the following workplace message carefully.

MESSAGE:
{message}

Your job is to understand the actual meaning of the message.

Perform these tasks:

1. Detect the original language.
2. Translate the message into natural English.
3. Identify the workplace intent.
4. Identify the emotion.
5. Identify the communication tone.
6. Evaluate professionalism.
7. Calculate a communication risk score from 0 to 100.
8. Explain why the message has that risk score.
9. Rewrite the message in polite, professional English.
10. Translate the polite rewrite back into the original language.

IMPORTANT RULES:

- Do not assume the message is English.
- If the message is Korean, Tamil, Hindi, Japanese, etc., translate it properly.
- Do not simply repeat the original message as the translation.
- Understand the meaning before rewriting.
- Do not change the original meaning.
- Consider workplace hierarchy and cultural politeness.
- A short message is not automatically professional.
- A direct command may have communication risk.
- A question can still sound rude depending on wording and context.
- Return ONLY valid JSON.

Return exactly this structure:

{{
    "language": "",
    "translation": "",
    "intent": "",
    "emotion": "",
    "tone": "",
    "professionalism": "",
    "risk_score": 0,
    "rewrite": "",
    "translated_rewrite": "",
    "explanation": ""
}}
"""

    try:

        text = get_ai_response(prompt)

        # Remove Markdown code fences
        if text.startswith("```json"):
            text = text[7:]

        elif text.startswith("```"):
            text = text[3:]

        if text.endswith("```"):
            text = text[:-3]

        text = text.strip()

        result = json.loads(text)

        return result

    except Exception as e:

        print("Gemini Error:", e)

        return {
            "language": "Unknown",
            "translation": "",
            "intent": "",
            "emotion": "",
            "tone": "",
            "professionalism": "",
            "risk_score": 0,
            "rewrite": "",
            "translated_rewrite": "",
            "explanation": f"AI Error: {str(e)}"
        }
    # ==========================================
# Communication Simulator Analysis
# ==========================================

def analyze_simulator_response(role, scenario, response):
    prompt = f"""
You are K-LINK AI, a professional workplace communication coach.

Analyze the user's response to a workplace communication scenario.

ROLE:
{role}

SCENARIO:
{scenario}

USER RESPONSE:
{response}

Evaluate the response carefully.

Give scores from 0 to 100 for:

1. professionalism
2. politeness
3. clarity
4. cultural_sensitivity

Also provide:

5. overall_score
6. what_went_well
7. areas_to_improve
8. professional_version
9. feedback

Important rules:

- Do not change the user's intended meaning.
- Consider workplace hierarchy.
- Consider respectful workplace communication.
- Consider cultural sensitivity.
- Do not judge the person.
- Evaluate only the communication.
- Return ONLY valid JSON.

Return exactly this structure:

{{
    "professionalism": 0,
    "politeness": 0,
    "clarity": 0,
    "cultural_sensitivity": 0,
    "overall_score": 0,
    "what_went_well": "",
    "areas_to_improve": "",
    "professional_version": "",
    "feedback": ""
}}
"""

    try:
        text = get_ai_response(prompt)

        if text.startswith("```json"):
            text = text[7:]
        elif text.startswith("```"):
            text = text[3:]

        if text.endswith("```"):
            text = text[:-3]

        text = text.strip()

        return json.loads(text)

    except Exception as e:
        print("Simulator Analysis Error:", e)

        return {
            "professionalism": None,
            "politeness": None,
            "clarity": None,
            "cultural_sensitivity": None,
            "overall_score": None,
            "what_went_well": "",
            "areas_to_improve": "",
            "professional_version": "",
            "feedback": f"AI Error: {str(e)}"
        }