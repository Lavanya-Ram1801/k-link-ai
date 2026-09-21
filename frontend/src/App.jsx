import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Miscommunication from "./pages/Miscommunication";
import IntentDetection from "./pages/IntentDetection";
import MeetingIntelligence from "./pages/MeetingIntelligence";
import Simulator from "./pages/Simulator";
import RAGAssistant from "./pages/RAGAssistant";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/miscommunication"
          element={<Miscommunication />}
        />

        <Route
          path="/intent-detection"
          element={<IntentDetection />}
        />

        <Route
          path="/meeting-intelligence"
          element={<MeetingIntelligence />}
        />

        <Route
          path="/simulator"
          element={<Simulator />}
        />
        <Route
          path="/rag-assistant"
          element={<RAGAssistant />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;