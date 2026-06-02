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