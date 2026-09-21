import { useState } from "react";

function RAGAssistant() {

    const [question, setQuestion] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const askQuestion = async () => {

        if (question.trim() === "") {
            alert("Please enter a question.");
            return;
        }

        setLoading(true);
        setResult(null);

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/rag-query",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        question: question,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Backend Error");
            }

            const data = await response.json();

            console.log("RAG Response:", data);

            setResult(data);

        } catch (error) {

            console.error(error);

            alert("Cannot connect to FastAPI Backend.");

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="rag-page">

            <h1>RAG Knowledge Assistant</h1>

            <p className="subtitle">
                Ask questions about your organization's
                workplace knowledge and guidelines.
            </p>


            <textarea
                rows="6"
                placeholder="Ask something about company policies, guidelines, or workplace procedures..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />


            <br />
            <br />


            <button
                onClick={askQuestion}
                disabled={loading}
            >
                {loading
                    ? "Finding Answer..."
                    : "Ask K-LINK AI"}
            </button>


            {result && (

                <div className="rag-result">

                    <div className="rag-card">

                        <h2>🤖 K-LINK AI Answer</h2>

                        <p>
                            {result.answer ||
                                "No answer available."}
                        </p>

                    </div>


                    {result.sources &&
                    result.sources.length > 0 && (

                        <div className="rag-card">

                            <h2>📚 Knowledge Used</h2>

                            {result.sources.map(
                                (source, index) => (

                                    <div
                                        className="source-item"
                                        key={index}
                                    >

                                        <strong>
                                            Source {index + 1}
                                        </strong>

                                        <p>
                                            {source}
                                        </p>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            )}

        </div>
    );
}

export default RAGAssistant;