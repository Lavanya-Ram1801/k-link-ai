def chunk_text(
    text,
    chunk_size=500,
    overlap=100
):
    """
    Split text into smaller overlapping chunks.
    """

    chunks = []

    start = 0
    text_length = len(text)

    while start < text_length:

        end = start + chunk_size

        chunk = text[start:end]

        chunks.append(chunk.strip())

        start = end - overlap

    return chunks