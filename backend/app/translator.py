import requests

LIBRETRANSLATE_URL = "https://translate.argosopentech.com/translate"


def translate_to_english(message, source_language):

    if source_language == "English":
        return message

    language_codes = {
        "English": "en",
        "Tamil": "ta",
        "Korean": "ko",
        "Japanese": "ja",
        "Hindi": "hi",
        "Chinese": "zh"
    }

    source = language_codes.get(source_language)

    if source is None:
        return message

    try:
        response = requests.post(
            LIBRETRANSLATE_URL,
            json={
                "q": message,
                "source": source,
                "target": "en",
                "format": "text"
            },
            timeout=10
        )

        print("Status Code:", response.status_code)
        print("Response:", response.text)

        data = response.json()

        return data["translatedText"]

    except Exception as e:
        print("Translation Error:", e)
        return message