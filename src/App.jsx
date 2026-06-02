import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle2, RefreshCw } from 'lucide-react';
function App() {
  const [isParsing, setIsParsing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = async (file) => {
    setIsParsing(true);
    setError(null);
    try {
      const text = await extractText(file);
      const data = parseResumeLocally(text);
      const scoringResult = calculateScore(data, text);

      setResult({
        profile: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
        },
        skills: data.skills,
        parsedData: data,
        ...scoringResult
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to process resume. Please try again.");
      setIsParsing(false);
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <div className="app-shell">
      <BackgroundEffects />
      <Header />

      <main className="main-content" id="main-content">
        <AnimatePresence mode="wait">
          {/* Upload State */}
          {!result && !isParsing && (
            <motion.div
              key="uploader"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5 }}
              className="upload-section"
            >
              <div className="hero-badge">
                <Brain size={14} />
                <span>AI-Powered Analysis</span>
              </div>
              <h2 className="hero-title">
                Analyze Your Resume
                <span className="hero-title-accent"> Intelligently</span>
              </h2>
              <p className="hero-subtitle">
                Get instant feedback on your resume's impact, skills coverage, structure quality,
                and job compatibility — all processed locally for complete privacy.
              </p>

              {error && (
                <div className="error-banner" id="error-banner">
                  <span>⚠️ {error}</span>
                </div>
              )}

              <FileUploader onFileSelect={handleFileSelect} />

              <div className="hero-features">
                <div className="hero-feature">
                  <span className="feature-icon">🔒</span>
                  <span>100% Private</span>
                </div>
                <div className="hero-feature">
                  <span className="feature-icon">⚡</span>
                  <span>Instant Results</span>
                </div>
                <div className="hero-feature">
                  <span className="feature-icon">📊</span>
                  <span>7-Point Scoring</span>
                </div>
                <div className="hero-feature">
                  <span className="feature-icon">🎯</span>
                  <span>JD Matching</span>
                </div>
              </div>
            </motion.div>
          )}

              {/* Parsing State */}
          {isParsing && (
            <motion.div
              key="parsing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="parsing-state"
            >
              <div className="brain-animation">
                <Brain size={56} className="pulse-brain" />
                <div className="brain-ring"></div>
                <div className="brain-ring brain-ring-2"></div>
              </div>
              <h3 className="parsing-title">Analyzing Your Resume</h3>
              <p className="parsing-desc">Extracting skills, scoring impact, and generating insights...</p>
              <div className="parsing-progress">
                <div className="parsing-progress-bar"></div>
              </div>
            </motion.div>
          )}

          {/* Result State */}
          {result && !isParsing && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="success-banner" id="success-banner">
                <CheckCircle2 size={18} />
                <span>Resume analyzed successfully!</span>
              </div>

              <Dashboard data={result} />

              <button
                className="reset-btn"
                onClick={() => { setResult(null); setError(null); }}
                id="reset-btn"
              >
                <RefreshCw size={18} />
                Analyze Another Resume
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;