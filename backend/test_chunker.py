from app.rag.document_loader import load_document
from app.rag.text_chunker import chunk_text


file_path = "data/documents/company_guidelines.txt"

text = load_document(file_path)

chunks = chunk_text(text)


print("\n==============================")
print("K-LINK AI CHUNKING TEST")
print("==============================")

print(f"\nTotal chunks: {len(chunks)}")


for index, chunk in enumerate(chunks):

    print("\n------------------------------")
    print(f"CHUNK {index + 1}")
    print("------------------------------")

    print(chunk)