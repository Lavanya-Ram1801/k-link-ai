import requests


url = "http://127.0.0.1:8000/cultural-analysis"

data = {
    "message": "화나셨나요?"
}


response = requests.post(
    url,
    json=data
)


print("==============================")
print("K-LINK AI CULTURAL TEST")
print("==============================")

print("Status:", response.status_code)

print(response.json())