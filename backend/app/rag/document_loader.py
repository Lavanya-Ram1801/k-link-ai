from pathlib import Path
from pypdf import PdfReader


def load_text_file(file_path):
    """
    Load text from a .txt file.
    """

    path = Path(file_path)

    with open(path, "r", encoding="utf-8") as file:
        return file.read()


def load_pdf_file(file_path):
    """
    Load text from a PDF file.
    """

    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text


def load_document(file_path):
    """
    Automatically load TXT or PDF documents.
    """

    path = Path(file_path)

    if path.suffix.lower() == ".txt":
        return load_text_file(file_path)

    elif path.suffix.lower() == ".pdf":
        return load_pdf_file(file_path)

    else:
        raise ValueError(
            "Unsupported document type. Use TXT or PDF."
        )