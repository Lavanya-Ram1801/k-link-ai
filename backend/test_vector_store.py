from app.rag.document_loader import load_document
from app.rag.text_chunker import chunk_text
from app.rag.vector_store import add_documents, search_documents


# Load document
file_path = "data/documents/company_guidelines.txt"

text = load_document(file_path)


# Split document into chunks
chunks = chunk_text(text)


# Add chunks to ChromaDB
add_documents(chunks)


print("\n==============================")
print("K-LINK AI VECTOR DATABASE TEST")
print("==============================")


# Test question
query = "What should an employee do if they expect a project deadline delay?"


print("\nQUESTION:")
print(query)


# Search relevant chunks
results = search_documents(query)


print("\nRELEVANT KNOWLEDGE:")


for index, result in enumerate(results):

    print("\n------------------------------")
    print(f"RESULT {index + 1}")
    print("------------------------------")

    print(result)