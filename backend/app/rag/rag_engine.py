from app.rag.vector_store import search_documents
from app.ai import get_ai_response


def ask_rag(question):
    """
    Answer a question using information
    retrieved from the K-LINK AI knowledge base.
    """

    # Retrieve relevant information
    documents = search_documents(
        question,
        top_k=3
    )

    if not documents:
        return {
            "answer": "I could not find relevant information in the knowledge base.",
            "sources": []
        }

    # Combine retrieved documents
    context = "\n\n".join(documents)

    prompt = f"""
You are K-LINK AI, a workplace knowledge assistant.

Answer the user's question using ONLY the
information provided in the knowledge base.

If the answer cannot be found in the knowledge
base, clearly say that the information is not
available.

Do not invent company policies or facts.

KNOWLEDGE BASE:
{context}

USER QUESTION:
{question}

Give a clear and professional answer.

Do not mention internal technical details
such as ChromaDB, embeddings, or vector search.
"""

    try:

        answer = get_ai_response(prompt)

        return {
            "answer": answer,
            "sources": documents
        }

    except Exception as e:

        print("RAG Error:", e)

        return {
            "answer": "Unable to generate an AI response.",
            "sources": documents
        }