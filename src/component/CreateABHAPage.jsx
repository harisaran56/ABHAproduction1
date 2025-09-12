import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Loader } from 'lucide-react';
import UjurProfilePage from './UjurProfilePage';
import BottomNavigation from './BottomNavigation';
import { saveABHACard } from '../utils/abhaStorage';
import './CreateABHAPage.css';

const CreateABHAPage = ({ onNavigate, onBack, patientData, loginMethod = 'mobile' }) => {
  const [abhaAddress, setAbhaAddress] = useState('mishrahs260526');
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const [showEkaProfile, setShowEkaProfile] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [addressStatus, setAddressStatus] = useState(null); // null, 'available', 'taken'
  const [checkTimeout, setCheckTimeout] = useState(null);

  const suggestions = [
    'haris2024',
    'healthcare2024',
    'mishrahs260526',
    'mishrahs26052002',
    'user123456',
    'healthcare2024',
    'newuser2024',
    'healthuser123'
  ];

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (checkTimeout) {
        clearTimeout(checkTimeout);
      }
    };
  }, [checkTimeout]);

  // Simulate checking address availability
  const checkAddressAvailability = async (address) => {
    setIsCheckingAvailability(true);
    setAddressStatus(null);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock availability check - in real implementation, this would be an API call
    const takenAddresses = ['mishrahs260526', 'haris2024', 'admin123', 'testuser'];
    const isAvailable = !takenAddresses.includes(address.toLowerCase());
    
    setAddressStatus(isAvailable ? 'available' : 'taken');
    setIsCheckingAvailability(false);
    
    return isAvailable;
  };

  // Debounced address availability check
  const debouncedAvailabilityCheck = (address) => {
    if (checkTimeout) {
      clearTimeout(checkTimeout);
    }
    
    const timeout = setTimeout(() => {
      if (address.length >= 8 && address.length <= 18) {
        checkAddressAvailability(address);
      } else {
        setAddressStatus(null);
        setIsCheckingAvailability(false);
      }
    }, 800);
    
    setCheckTimeout(timeout);
  };

  const handleAddressChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    console.log('Address changed:', value); // Debug log
    setAbhaAddress(value);
    
    // Validate length
    if (value.length >= 8 && value.length <= 18) {
      setIsValid(true);
      // Check availability with debounce
      debouncedAvailabilityCheck(value);
    } else {
      setIsValid(false);
      setAddressStatus(null);
      setIsCheckingAvailability(false);
    }
  };

  const handleSuggestionClick = (index) => {
    console.log('Suggestion clicked:', index, suggestions[index]); // Debug log
    setSelectedSuggestion(index);
    const suggestion = suggestions[index].replace('@abdm', '');
    setAbhaAddress(suggestion);
    setIsValid(true);
    // Check availability for the selected suggestion
    debouncedAvailabilityCheck(suggestion);
  };

  const handleCreate = async () => {
    if (abhaAddress.length >= 8 && abhaAddress.length <= 18) {
      // Check availability before creating
      const isAvailable = await checkAddressAvailability(abhaAddress);
      
      if (!isAvailable) {
        console.log('Address is not available, cannot create');
        return;
      }
      
      const fullAbhaAddress = abhaAddress + '@abdm';
      console.log('Creating ABHA Address:', fullAbhaAddress);
      
      // Combine patient data with ABHA address
      const completeUserData = {
        ...patientData,
        abhaAddress: fullAbhaAddress,
        abhaId: abhaAddress, // Store the ID part separately
        status: 'active'
      };
      
      // Save to storage
      const savedCard = saveABHACard(completeUserData);
      
      if (savedCard) {
        console.log('ABHA Card saved successfully:', savedCard);
        // Navigate to Eka Profile page
        setShowEkaProfile(true);
      } else {
        console.error('Failed to save ABHA card');
        // You could show an error message here
      }
    }
  };

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else if (onNavigate) {
      onNavigate('back');
    } else {
      window.history.back();
    }
  };

  const handleEkaProfileNavigate = (action) => {
    if (action === 'back') {
      setShowEkaProfile(false);
    } else if (action === 'success') {
      // Navigate to thank you page or next step
      setShowEkaProfile(false);
      if (onNavigate) {
        onNavigate('success');
      }
    }
  };

  const isCreateDisabled = abhaAddress.length < 8 || abhaAddress.length > 18 || addressStatus === 'taken' || isCheckingAvailability;

  // If Eka Profile page is shown, render EkaProfilePage component
  if (showEkaProfile) {
    return (
      <UjurProfilePage
        onNavigate={handleEkaProfileNavigate}
        onBack={() => setShowEkaProfile(false)}
        loginMethod={loginMethod}
        originalAadharNumber={patientData?.aadhaarNumber}
      />
    );
  }

  return (
    <div className="create-abha-page">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="time">5:29</span>
        </div>
        <div className="status-right">
          <span className="volte">VoLTE</span>
          <span className="network">4G+</span>
          <span className="wifi">📶</span>
          <span className="battery">5⚡</span>
        </div>
      </div>

      {/* Header */}
      <div className="header">
        <button className="back-button" onClick={handleGoBack}>
          <ArrowLeft className="arrow-icon" />
        </button>
        <h1 className="header-title">Create ABHA Address</h1>
        <div className="header-spacer"></div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Introduction Text */}
        <p className="intro-text">
          This ABHA Address will be used as your identity for ABHA Services.
        </p>

        {/* ABHA Address Input */}
        <div className="input-section">
          <div className="input-label">
            <span>ABHA Address</span>
            <span className="required">*</span>
          </div>
          
          <div className="input-container">
            <input
              type="text"
              value={abhaAddress}
              onChange={handleAddressChange}
              className={`abha-input ${!isValid ? 'invalid' : ''}`}
              placeholder="Enter ABHA address"
              maxLength="18"
            />
            <span className="domain-suffix">@abdm</span>
          </div>
          
          <div className="validation-message">
            {!isValid ? (
              <span className="error-text">8-18 characters alphabets and numbers only</span>
            ) : isCheckingAvailability ? (
              <div className="availability-checking">
                <Loader className="loading-icon" />
                <span className="checking-text">Checking availability...</span>
              </div>
            ) : addressStatus === 'available' ? (
              <div className="availability-available">
                <CheckCircle className="success-icon" />
                <span className="success-text">This ABHA address is available</span>
              </div>
            ) : addressStatus === 'taken' ? (
              <div className="availability-taken">
                <XCircle className="error-icon" />
                <span className="error-text">This ABHA address is already taken, try a new one</span>
              </div>
            ) : (
              <span className="hint-text">8-18 characters alphabets and numbers only</span>
            )}
          </div>
        </div>

        {/* Suggestions */}
        <div className="suggestions-section">
          <h3 className="suggestions-title">Suggestions:</h3>
          <div className="suggestions-container">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className={`suggestion-chip ${selectedSuggestion === index ? 'selected' : ''}`}
                onClick={() => handleSuggestionClick(index)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Create Button - Moved Up */}
        <div className="button-container">
          <button 
            className={`create-button ${!isCreateDisabled ? 'active' : ''}`}
            onClick={handleCreate}
            disabled={isCreateDisabled}
          >
            Create
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentPage="abha" 
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default CreateABHAPage;
