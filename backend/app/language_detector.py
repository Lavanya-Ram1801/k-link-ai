from langdetect import detect


def detect_language(message):

    try:
        code = detect(message)

    except Exception:
        code = "unknown"

    languages = {
        "en": "English",
        "ko": "Korean",
        "ta": "Tamil",
        "hi": "Hindi",
        "ja": "Japanese",
        "zh-cn": "Chinese",
        "fr": "French",
        "es": "Spanish",
        "de": "German",
        "it": "Italian",
        "ru": "Russian",
    }

    return languages.get(code, code)