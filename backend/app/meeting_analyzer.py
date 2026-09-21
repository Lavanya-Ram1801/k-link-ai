import json
from app.ai import get_ai_response


def analyze_meeting(transcript):
    """
    Analyze a workplace meeting transcript using K-LINK AI.
    """

    prompt = f"""
You are K-LINK AI, a multilingual workplace meeting intelligence system.

Analyze the following workplace meeting transcript carefully.

MEETING TRANSCRIPT:
{transcript}

Your task is to extract useful workplace intelligence from the meeting.

Perform the following:

1. Create a concise meeting summary.
2. Identify the main topics discussed.
3. Identify important decisions made.
4. Identify action items.
5. Identify the person responsible for each action item when mentioned.
6. Identify deadlines when mentioned.
7. Identify unresolved issues or concerns.
8. Identify important communication or cultural issues.
9. Identify the overall meeting tone.
10. Generate a short list of key takeaways.

IMPORTANT RULES:

- Understand the entire conversation before summarizing.
- Do not invent information that is not present in the transcript.
- If a responsible person is not mentioned, use "Not specified".
- If a deadline is not mentioned, use "Not specified".
- Keep action items specific and useful.
- Distinguish between decisions and suggestions.
- Do not confuse discussion topics with decisions.
- Consider workplace hierarchy and communication style.
- If there is a possible cultural or communication misunderstanding, mention it.
- Return ONLY valid JSON.
- Do not use Markdown.
- Do not put JSON inside ```json code fences.

Return exactly this structure:

{{
    "summary": "",
    "main_topics": [],
    "decisions": [],
    "action_items": [
        {{
            "task": "",
            "responsible": "",
            "deadline": ""
        }}
    ],
    "unresolved_issues": [],
    "communication_issues": [],
    "meeting_tone": "",
    "key_takeaways": []
}}
"""

    try:

        response = get_ai_response(prompt)

        response = response.strip()

        # Remove Markdown code fences if Gemini returns them
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

        print("Meeting Analysis Error:", e)

        return {
            "summary": "",
            "main_topics": [],
            "decisions": [],
            "action_items": [],
            "unresolved_issues": [],
            "communication_issues": [],
            "meeting_tone": "",
            "key_takeaways": [],
            "error": f"AI Error: {str(e)}"
        }