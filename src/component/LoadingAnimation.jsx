import React, { useState, useEffect } from 'react';
import './ABHACard.css';

const LoadingAnimation = ({ message = "Discovering Records..." }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    "Initializing search...",
    "Connecting to healthcare providers...",
    "Scanning medical records...",
    "Processing data...",
    "Finalizing results..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="professional-loading-page">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="time">3:16</span>
          <span className="checkmark">✓</span>
        </div>
        <div className="status-right">
          <span className="volte">Vo</span>
          <span className="wifi">WiFi</span>
          <span className="signal">●●●●●</span>
          <span className="battery">28</span>
        </div>
      </div>

      {/* Loading Content */}
      <div className="professional-loading-content">
        <div className="professional-loading-container">
          {/* Advanced Spinner */}
          <div className="professional-spinner">
            <div className="spinner-ring">
              <div className="spinner-ring-inner">
                <div className="spinner-core">
                  <div className="spinner-pulse"></div>
                </div>
              </div>
            </div>
            <div className="spinner-orbit">
              <div className="orbit-dot"></div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              <div className="progress-glow"></div>
            </div>
            <div className="progress-text">{progress}%</div>
          </div>
          
          {/* Loading Text */}
          <div className="professional-loading-text">
            <h2 className="professional-loading-title">{message}</h2>
            <p className="professional-loading-subtitle">{steps[currentStep]}</p>
          </div>
          
          {/* Animated Elements */}
          <div className="loading-elements">
            <div className="loading-wave">
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
