import React, { useState } from 'react';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import OTPPage from './OTPPage';
import BottomNavigation from './BottomNavigation';
import './LoginPage.css';

const LoginPage = ({ onNavigate }) => {
  const [selectedMethod, setSelectedMethod] = useState('mobile');
  const [mobileNumber, setMobileNumber] = useState('7682097070');
  const [aadhaarNumbers, setAadhaarNumbers] = useState(['', '', '']);
  const [showOtherOptions, setShowOtherOptions] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const handleNext = () => {
    // Validate input before proceeding
    if (selectedMethod === 'mobile') {
      if (mobileNumber.length === 10) {
        setShowOTP(true);
      } else {
        alert('Please enter a valid 10-digit mobile number');
      }
    } else {
      const aadhaarString = aadhaarNumbers.join('');
      if (aadhaarString.length === 12) {
        setShowOTP(true);
      } else {
        alert('Please enter a valid 12-digit Aadhaar number');
      }
    }
  };

  const handleGoBack = () => {
    // Navigate back to previous page
    if (onNavigate) {
      onNavigate('back');
    } else {
      window.history.back();
    }
  };

  const handleAadhaarChange = (index, value) => {
    const newAadhaarNumbers = [...aadhaarNumbers];
    newAadhaarNumbers[index] = value;
    setAadhaarNumbers(newAadhaarNumbers);
    
    // Auto-focus next field if current field is filled
    if (value.length === 4 && index < 2) {
      const nextInput = document.querySelector(`input[data-aadhaar-index="${index + 1}"]`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleBackFromOTP = () => {
    setShowOTP(false);
  };

  const handleOTPNavigate = (action, data) => {
    if (action === 'back') {
      setShowOTP(false);
    } else if (action === 'success') {
      console.log('OTP verification successful!');
      // Navigate to next step or show success message
      if (onNavigate) {
        onNavigate('success');
      }
    } else if (action === 'ujur-profile') {
      // Navigate to UjurProfilePage with selected data and login method
      if (onNavigate) {
        onNavigate('ujur-profile', { ...data, loginMethod: selectedMethod });
      }
    } else if (action === 'abha') {
      // Navigate to ABHA page with selected data
      if (onNavigate) {
        onNavigate('abha', data);
      }
    } else if (action === 'patient-registration') {
      // Navigate to patient registration
      if (onNavigate) {
        onNavigate('patient-registration');
      }
    }
  };

  // If OTP page is shown, render OTPPage component
  if (showOTP) {
    const userInput = selectedMethod === 'mobile' ? mobileNumber : aadhaarNumbers.join('');
    return (
      <OTPPage
        onNavigate={handleOTPNavigate}
        onBack={handleBackFromOTP}
        loginMethod={selectedMethod}
        userInput={userInput}
      />
    );
  }

  return (
    <div className="login-page">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="time">11:46</span>
        
        </div>
        <div className="status-right">
          <div className="signal-bars">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <span className="wifi">📶</span>
          <span className="lte">LTE2</span>
          <span className="battery">47%</span>
        </div>
      </div>

      {/* Go Back Button */}
      <div className="go-back-container">
        <button className="go-back-button" onClick={handleGoBack}>
          <ArrowLeft className="arrow-icon" />
          <span>Go Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Digital Mission Logo */}
        <div className="logo-container">
          <div className="logo-square">
            <img 
              src="/healthLogo.webp" 
              alt="Health Logo" 
              className="health-logo"

            />
          </div>
          <div className="logo-text">Digital Mission</div>
        </div>

        {/* Main Title */}
        <h1 className="main-title">Login or Create your ABHA</h1>
        
        {/* Subtitle */}
        <p className="subtitle">
          {selectedMethod === 'mobile' ? 'Enter your Mobile Number' : 'Enter your Aadhaar Number'}
        </p>

        {/* Login Method Selection */}
        <div className="method-selector">
          
          <button 
            className={`method-tab ${selectedMethod === 'mobile' ? 'active' : ''}`}
            onClick={() => setSelectedMethod('mobile')}
          >
            <div className="method-icon mobile-icon">📱</div>
            <span>Mobile</span>
          </button>
          <button 
            className={`method-tab ${selectedMethod === 'aadhaar' ? 'active' : ''}`}
            onClick={() => setSelectedMethod('aadhaar')}
          >
            <div className="method-icon aadhaar-icon">
              <div className="aadhaar-sun">
                <div className="sun-center"></div>
                <div className="sun-rays">
                  <div className="ray ray-1"></div>
                  <div className="ray ray-2"></div>
                  <div className="ray ray-3"></div>
                  <div className="ray ray-4"></div>
                  <div className="ray ray-5"></div>
                  <div className="ray ray-6"></div>
                  <div className="ray ray-7"></div>
                  <div className="ray ray-8"></div>
                </div>
              </div>
            </div>
            <span>Aadhaar</span>
          </button>
        </div>

        {/* Conditional Input Container */}
        {selectedMethod === 'mobile' ? (
          /* Mobile Number Input */
          <div className="input-container">
            <div className="input-field">
              <div className="country-code">
                <div className="flag-icon">🇮🇳</div>
                <span>+91</span>
              </div>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter mobile number"
                className="mobile-input"
                maxLength="10"
              />
            </div>
          </div>
        ) : (
          /* Aadhaar Number Input */
          <div className="aadhaar-input-container">
            <div className="aadhaar-input-fields">
              {aadhaarNumbers.map((number, index) => (
                <input
                  key={index}
                  type="text"
                  value={number}
                  onChange={(e) => handleAadhaarChange(index, e.target.value.replace(/\D/g, ''))}
                  placeholder="XXXX"
                  className="aadhaar-input"
                  maxLength="4"
                  data-aadhaar-index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* Next Button */}
        <button className="next-button" onClick={handleNext}>
          <span>Next</span>
          <ChevronDown className="chevron-icon" />
        </button>

        {/* Other Login Options */}
        <div className="other-options">
          <div 
            className="options-header"
            onClick={() => setShowOtherOptions(!showOtherOptions)}
          >
            <span>Other login options for ABHA</span>
            <ChevronDown className={`options-chevron ${showOtherOptions ? 'expanded' : ''}`} />
          </div>
          {showOtherOptions && (
            <div className="options-content">
              <div className="option-item">
                <div className="option-icon">🏥</div>
                <span>Hospital Registration</span>
              </div>
              <div className="option-item">
                <div className="option-icon">👨‍⚕️</div>
                <span>Doctor Registration</span>
              </div>
              <div className="option-item">
                <div className="option-icon">💊</div>
                <span>Pharmacy Registration</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentPage="home" 
        onNavigate={onNavigate}
      />
      
    </div>
  );
};

export default LoginPage;
