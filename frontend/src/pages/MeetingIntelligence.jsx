import { useState, useRef } from "react";
import "./MeetingIntelligence.css";

function MeetingIntelligence() {

    const [transcript, setTranscript] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // Voice recognition states
    const [isListening, setIsListening] = useState(false);
    const [voiceLanguage, setVoiceLanguage] = useState("en-US");

    const recognitionRef = useRef(null);


    // =========================================
    // START / STOP VOICE RECOGNITION
    // =========================================

    const toggleVoiceRecognition = () => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert(
                "Voice recognition is not supported in this browser. Please use Google Chrome."
            );
            return;
        }


        // STOP LISTENING
        if (isListening) {

            recognitionRef.current?.stop();

            setIsListening(false);

            return;
        }


        // CREATE RECOGNITION
        const recognition = new SpeechRecognition();

        recognition.lang = voiceLanguage;

        recognition.continuous = true;

        recognition.interimResults = true;


        // =========================================
        // SPEECH RESULT
        // =========================================

        recognition.onresult = (event) => {

            let finalText = "";

            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {

                const transcriptText =
                    event.results[i][0].transcript;

                if (event.results[i].isFinal) {

                    finalText += transcriptText + " ";

                }

            }


            if (finalText) {

                setTranscript((previous) => {

                    if (previous.trim() === "") {
                        return finalText.trim();
                    }

                    return (
                        previous.trim() +
                        " " +
                        finalText.trim()
                    );

                });

            }

        };


        // =========================================
        // START
        // =========================================

        recognition.onstart = () => {
            setIsListening(true);
        };


        // =========================================
        // STOP
        // =========================================

        recognition.onend = () => {
            setIsListening(false);
        };


        // =========================================
        // ERROR
        // =========================================

        recognition.onerror = (event) => {

            console.error(
                "Speech Recognition Error:",
                event.error
            );

            setIsListening(false);

            if (event.error === "not-allowed") {

                alert(
                    "Microphone permission was denied. Please allow microphone access in your browser."
                );

            }

        };


        recognitionRef.current = recognition;

        recognition.start();

    };


    // =========================================
    // ANALYZE MEETING
    // =========================================

    const analyzeMeeting = async () => {

        if (transcript.trim() === "") {

            alert(
                "Please enter or record a meeting transcript."
            );

            return;
        }


        setLoading(true);

        setResult(null);


        try {

            const response = await fetch(
                "http://127.0.0.1:8000/meeting-analysis",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        message: transcript,
                    }),
                }
            );


            if (!response.ok) {
                throw new Error("Backend Error");
            }


            const data = await response.json();


            console.log(
                "Meeting Analysis:",
                data
            );


            setResult(data);


        } catch (error) {

            console.error(error);

            alert(
                "Cannot connect to FastAPI Backend."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="meeting-page">


            {/* =========================================
                HEADER
            ========================================= */}

            <div className="meeting-header">

                <div>

                    <span className="section-label">
                        AI MEETING INTELLIGENCE
                    </span>

                    <h1>
                        Meeting Intelligence
                    </h1>

                    <p>
                        Transform meeting conversations into clear
                        summaries, decisions, and actionable tasks.
                    </p>

                </div>


                <div className="meeting-header-icon">
                    📋
                </div>

            </div>



            {/* =========================================
                TRANSCRIPT INPUT
            ========================================= */}

            <div className="meeting-input-card">


                <div className="input-title">

                    <span>🎙️</span>

                    <div>

                        <h2>
                            Meeting Transcript
                        </h2>

                        <p>
                            Paste your meeting conversation or use
                            your microphone to capture the discussion.
                        </p>

                    </div>

                </div>



                {/* =========================================
                    TEXTAREA
                ========================================= */}

                <textarea
                    rows="12"
                    placeholder="Paste your meeting transcript here or start speaking..."
                    value={transcript}
                    onChange={(e) =>
                        setTranscript(e.target.value)
                    }
                />



                {/* =========================================
                    VOICE CONTROL
                ========================================= */}

                <div className="voice-section">


                    <div className="voice-left">


                        <button
                            className={
                                isListening
                                    ? "mic-button listening"
                                    : "mic-button"
                            }
                            onClick={
                                toggleVoiceRecognition
                            }
                        >

                            <span className="mic-icon">
                                {isListening
                                    ? "⏹"
                                    : "🎙️"}
                            </span>


                            <span>

                                {isListening
                                    ? "Stop Listening"
                                    : "Start Voice Input"}

                            </span>

                        </button>



                        {isListening && (

                            <div className="listening-status">

                                <span className="pulse-dot"></span>

                                Listening...

                            </div>

                        )}

                    </div>



                    {/* =========================================
                        LANGUAGE SELECTOR
                    ========================================= */}

                    <div className="voice-language">

                        <label>
                            Voice Language
                        </label>

                        <select
                            value={voiceLanguage}
                            onChange={(e) =>
                                setVoiceLanguage(
                                    e.target.value
                                )
                            }
                            disabled={isListening}
                        >

                            <option value="en-US">
                                🇺🇸 English
                            </option>

                            <option value="ko-KR">
                                🇰🇷 Korean
                            </option>

                            <option value="ja-JP">
                                🇯🇵 Japanese
                            </option>

                            <option value="ta-IN">
                                🇮🇳 Tamil
                            </option>

                            <option value="hi-IN">
                                🇮🇳 Hindi
                            </option>

                        </select>

                    </div>

                </div>



                {/* =========================================
                    FOOTER
                ========================================= */}

                <div className="input-footer">

                    <span className="character-count">

                        {transcript.length} characters

                    </span>


                    <button
                        onClick={analyzeMeeting}
                        disabled={loading}
                    >

                        {loading ? (

                            <>
                                <span className="spinner"></span>
                                Analyzing...
                            </>

                        ) : (

                            <>
                                ✨ Analyze Meeting
                            </>

                        )}

                    </button>

                </div>

            </div>



            {/* =========================================
                RESULTS
            ========================================= */}

            {result && (

                <div className="meeting-result">


                    <div className="result-heading">

                        <div>

                            <span className="section-label">
                                AI GENERATED REPORT
                            </span>

                            <h2>
                                Meeting Analysis
                            </h2>

                            <p>
                                Here's what K-LINK AI understood
                                from your meeting.
                            </p>

                        </div>


                        <div className="analysis-status">

                            <span className="status-dot"></span>

                            Analysis Complete

                        </div>

                    </div>



                    {/* SUMMARY */}

                    <div className="summary-card">

                        <div className="card-heading">

                            <div className="card-icon">
                                📋
                            </div>

                            <div>

                                <h3>
                                    Meeting Summary
                                </h3>

                                <span>
                                    AI-generated overview
                                </span>

                            </div>

                        </div>


                        <p className="summary-text">

                            {result.summary ||
                                "No summary available."}

                        </p>

                    </div>



                    {/* TOPICS + DECISIONS */}

                    <div className="two-column-grid">


                        <div className="info-card">

                            <div className="card-heading">

                                <div className="card-icon blue">
                                    🎯
                                </div>

                                <div>

                                    <h3>
                                        Main Topics
                                    </h3>

                                    <span>
                                        Key discussion areas
                                    </span>

                                </div>

                            </div>


                            {result.main_topics &&
                            result.main_topics.length > 0 ? (

                                <div className="tag-list">

                                    {result.main_topics.map(
                                        (topic, index) => (

                                            <div
                                                className="topic-tag"
                                                key={index}
                                            >

                                                <span>•</span>

                                                {topic}

                                            </div>

                                        )
                                    )}

                                </div>

                            ) : (

                                <p className="empty-text">
                                    No topics identified.
                                </p>

                            )}

                        </div>



                        <div className="info-card">

                            <div className="card-heading">

                                <div className="card-icon green">
                                    ✓
                                </div>

                                <div>

                                    <h3>
                                        Decisions
                                    </h3>

                                    <span>
                                        Confirmed outcomes
                                    </span>

                                </div>

                            </div>


                            {result.decisions &&
                            result.decisions.length > 0 ? (

                                <div className="decision-list">

                                    {result.decisions.map(
                                        (decision, index) => (

                                            <div
                                                className="decision-item"
                                                key={index}
                                            >

                                                <span className="check">
                                                    ✓
                                                </span>

                                                <span>
                                                    {decision}
                                                </span>

                                            </div>

                                        )
                                    )}

                                </div>

                            ) : (

                                <p className="empty-text">
                                    No decisions identified.
                                </p>

                            )}

                        </div>

                    </div>



                    {/* ACTION ITEMS */}

                    <div className="action-card">

                        <div className="card-heading">

                            <div className="card-icon purple">
                                🚀
                            </div>

                            <div>

                                <h3>
                                    Action Items
                                </h3>

                                <span>
                                    Tasks that need to be completed
                                </span>

                            </div>

                        </div>


                        {result.action_items &&
                        result.action_items.length > 0 ? (

                            <div className="action-list">

                                {result.action_items.map(
                                    (item, index) => (

                                        <div
                                            className="action-item"
                                            key={index}
                                        >

                                            <div className="action-number">
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </div>


                                            <div className="action-content">

                                                <h4>
                                                    {item.task}
                                                </h4>


                                                <div className="action-meta">

                                                    <div>

                                                        <span>
                                                            Responsible
                                                        </span>

                                                        <strong>
                                                            {item.responsible ||
                                                                "Not specified"}
                                                        </strong>

                                                    </div>


                                                    <div>

                                                        <span>
                                                            Deadline
                                                        </span>

                                                        <strong>
                                                            {item.deadline ||
                                                                "Not specified"}
                                                        </strong>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        ) : (

                            <p className="empty-text">
                                No action items identified.
                            </p>

                        )}

                    </div>



                    {/* UNRESOLVED + COMMUNICATION */}

                    <div className="two-column-grid">


                        <div className="warning-card">

                            <div className="card-heading">

                                <div className="card-icon orange">
                                    ⚠️
                                </div>

                                <div>

                                    <h3>
                                        Unresolved Issues
                                    </h3>

                                    <span>
                                        Items requiring attention
                                    </span>

                                </div>

                            </div>


                            {result.unresolved_issues &&
                            result.unresolved_issues.length > 0 ? (

                                <ul className="styled-list">

                                    {result.unresolved_issues.map(
                                        (issue, index) => (

                                            <li key={index}>
                                                {issue}
                                            </li>

                                        )
                                    )}

                                </ul>

                            ) : (

                                <p className="empty-text">
                                    No unresolved issues identified.
                                </p>

                            )}

                        </div>



                        <div className="info-card">

                            <div className="card-heading">

                                <div className="card-icon pink">
                                    💬
                                </div>

                                <div>

                                    <h3>
                                        Communication Issues
                                    </h3>

                                    <span>
                                        Potential workflow concerns
                                    </span>

                                </div>

                            </div>


                            {result.communication_issues &&
                            result.communication_issues.length > 0 ? (

                                <ul className="styled-list">

                                    {result.communication_issues.map(
                                        (issue, index) => (

                                            <li key={index}>
                                                {issue}
                                            </li>

                                        )
                                    )}

                                </ul>

                            ) : (

                                <p className="empty-text">
                                    No communication issues identified.
                                </p>

                            )}

                        </div>

                    </div>



                    {/* TONE */}

                    <div className="tone-card">

                        <div className="tone-icon">
                            🎙️
                        </div>

                        <div>

                            <span>
                                MEETING TONE
                            </span>

                            <h3>
                                {result.meeting_tone ||
                                    "Not available"}
                            </h3>

                        </div>

                    </div>



                    {/* TAKEAWAYS */}

                    <div className="takeaway-card">

                        <div className="card-heading">

                            <div className="card-icon gold">
                                ⭐
                            </div>

                            <div>

                                <h3>
                                    Key Takeaways
                                </h3>

                                <span>
                                    Important points to remember
                                </span>

                            </div>

                        </div>


                        {result.key_takeaways &&
                        result.key_takeaways.length > 0 ? (

                            <div className="takeaway-list">

                                {result.key_takeaways.map(
                                    (takeaway, index) => (

                                        <div
                                            className="takeaway-item"
                                            key={index}
                                        >

                                            <span>
                                                {index + 1}
                                            </span>

                                            <p>
                                                {takeaway}
                                            </p>

                                        </div>

                                    )
                                )}

                            </div>

                        ) : (

                            <p className="empty-text">
                                No key takeaways identified.
                            </p>

                        )}

                    </div>


                </div>

            )}

        </div>
    );
}

export default MeetingIntelligence;