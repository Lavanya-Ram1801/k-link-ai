from app.rag.document_loader import load_document


file_path = "data/documents/company_guidelines.txt"

text = load_document(file_path)

print("\n==============================")
print("K-LINK AI DOCUMENT TEST")
print("==============================")

print(text)