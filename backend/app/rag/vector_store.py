import chromadb
from chromadb.utils import embedding_functions


# Create local ChromaDB database
client = chromadb.PersistentClient(
    path="data/chroma_db"
)


# Use Chroma's built-in embedding function
embedding_function = embedding_functions.DefaultEmbeddingFunction()


# Create or load the collection
collection = client.get_or_create_collection(
    name="klink_workplace_knowledge",
    embedding_function=embedding_function
)


def add_documents(chunks):
    """
    Add document chunks to the vector database.
    """

    if not chunks:
        return

    ids = [
        f"chunk_{index}"
        for index in range(len(chunks))
    ]

    collection.upsert(
        ids=ids,
        documents=chunks
    )

    print(
        f"Added {len(chunks)} chunks to ChromaDB."
    )


def search_documents(query, top_k=3):
    """
    Search the vector database for
    the most relevant document chunks.
    """

    results = collection.query(
        query_texts=[query],
        n_results=top_k
    )

    documents = results.get(
        "documents",
        [[]]
    )[0]

    return documents