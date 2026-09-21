import { useState, useRef } from "react";

function Simulator() {
  const [role, setRole] = useState("Employee");
  const [scenario, setScenario] = useState("Deadline Delay");
  const [response, setResponse] = useState("");

  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [analysis, setAnalysis] = useState(null);
  const [analysisError, setAnalysisError] = useState("");

  const recognitionRef = useRef(null);

  // ==========================================
  // WORKPLACE SCENARIOS
  // ==========================================

  const scenarios = {
    "Deadline Delay": {
      title: "Handling a Deadline Delay",
      text:
        "Your manager asks why you have not completed an important report that was due today. Respond professionally.",
    },

    "Asking for Clarification": {
      title: "Asking for Clarification",
      text:
        "Your manager gives you a task, but some requirements are unclear. Ask for clarification in a professional way.",
    },

    "Giving Feedback": {
      title: "Giving Feedback",
      text:
        "A teammate has made the same mistake several times. Give constructive feedback without sounding rude.",
    },

    "Handling Disagreement": {
      title: "Handling a Disagreement",
      text:
        "Your teammate disagrees with your approach to a project. Respond respectfully and explain your point of view.",
    },

    "Client Communication": {
      title: "Communicating with a Client",
      text:
        "A client asks why a requested feature has not been delivered yet. Respond professionally and manage their expectations.",
    },
  };

  const currentScenario = scenarios[scenario];

  // ==========================================
  // VOICE INPUT
  // ==========================================

  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge."
      );
      return;
    }

    // Stop previous recognition if any
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let newText = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        if (event.results[i].isFinal) {
          newText += event.results[i][0].transcript;
        }
      }

      if (newText.trim()) {
        setResponse((previous) => {
          if (previous.trim()) {
            return `${previous} ${newText.trim()}`;
          }

          return newText.trim();
        });
      }
    };

    recognition.onerror = (event) => {
      console.error(
        "Speech recognition error:",
        event.error
      );

      setIsListening(false);

      if (event.error === "not-allowed") {
        alert(
          "Microphone permission was denied. Please allow microphone access in your browser."
        );
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (error) {
      console.error("Unable to start microphone:", error);
      setIsListening(false);
    }
  };

  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    setIsListening(false);
  };

  // ==========================================
  // ANALYZE RESPONSE
  // ==========================================

  const handleSubmit = async () => {
    if (!response.trim()) {
      alert("Please type or speak your response first.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysis(null);
    setAnalysisError("");

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/simulator-analysis",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: role,
            scenario: currentScenario.text,
            response: response.trim(),
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          `Backend returned ${res.status}`
        );
      }

      const data = await res.json();

      console.log("Simulator AI response:", data);

      if (data.error) {
        setAnalysisError(data.error);
        return;
      }

      setAnalysis(data);
    } catch (error) {
      console.error(
        "Communication Simulator Error:",
        error
      );

      setAnalysisError(
        "Unable to connect to K-LINK AI. Please make sure the backend is running."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f8fc",
        padding: "50px 7%",
        boxSizing: "border-box",
      }}
    >
      {/* ======================================
          HEADER
      ====================================== */}

      <div style={{ marginBottom: "35px" }}>
        <div
          style={{
            fontSize: "14px",
            letterSpacing: "4px",
            fontWeight: "700",
            color: "#4269a5",
            marginBottom: "10px",
          }}
        >
          WORKPLACE COMMUNICATION
        </div>

        <h1
          style={{
            fontSize: "48px",
            color: "#062b5c",
            margin: "0 0 12px 0",
          }}
        >
          Communication Simulator
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#4d6f9e",
            margin: 0,
            lineHeight: "1.6",
          }}
        >
          Practice real workplace conversations and improve
          your professional communication.
        </p>
      </div>

      {/* ======================================
          MAIN CARD
      ====================================== */}

      <div
        style={{
          background: "white",
          borderRadius: "22px",
          padding: "35px",
          boxShadow:
            "0 8px 30px rgba(0, 40, 90, 0.08)",
          border: "1px solid #dce5f0",
        }}
      >
        {/* ROLE + SCENARIO */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "25px",
            marginBottom: "30px",
          }}
        >
          {/* ROLE */}

          <div>
            <label
              style={{
                display: "block",
                fontSize: "17px",
                fontWeight: "700",
                color: "#062b5c",
                marginBottom: "10px",
              }}
            >
              Your Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "12px",
                border: "1px solid #ccd8e8",
                fontSize: "16px",
                background: "#f8fbff",
                color: "#102f52",
                cursor: "pointer",
              }}
            >
              <option>Employee</option>
              <option>Manager</option>
              <option>Team Member</option>
              <option>Project Lead</option>
              <option>Client</option>
            </select>
          </div>

          {/* SCENARIO */}

          <div>
            <label
              style={{
                display: "block",
                fontSize: "17px",
                fontWeight: "700",
                color: "#062b5c",
                marginBottom: "10px",
              }}
            >
              Workplace Scenario
            </label>

            <select
              value={scenario}
              onChange={(e) => {
                setScenario(e.target.value);
                setAnalysis(null);
                setAnalysisError("");
              }}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "12px",
                border: "1px solid #ccd8e8",
                fontSize: "16px",
                background: "#f8fbff",
                color: "#102f52",
                cursor: "pointer",
              }}
            >
              {Object.keys(scenarios).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ======================================
            SCENARIO
        ====================================== */}

        <div
          style={{
            background: "#f1f6fd",
            borderLeft: "5px solid #315aa8",
            borderRadius: "12px",
            padding: "25px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              letterSpacing: "2px",
              fontWeight: "700",
              color: "#4269a5",
              marginBottom: "8px",
            }}
          >
            🎯 ROLE-BASED SCENARIO
          </div>

          <h2
            style={{
              margin: "0 0 10px 0",
              color: "#062b5c",
              fontSize: "24px",
            }}
          >
            {currentScenario.title}
          </h2>

          <p
            style={{
              margin: 0,
              color: "#344f70",
              fontSize: "17px",
              lineHeight: "1.7",
            }}
          >
            {currentScenario.text}
          </p>

          <p
            style={{
              marginTop: "15px",
              marginBottom: 0,
              color: "#55708f",
              fontSize: "14px",
            }}
          >
            Role: <strong>{role}</strong>
          </p>
        </div>

        {/* ======================================
            RESPONSE BOX
        ====================================== */}

        <div>
          <label
            style={{
              display: "block",
              fontSize: "18px",
              fontWeight: "700",
              color: "#062b5c",
              marginBottom: "10px",
            }}
          >
            Your Response
          </label>

          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Type your workplace response here or use the microphone..."
            rows={7}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "18px",
              borderRadius: "14px",
              border: "1px solid #ccd8e8",
              fontSize: "17px",
              lineHeight: "1.6",
              resize: "vertical",
              outline: "none",
              background: "#fbfdff",
            }}
          />

          {/* VOICE BUTTON */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginTop: "15px",
              flexWrap: "wrap",
            }}
          >
            {!isListening ? (
              <button
                type="button"
                onClick={startVoiceInput}
                style={{
                  padding: "13px 22px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#eaf1fb",
                  color: "#2856a6",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                🎤 Speak Response
              </button>
            ) : (
              <button
                type="button"
                onClick={stopVoiceInput}
                style={{
                  padding: "13px 22px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#b3261e",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                ⏹ Stop Recording
              </button>
            )}

            {isListening && (
              <span
                style={{
                  color: "#b3261e",
                  fontWeight: "600",
                  fontSize: "15px",
                }}
              >
                🔴 Listening...
              </span>
            )}
          </div>
        </div>

        {/* ======================================
            ANALYZE BUTTON
        ====================================== */}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isAnalyzing}
          style={{
            marginTop: "25px",
            padding: "15px 28px",
            border: "none",
            borderRadius: "12px",
            background: isAnalyzing
              ? "#9aaac0"
              : "#2856a6",
            color: "white",
            fontSize: "17px",
            fontWeight: "700",
            cursor: isAnalyzing
              ? "not-allowed"
              : "pointer",
          }}
        >
          {isAnalyzing
            ? "🤖 Analyzing..."
            : "Analyze My Response"}
        </button>
      </div>

      {/* ======================================
          AI FEEDBACK
      ====================================== */}

      <div
        style={{
          marginTop: "30px",
          background: "white",
          borderRadius: "22px",
          padding: "35px",
          boxShadow:
            "0 8px 30px rgba(0, 40, 90, 0.06)",
          border: "1px solid #dce5f0",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            letterSpacing: "3px",
            fontWeight: "700",
            color: "#4269a5",
            marginBottom: "8px",
          }}
        >
          AI FEEDBACK
        </div>

        <h2
          style={{
            color: "#062b5c",
            marginTop: 0,
          }}
        >
          Professional Communication Score
        </h2>

        {/* LOADING */}

        {isAnalyzing && (
          <div
            style={{
              padding: "20px",
              background: "#f1f6fd",
              borderRadius: "12px",
              color: "#2856a6",
              fontWeight: "600",
            }}
          >
            🤖 K-LINK AI is analyzing your
            communication...
          </div>
        )}

        {/* ERROR */}

        {analysisError && !isAnalyzing && (
          <div
            style={{
              padding: "20px",
              background: "#fff1f0",
              borderRadius: "12px",
              color: "#b3261e",
              fontWeight: "600",
              lineHeight: "1.6",
            }}
          >
            ⚠️ {analysisError}
          </div>
        )}

        {/* RESULTS */}

        {analysis && !isAnalyzing && (
          <>
            {/* OVERALL SCORE */}

            <div
              style={{
                textAlign: "center",
                padding: "25px",
                marginBottom: "25px",
                background: "#f1f6fd",
                borderRadius: "16px",
              }}
            >
              <div
                style={{
                  color: "#58708e",
                  fontSize: "15px",
                }}
              >
                Overall Score
              </div>

              <div
                style={{
                  fontSize: "48px",
                  fontWeight: "800",
                  color: "#2856a6",
                }}
              >
                {analysis.overall_score ?? "—"}/100
              </div>
            </div>

            {/* SCORE CARDS */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "15px",
              }}
            >
              {[
                [
                  "Professionalism",
                  analysis.professionalism,
                ],
                ["Politeness", analysis.politeness],
                ["Clarity", analysis.clarity],
                [
                  "Cultural Sensitivity",
                  analysis.cultural_sensitivity,
                ],
              ].map(([label, score]) => (
                <div
                  key={label}
                  style={{
                    padding: "20px",
                    borderRadius: "14px",
                    background: "#f5f8fc",
                    border: "1px solid #dce5f0",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#58708e",
                      marginBottom: "8px",
                    }}
                  >
                    {label}
                  </div>

                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "#2856a6",
                    }}
                  >
                    {score ?? "—"}/100
                  </div>
                </div>
              ))}
            </div>

            {/* WHAT WENT WELL */}

            <div style={{ marginTop: "30px" }}>
              <h3 style={{ color: "#062b5c" }}>
                ✅ What You Did Well
              </h3>

              <p
                style={{
                  color: "#344f70",
                  lineHeight: "1.7",
                }}
              >
                {analysis.what_went_well ||
                  "No feedback available."}
              </p>
            </div>

            {/* AREAS TO IMPROVE */}

            <div style={{ marginTop: "25px" }}>
              <h3 style={{ color: "#062b5c" }}>
                💡 Areas to Improve
              </h3>

              <p
                style={{
                  color: "#344f70",
                  lineHeight: "1.7",
                }}
              >
                {analysis.areas_to_improve ||
                  "No improvement suggestions available."}
              </p>
            </div>

            {/* AI FEEDBACK */}

            <div style={{ marginTop: "25px" }}>
              <h3 style={{ color: "#062b5c" }}>
                🤖 AI Feedback
              </h3>

              <p
                style={{
                  color: "#344f70",
                  lineHeight: "1.7",
                }}
              >
                {analysis.feedback ||
                  "No additional feedback available."}
              </p>
            </div>

            {/* PROFESSIONAL VERSION */}

            <div
              style={{
                marginTop: "25px",
                padding: "25px",
                background: "#f1f6fd",
                borderRadius: "14px",
                borderLeft: "5px solid #315aa8",
              }}
            >
              <h3
                style={{
                  color: "#062b5c",
                  marginTop: 0,
                }}
              >
                ✨ Professional Version
              </h3>

              <p
                style={{
                  color: "#344f70",
                  lineHeight: "1.7",
                  fontSize: "17px",
                }}
              >
                {analysis.professional_version ||
                  "No professional rewrite available."}
              </p>
            </div>
          </>
        )}

        {/* EMPTY STATE */}

        {!analysis &&
          !isAnalyzing &&
          !analysisError && (
            <p
              style={{
                color: "#607895",
                fontSize: "16px",
              }}
            >
              Type or speak your response and click{" "}
              <strong>Analyze My Response</strong> to
              receive AI feedback.
            </p>
          )}
      </div>
    </div>
  );
}

export default Simulator;