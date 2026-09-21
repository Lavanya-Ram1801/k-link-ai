import requests


url = "http://127.0.0.1:8000/rag-query"


question = "What should an employee do if they expect a project deadline delay?"


response = requests.post(
    url,
    json={
        "question": question
    }
)


print("\n==============================")
print("K-LINK AI RAG API TEST")
print("==============================")


print("\nStatus:", response.status_code)


print("\nResponse:")

print(response.json())