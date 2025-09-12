import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, Plus, Check } from 'lucide-react';
import './ABHASelectionPage.css';

const ABHASelectionPage = ({ onNavigate, onBack, existingABHAs = [], loginMethod = 'mobile' }) => {
  const [selectedABHA, setSelectedABHA] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedButtons, setClickedButtons] = useState(new Set());
  const selectionRef = useRef(null);
  const timeoutRef = useRef(null);

  // Debug logging
  useEffect(() => {
    console.log('ABHASelectionPage mounted, existingABHAs:', existingABHAs);
    console.log('Current selectedABHA:', selectedABHA);
    console.log('Clicked buttons:', Array.from(clickedButtons));
  }, [existingABHAs, selectedABHA, clickedButtons]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleGoBack = useCallback(() => {
    console.log('Go back clicked');
    if (onBack) {
      onBack();
    } else if (onNavigate) {
      onNavigate('back');
    } else {
      window.history.back();
    }
  }, [onBack, onNavigate]);

  const handleABHASelection = useCallback((abha, index) => {
    console.log('ABHA selection attempt:', abha, 'index:', index);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Immediately update visual state - this persists
    setClickedButtons(prev => {
      const newSet = new Set();
      newSet.add(index);
      return newSet;
    });
    
    setIsLoading(true);
    
    // Use setTimeout to ensure state update happens
    timeoutRef.current = setTimeout(() => {
      console.log('Setting selected ABHA to:', abha);
      setSelectedABHA(abha);
      setIsLoading(false);
      
      // Ensure clicked state remains persistent
      setClickedButtons(prev => {
        const newSet = new Set();
        newSet.add(index);
        return newSet;
      });
    }, 100);
  }, []);

  // Reset clicked buttons when selection changes (but keep the selected one)
  useEffect(() => {
    if (selectedABHA) {
      const selectedIndex = existingABHAs.findIndex(abha => abha === selectedABHA);
      if (selectedIndex !== -1) {
        setClickedButtons(new Set([selectedIndex]));
      }
    }
  }, [selectedABHA, existingABHAs]);

  const handleContinue = useCallback(() => {
    console.log('Continue clicked, selectedABHA:', selectedABHA);
    if (selectedABHA && onNavigate) {
      console.log('Navigating with selected ABHA:', selectedABHA);
      onNavigate('ujur-profile', { selectedABHA });
    } else {
      console.log('Cannot continue - no ABHA selected or no navigate function');
    }
  }, [selectedABHA, onNavigate]);

  const handleCreateNewABHA = useCallback(() => {
    console.log('Create new ABHA clicked, loginMethod:', loginMethod);
    if (onNavigate) {
      if (loginMethod === 'aadhaar') {
        // For Aadhar login, go directly to ABHA address suggestion page
        onNavigate('create-abha');
      } else {
        // For other login methods, go to patient registration page
        onNavigate('patient-registration');
      }
    }
  }, [onNavigate, loginMethod]);

  // Force re-render when selection changes
  useEffect(() => {
    console.log('Selection changed, forcing re-render');
    if (selectionRef.current) {
      selectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedABHA]);

  return (
    <div className="abha-selection-page">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="time">6:28</span>
        </div>
        <div className="status-right">
          <span className="bluetooth">📶</span>
          <span className="wifi">📶</span>
          <span className="volte">VoLTE</span>
          <span className="battery">11%</span>
        </div>
      </div>

      {/* Header */}
      <div className="header">
        <button className="back-button" onClick={handleGoBack}>
          <ArrowLeft className="back-icon" />
        </button>
        <h1 className="header-title">Select ABHA to continue</h1>
        <div className="header-spacer"></div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-text">
          <p className="description">
            We found {existingABHAs.length} ABHA addresses select one you want to log in with
          </p>
        </div>

        {/* ABHA Selection Cards - Button Based */}
        <div className="abha-selection-container" ref={selectionRef}>
          {existingABHAs.map((abha, index) => {
            const isSelected = selectedABHA === abha;
            const isClicked = clickedButtons.has(index);
            const isActive = isSelected || isClicked;
            
            console.log(`Rendering ABHA ${index}:`, abha, 'isSelected:', isSelected, 'isClicked:', isClicked, 'isActive:', isActive);
            
            return (
              <button
                key={`abha-button-${index}-${abha.address}`}
                className={`abha-card-button ${isActive ? 'selected' : ''} ${isLoading ? 'loading' : ''} ${isClicked ? 'clicked' : ''}`}
                onClick={() => {
                  console.log(`Button clicked for ABHA ${index}:`, abha);
                  handleABHASelection(abha, index);
                }}
                disabled={isLoading}
                type="button"
                data-abha-index={index}
                data-abha-address={abha.address}
                style={{
                  pointerEvents: 'auto',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                <div className="selection-indicator">
                  {isActive ? (
                    <div className="selected-icon">
                      <Check size={16} />
                    </div>
                  ) : (
                    <div className="unselected-icon"></div>
                  )}
                </div>
                <div className="abha-info">
                  <div className="abha-address">{abha.address}</div>
                  <div className="abha-name">{abha.name}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text">or</span>
          <div className="divider-line"></div>
        </div>

        {/* Create New ABHA Button */}
        <button 
          className="create-new-abha-btn" 
          onClick={handleCreateNewABHA}
          type="button"
        >
          <Plus className="plus-icon" />
          <span>Create new ABHA Address</span>
        </button>
      </div>

      {/* Continue Button */}
      <div className="continue-section">
        <button 
          className={`continue-button ${selectedABHA ? 'active' : 'disabled'}`}
          onClick={handleContinue}
          disabled={!selectedABHA || isLoading}
          type="button"
        >
          {isLoading ? 'Loading...' : 'Continue'}
        </button>
      </div>

      {/* Android Navigation Bar */}
      <div className="android-nav">
        <div className="nav-item">□</div>
        <div className="nav-item">○</div>
        <div className="nav-item">△</div>
      </div>
    </div>
  );
};

export default ABHASelectionPage;