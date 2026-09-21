import { useState } from "react";
import "./Miscommunication.css";

function Miscommunication() {
    const [message, setMessage] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const analyzeMessage = async () => {
        if (message.trim() === "") {
            alert("Please enter a message.");
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/analyze",
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

            console.log(data);
            setResult(data);

        } catch (error) {
            console.error(error);
            alert("Cannot connect to FastAPI Backend.");
        } finally {
            setLoading(false);
        }
    };

    const getRiskLevel = (score) => {
        if (score >= 70) return "High Risk";
        if (score >= 40) return "Medium Risk";
        return "Low Risk";
    };

    return (
        <div className="mis-page">

            {/* HEADER */}
            <div className="mis-header">
                <div>
                    <p className="page-label">K-LINK AI</p>

                    <h1>
                        Workplace Communication
                        <span> Analyzer</span>
                    </h1>

                    <p className="subtitle">
                        Analyze workplace messages before sending them.
                        Detect tone, emotion, intent and communication risks.
                    </p>
                </div>
            </div>


            {/* INPUT CARD */}
            <div className="input-card">

                <div className="section-heading">
                    <div className="section-icon">✦</div>

                    <div>
                        <h2>Analyze a Message</h2>
                        <p>
                            Enter a workplace message to analyze its
                            communication style.
                        </p>
                    </div>
                </div>

                <textarea
                    rows="7"
                    placeholder="Example: Could you please send me the report by today?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <div className="input-footer">

                    <span className="character-count">
                        {message.length} characters
                    </span>

                    <button
                        className="analyze-btn"
                        onClick={analyzeMessage}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Analyzing...
                            </>
                        ) : (
                            <>
                                Analyze Message
                                <span className="arrow">→</span>
                            </>
                        )}
                    </button>

                </div>

            </div>


            {/* RESULT */}
            {result && (

                <div className="analysis-container">

                    <div className="result-header">

                        <div>
                            <p className="page-label">AI ANALYSIS</p>

                            <h2>K-LINK AI Analysis</h2>

                            <p>
                                Communication intelligence generated
                                for your workplace message.
                            </p>
                        </div>

                        <div
                            className={`risk-badge ${
                                result.risk_score >= 70
                                    ? "high"
                                    : result.risk_score >= 40
                                    ? "medium"
                                    : "low"
                            }`}
                        >
                            <span>
                                {getRiskLevel(result.risk_score)}
                            </span>

                            <strong>
                                {result.risk_score}/100
                            </strong>
                        </div>

                    </div>


                    {/* ORIGINAL MESSAGE */}
                    <div className="message-preview">

                        <h3>Original Message</h3>

                        <div className="original-message">
                            {result.original_message}
                        </div>

                    </div>


                    {/* BASIC ANALYSIS */}
                    <div className="analysis-grid">

                        <div className="info-card">
                            <span className="info-label">
                                Detected Language
                            </span>

                            <strong>
                                {result.language || "Unknown"}
                            </strong>
                        </div>


                        <div className="info-card">
                            <span className="info-label">
                                Intent
                            </span>

                            <strong>
                                {result.intent || "Not detected"}
                            </strong>
                        </div>


                        <div className="info-card">
                            <span className="info-label">
                                Emotion
                            </span>

                            <strong>
                                {result.emotion || "Not detected"}
                            </strong>
                        </div>


                        <div className="info-card">
                            <span className="info-label">
                                Communication Tone
                            </span>

                            <strong>
                                {result.tone || "Not detected"}
                            </strong>
                        </div>


                        <div className="info-card">
                            <span className="info-label">
                                Professionalism
                            </span>

                            <strong>
                                {result.professionalism || "Not detected"}
                            </strong>
                        </div>

                    </div>


                    {/* TRANSLATION */}
                    <div className="result-section">

                        <div className="section-title">
                            <span>🌐</span>
                            <h3>English Translation</h3>
                        </div>

                        <div className="translation-box">
                            {result.translation || "Translation not available"}
                        </div>

                    </div>


                    {/* PROFESSIONAL REWRITE */}
                    <div className="result-section rewrite-section">

                        <div className="section-title">
                            <span>✦</span>

                            <div>
                                <h3>Professional Rewrite</h3>

                                <p>
                                    A more appropriate English version
                                    for workplace communication.
                                </p>
                            </div>
                        </div>

                        <div className="rewrite-box">
                            {result.rewrite || "Rewrite not available"}
                        </div>

                    </div>


                    {/* ORIGINAL LANGUAGE REWRITE */}
                    <div className="result-section">

                        <div className="section-title">
                            <span>🌏</span>

                            <div>
                                <h3>
                                    Professional Rewrite in Original Language
                                </h3>

                                <p>
                                    The professional version translated
                                    back into the original language.
                                </p>
                            </div>
                        </div>

                        <div className="rewrite-box original-language">
                            {result.translated_rewrite ||
                                "Not Available"}
                        </div>

                    </div>


                    {/* EXPLANATION */}
                    <div className="explanation-section">

                        <div className="section-title">
                            <span>💡</span>

                            <div>
                                <h3>
                                    Why K-LINK AI Suggested This
                                </h3>

                                <p>
                                    Understanding the communication risk
                                    behind the message.
                                </p>
                            </div>
                        </div>

                        <div className="explanation-box">
                            {result.explanation ||
                                "No explanation available."}
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default Miscommunication;