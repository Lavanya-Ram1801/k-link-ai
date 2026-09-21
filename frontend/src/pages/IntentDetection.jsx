import { useState } from "react";
import "./IntentDetection.css";

function IntentDetection() {
    const [message, setMessage] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const analyzeMessage = async () => {
        if (!message.trim()) {
            alert("Please enter a workplace message.");
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/cultural-analysis",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message: message,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Backend Error");
            }

            const data = await response.json();

            console.log("Cultural Analysis:", data);

            setResult(data);
        } catch (error) {
            console.error(error);
            alert("Cannot connect to FastAPI Backend.");
        } finally {
            setLoading(false);
        }
    };

    const getRiskLabel = (score) => {
        if (score >= 70) return "High Risk";
        if (score >= 40) return "Medium Risk";
        return "Low Risk";
    };

    return (
        <div className="intent-page">

            {/* INPUT SECTION */}
            <div className="intent-header">
                <div>
                    <span className="intent-eyebrow">
                        CULTURAL INTELLIGENCE
                    </span>

                    <h1>Cultural Intent Detection</h1>

                    <p>
                        Understand what workplace messages mean beyond
                        their literal translation.
                    </p>
                </div>
            </div>

            <div className="intent-input-card">

                <label>Workplace Message</label>

                <textarea
                    rows="6"
                    placeholder="Enter a message in Korean, Japanese, Tamil, Hindi, English..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <button
                    onClick={analyzeMessage}
                    disabled={loading}
                >
                    {loading ? "Analyzing Culture..." : "Analyze Cultural Intent"}
                </button>

            </div>


            {/* RESULT */}
            {result && (
                <div className="intent-result">

                    {/* RESULT HEADER */}
                    <div className="intent-result-header">

                        <div>
                            <span className="intent-eyebrow">
                                CULTURAL ANALYSIS
                            </span>

                            <h2>K-LINK AI Analysis</h2>

                            <p>
                                Cultural and workplace communication
                                intelligence generated for your message.
                            </p>
                        </div>

                        <div className="intent-risk">
                            <span>
                                {getRiskLabel(result.misunderstanding_risk)}
                            </span>

                            <strong>
                                {result.misunderstanding_risk}/100
                            </strong>
                        </div>

                    </div>


                    {/* ORIGINAL MESSAGE */}
                    <section className="intent-section">

                        <h3>Original Message</h3>

                        <div className="intent-message-box">
                            {message}
                        </div>

                    </section>


                    {/* INFORMATION CARDS */}
                    <div className="intent-info-grid">

                        <div className="intent-info-card">
                            <span>Detected Language</span>
                            <strong>{result.language || "Unknown"}</strong>
                        </div>

                        <div className="intent-info-card">
                            <span>Formality Level</span>
                            <strong>{result.formality || "Not Available"}</strong>
                        </div>

                        <div className="intent-info-card">
                            <span>Respect Level</span>
                            <strong>{result.respect_level || "Not Available"}</strong>
                        </div>

                        <div className="intent-info-card">
                            <span>Misunderstanding Risk</span>
                            <strong>
                                {result.misunderstanding_risk}/100
                            </strong>
                        </div>

                    </div>


                    {/* LITERAL MEANING */}
                    <section className="intent-section">

                        <div className="section-title">
                            <span>🌐</span>
                            <h3>Literal English Meaning</h3>
                        </div>

                        <div className="intent-highlight-box">
                            {result.literal_meaning || "Not Available"}
                        </div>

                    </section>


                    {/* CULTURAL MEANING */}
                    <section className="intent-section">

                        <div className="section-title">
                            <span>🧠</span>
                            <h3>Cultural Meaning</h3>
                        </div>

                        <p className="intent-text">
                            {result.cultural_meaning || "Not Available"}
                        </p>

                    </section>


                    {/* WORKPLACE CONTEXT */}
                    <section className="intent-section">

                        <div className="section-title">
                            <span>💼</span>
                            <h3>Workplace Context</h3>
                        </div>

                        <p className="intent-text">
                            {result.workplace_context || "Not Available"}
                        </p>

                    </section>


                    {/* CULTURAL INTENT */}
                    <section className="intent-section">

                        <div className="section-title">
                            <span>🎯</span>
                            <h3>Cultural Intent</h3>
                        </div>

                        <p className="intent-text">
                            {result.cultural_intent || "Not Available"}
                        </p>

                    </section>


                    {/* PROFESSIONAL EQUIVALENT */}
                    <section className="intent-section">

                        <div className="section-title">
                            <span>✨</span>
                            <h3>Professional Workplace Equivalent</h3>
                        </div>

                        <p className="section-description">
                            A culturally appropriate alternative for
                            professional communication.
                        </p>

                        <div className="intent-highlight-box professional">
                            {result.professional_equivalent || "Not Available"}
                        </div>

                    </section>


                    {/* CULTURAL EXPLANATION */}
                    <section className="intent-section last-section">

                        <div className="section-title">
                            <span>🌏</span>
                            <h3>Why K-LINK AI Suggested This</h3>
                        </div>

                        <p className="intent-text">
                            {result.cultural_explanation || "Not Available"}
                        </p>

                    </section>

                </div>
            )}

        </div>
    );
}

export default IntentDetection;