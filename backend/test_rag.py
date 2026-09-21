from app.rag.rag_engine import ask_rag


print("\n==============================")
print("K-LINK AI RAG TEST")
print("==============================")


question = "What should an employee do if they expect a project deadline delay?"


print("\nQUESTION:")
print(question)


result = ask_rag(question)


print("\n==============================")
print("AI ANSWER")
print("==============================")

print(result["answer"])


print("\n==============================")
print("SOURCES")
print("==============================")


for index, source in enumerate(result["sources"]):

    print(f"\nSOURCE {index + 1}")
    print("------------------------------")
    print(source)