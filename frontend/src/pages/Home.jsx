import { Link } from "react-router-dom";

function Home() {
  return (
    <div>

      <nav className="navbar">

        <div className="logo">
          K-LINK AI
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/miscommunication">Predictor</Link>
          <Link to="/intent-detection">Intent Detection</Link>
          <Link to="/meeting-intelligence">Meeting Intelligence</Link>
          <Link to="/simulator">Simulator</Link>
        </div>

      </nav>

      <section className="hero">

        <h1>
          Cross-Cultural Workplace Intelligence
        </h1>

        <p>
          AI that understands language, culture,
          workplace hierarchy, communication styles,
          and professional context across global teams.
        </p>

        <a href="#features">
  <button className="hero-btn">
    Explore Platform
  </button>
</a>

      </section>
      <section className="about-project">

  <h2>Why K-LINK AI?</h2>

  <div className="about-grid">

    <div className="problem-box">
      <h3>Current Workplace Challenges</h3>

      <ul>
        <li>Misunderstood messages across cultures</li>
        <li>Different communication styles</li>
        <li>Hidden intentions in workplace conversations</li>
        <li>Inefficient meetings and unclear action items</li>
        <li>Difficulty communicating across global teams</li>
      </ul>
    </div>

    <div className="solution-box">
      <h3>Our AI Solution</h3>

      <ul>
        <li>AI-powered communication analysis</li>
        <li>Cultural intent understanding</li>
        <li>Workplace risk prediction</li>
        <li>Meeting intelligence and summarization</li>
        <li>Interactive communication training</li>
      </ul>
    </div>

  </div>

</section>

      <section id="features" className="features">

  <Link to="/miscommunication">
    <div className="card">
      <h3>🛡️ Miscommunication Predictor</h3>

      <ul>
        <li>Risk Score Analysis</li>
        <li>Tone Detection</li>
        <li>Professional Rewrites</li>
      </ul>
    </div>
  </Link>

  <Link to="/intent-detection">
    <div className="card">
      <h3>🌍 Cultural Intent Detection</h3>

      <ul>
        <li>Hidden Meaning Detection</li>
        <li>Cultural Context Analysis</li>
        <li>Response Suggestions</li>
      </ul>
    </div>
  </Link>

  <Link to="/meeting-intelligence">
    <div className="card">
      <h3>🎙️ Meeting Intelligence</h3>

      <ul>
        <li>Meeting Summaries</li>
        <li>Action Item Extraction</li>
        <li>Decision Tracking</li>
      </ul>
    </div>
  </Link>

  <Link to="/simulator">
    <div className="card">
      <h3>🎯 Communication Simulator</h3>

      <ul>
        <li>Role-Based Scenarios</li>
        <li>AI Feedback</li>
        <li>Professional Scoring</li>
      </ul>
    </div>
  </Link>

</section>
</div>
  );
}

export default Home;