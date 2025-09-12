import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import ABHACard from './ABHACard';
import ABHACardComplete from './ABHACardComplete';
import { saveABHACard } from '../utils/abhaStorage';
import './UjurProfilePage.css';

const EkaProfilePage = ({ onNavigate, onBack, loginMethod = 'aadhaar', originalAadharNumber = '' }) => {
  const [formData, setFormData] = useState({
    firstName: 'hs',
    lastName: 'mishra',
    gender: 'Male',
    dateOfBirth: '05/26/2002',
    pincode: ''
  });
  const [errors, setErrors] = useState({});
  const [showThankYou, setShowThankYou] = useState(false);
  const [showABHACard, setShowABHACard] = useState(false);
  const [showABHACardComplete, setShowABHACardComplete] = useState(false);
  const [showAadharAuth, setShowAadharAuth] = useState(false);
  const [aadharNumber, setAadharNumber] = useState(['', '', '']);
  const [aadharValidation, setAadharValidation] = useState(null); // null, 'checking', 'registered', 'not-registered'
  const [isCheckingAadhar, setIsCheckingAadhar] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleGenderSelect = (gender) => {
    setFormData(prev => ({
      ...prev,
      gender: gender
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select gender';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Eka Profile Data:', formData);
      
      if (loginMethod === 'aadhaar') {
        // For Aadhar users, directly show completed ABHA card
        // Skip Aadhar authentication since they already authenticated during login
        setShowThankYou(true);
      } else {
        // For other users, go directly to thank you page
        setShowThankYou(true);
      }
    }
  };

  const handleAadharChange = (index, value) => {
    const newAadharNumbers = [...aadharNumber];
    newAadharNumbers[index] = value;
    setAadharNumber(newAadharNumbers);
    
    // Auto-focus next field if current field is filled
    if (value.length === 4 && index < 2) {
      const nextInput = document.querySelector(`input[data-aadhar-index="${index + 1}"]`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const checkAadharRegistration = async (aadharString) => {
    setIsCheckingAadhar(true);
    setAadharValidation('checking');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Only check for mismatch if user is going through Aadhar login
    if (loginMethod === 'aadhaar' && originalAadharNumber && aadharString !== originalAadharNumber) {
      setAadharValidation('mismatch');
      setIsCheckingAadhar(false);
      return false;
    }
    
    // Mock registration check - in real implementation, this would be an API call
    // DEMO: Numbers containing '1234' or '5678' are already registered
    const isRegistered = aadharString.includes('1234') || aadharString.includes('5678');
    
    setAadharValidation(isRegistered ? 'registered' : 'not-registered');
    setIsCheckingAadhar(false);
    
    return isRegistered;
  };

  const handleAadharSubmit = async () => {
    const aadharString = aadharNumber.join('');
    if (aadharString.length === 12) {
      const isRegistered = await checkAadharRegistration(aadharString);
      
      if (isRegistered) {
        // Aadhar is already registered, proceed to thank you page
        console.log('Aadhar is registered, proceeding to thank you page');
        setShowAadharAuth(false);
        setShowThankYou(true);
      } else {
        // Aadhar is not registered, show "link first" message
        console.log('Aadhar is not registered, showing error message');
      }
    }
  };

  const handleAadharAuthClose = () => {
    setShowAadharAuth(false);
    setAadharNumber(['', '', '']);
    setAadharValidation(null);
    setIsCheckingAadhar(false);
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

  const handleThankYouClose = () => {
    setShowThankYou(false);
    
    if (loginMethod === 'aadhaar') {
      // Aadhaar users: Directly show final ABHA complete card with KYC completed
      const completedUserData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        age: new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear(),
        abhaAddress: 'mishrahs260526@abdm',
        abhaNumber: '70746324465247',
        kycCompleted: true
      };

      // Persist final card data
      saveABHACard(completedUserData);

      setShowABHACard(false);
      setShowABHACardComplete(true);
    } else {
      // Phone/New users: Show intermediate ABHA card for KYC verification
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        age: new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear(),
        abhaAddress: 'mishrahs260526@abdm',
        abhaNumber: null // Will be null until KYC is completed
      };
      
      saveABHACard(userData);
      
      // Show ABHA card after profile creation for KYC verification
      setShowABHACard(true);
    }
  };

  const handleABHACardNavigate = (action) => {
    if (action === 'home') {
      setShowABHACard(false);
      if (onNavigate) {
        onNavigate('success');
      }
    } else if (action === 'complete') {
      setShowABHACard(false);
      setShowABHACardComplete(true);
    } else if (action === 'back') {
      setShowABHACard(false);
      if (onBack) {
        onBack();
      }
    }
  };

  const handleABHACardCompleteNavigate = (action) => {
    if (action === 'back') {
      setShowABHACardComplete(false);
      setShowABHACard(true);
    } else if (action === 'home') {
      setShowABHACardComplete(false);
      if (onNavigate) {
        onNavigate('success');
      }
    }
  };

  // If ABHA card complete is shown, render ABHACardComplete component
  if (showABHACardComplete) {
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      age: new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear(),
      abhaAddress: 'mishrahs260526@abdm',
      abhaNumber: '70746324465247',
      kycCompleted: true
    };

    return (
      <ABHACardComplete 
        onNavigate={handleABHACardCompleteNavigate}
        userData={userData}
      />
    );
  }

  // If ABHA card is shown, render ABHACard component
  if (showABHACard) {
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      age: new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear(),
      abhaAddress: 'mishrahs260526@abdm', // This would come from the ABHA creation process
      abhaNumber: null // Will be null until KYC is completed
    };
    
    return (
      <ABHACard 
        onNavigate={handleABHACardNavigate}
        userData={userData}
        loginMethod={loginMethod}
      />
    );
  }

  // If Aadhar authentication is shown, render Aadhar auth modal
  if (showAadharAuth) {
    return (
      <div className="eka-profile-page">
        <div className="aadhar-auth-modal-overlay">
          <div className="aadhar-auth-modal-container">
            <div className="aadhar-auth-modal-content">
              <div className="aadhar-auth-modal-header">
                <h2 className="aadhar-auth-modal-title">Aadhar Authentication</h2>
                <button className="aadhar-auth-modal-close" onClick={handleAadharAuthClose}>
                  ×
                </button>
              </div>
              
              <div className="aadhar-auth-modal-body">
                <p className="aadhar-auth-modal-description">
                  Please enter your 12-digit Aadhar number to complete authentication and proceed.
                </p>
                
                <div className="aadhar-input-container">
                  <div className="aadhar-input-fields">
                    {aadharNumber.map((number, index) => (
                      <input
                        key={index}
                        type="text"
                        value={number}
                        onChange={(e) => handleAadharChange(index, e.target.value.replace(/\D/g, ''))}
                        placeholder="XXXX"
                        className="aadhar-input"
                        maxLength="4"
                        data-aadhar-index={index}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="aadhar-validation-message">
                  {aadharValidation === 'checking' && (
                    <div className="validation-checking">
                      <div className="loading-spinner"></div>
                      <span>Checking Aadhar registration...</span>
                    </div>
                  )}
                  {aadharValidation === 'registered' && (
                    <div className="validation-success">
                      <span className="success-icon">✓</span>
                      <span>Authentication successful! Your Aadhar is verified.</span>
                    </div>
                  )}
                  {aadharValidation === 'not-registered' && (
                    <div className="validation-error">
                      <span className="error-icon">⚠</span>
                      <span>Please link your Aadhar first before proceeding.</span>
                    </div>
                  )}
                  {aadharValidation === 'mismatch' && (
                    <div className="validation-error">
                      <span className="error-icon">⚠</span>
                      <span>This Aadhar number is not matched with the previous one as given, please enter a valid Aadhar number.</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="aadhar-auth-modal-footer">
                <button 
                  className="aadhar-auth-submit-button"
                  onClick={handleAadharSubmit}
                  disabled={aadharNumber.join('').length !== 12 || isCheckingAadhar}
                >
                  {isCheckingAadhar ? 'Checking...' : 'Verify Aadhar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If thank you page is shown, render thank you popup
  if (showThankYou) {
    return (
      <div className="eka-profile-page">
        <div className="thank-you-popup">
          <div className="thank-you-content">
            <div className="thank-you-icon">✓</div>
            <h2 className="thank-you-title">Profile Created Successfully!</h2>
            <p className="thank-you-message">
              Your Ujur profile has been created successfully. You can now access all healthcare services.
            </p>
            <button className="thank-you-button" onClick={handleThankYouClose}>
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="eka-profile-page">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="time">5:28</span>
          <span className="cloud-icon">☁</span>
          <span className="dots">⋯</span>
        </div>
        <div className="status-right">
          <span className="volte">Vo LTE</span>
          <span className="network">4G+</span>
          <div className="signal-bars">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <span className="battery-icon">🔋</span>
          <span className="battery">4</span>
        </div>
      </div>

      {/* Header */}
      <div className="header">
        <button className="back-button" onClick={handleGoBack}>
          <ArrowLeft className="arrow-icon" />
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Title */}
        <div className="title-section">
          <h1 className="main-title">
            <span className="title-small">Create your</span>
            <span className="title-large">Ujur Profile</span>
          </h1>
        </div>

        {/* Registration Form */}
        <form className="profile-form" onSubmit={handleSubmit}>
          {/* Your name */}
          <div className="form-group">
            <div className="input-label">
              <span>Your name</span>
              <span className="required">*</span>
            </div>
            <div className="name-inputs">
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className={`name-input ${errors.firstName ? 'error' : ''}`}
                placeholder="First name"
              />
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className={`name-input ${errors.lastName ? 'error' : ''}`}
                placeholder="Last name"
              />
            </div>
            {(errors.firstName || errors.lastName) && (
              <span className="error-message">
                {errors.firstName || errors.lastName}



              </span>
            )}
          </div>

          {/* Gender */}
          <div className="form-group">
            <div className="input-label">
              <span>Gender</span>
              <span className="required">*</span>
            </div>
            <div className="gender-buttons">
              <button
                type="button"
                className={`gender-button ${formData.gender === 'Male' ? 'selected' : ''}`}
                onClick={() => handleGenderSelect('Male')}
              >
                Male
              </button>
              <button
                type="button"
                className={`gender-button ${formData.gender === 'Female' ? 'selected' : ''}`}
                onClick={() => handleGenderSelect('Female')}
              >
                Female
              </button>
              <button
                type="button"
                className={`gender-button ${formData.gender === 'Other' ? 'selected' : ''}`}
                onClick={() => handleGenderSelect('Other')}
              >
                Other
              </button>
            </div>
            {errors.gender && (
              <span className="error-message">{errors.gender}</span>
            )}
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <div className="input-label">
              <span>Date of Birth</span>
              <span className="required">*</span>
            </div>
            <div className="date-input-container">
              <input
                type="text"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className={`date-input ${errors.dateOfBirth ? 'error' : ''}`}
                placeholder="MM/DD/YYYY"
                maxLength="10"
              />
              <ChevronDown className="date-chevron" />
            </div>
            {errors.dateOfBirth && (
              <span className="error-message">{errors.dateOfBirth}</span>
            )}
          </div>

          {/* Pincode */}
          <div className="form-group">
            <div className="input-label">
              <span>Pincode</span>
              <span className="required">*</span>
            </div>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, ''))}
              className={`pincode-input ${errors.pincode ? 'error' : ''}`}
              placeholder="Enter Pincode"
              maxLength="6"
            />
            {errors.pincode && (
              <span className="error-message">{errors.pincode}</span>
            )}
          </div>

          {/* Create Profile Button */}
          <button 
            type="submit"
            className="create-profile-button"
          >
            Create Profile
          </button>
        </form>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bottom-nav">
        <div className="nav-item">
          <div className="nav-icon square"></div>
        </div>
        <div className="nav-item">
          <div className="nav-icon circle"></div>
        </div>
        <div className="nav-item">
          <div className="nav-icon triangle"></div>
        </div>
      </div>
    </div>
  );
};

export default EkaProfilePage;
