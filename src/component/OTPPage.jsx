import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ChevronDown, Check } from 'lucide-react';
import PatientRegistrationPage from './PatientRegistrationPage';
import CreateABHAPage from './CreateABHAPage';
import ABHASelectionPage from './ABHASelectionPage';
import './OTPPage.css';

const OTPPage = ({ onNavigate, loginMethod, userInput, onBack }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showPatientRegistration, setShowPatientRegistration] = useState(false);
  const [showCreateABHA, setShowCreateABHA] = useState(false);
  const [showAadhaarVerification, setShowAadhaarVerification] = useState(false);
  const [showABHASelection, setShowABHASelection] = useState(false);
  const [aadharNumber, setAadharNumber] = useState(['', '', '']);
  const [aadharValidation, setAadharValidation] = useState(null); // null, 'checking', 'registered', 'not-registered', 'mismatch'
  const [isCheckingAadhar, setIsCheckingAadhar] = useState(false);
  const inputRefs = useRef([]);

  // Auto-type OTP effect
  useEffect(() => {
    if (!isTyping) {
      setIsTyping(true);
      const autoTypeOTP = async () => {
        const demoOTP = '786453';
        
        for (let i = 0; i < demoOTP.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 300));
          setOtp(prev => {
            
            const newOtp = [...prev];
            newOtp[i] = demoOTP[i];
            return newOtp;
          });
          setCurrentIndex(i + 1);
        }
        
        // Auto-submit after typing is complete
        setTimeout(() => {
          handleVerifyOTP();
        }, 500);
      };
      
      autoTypeOTP();
    }
  }, [isTyping]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowResend(true);
    }
  }, [countdown]);

  const handleInputChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Move to next input if current is filled
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = useCallback(() => {
    const otpString = otp.join('');
    console.log('Verifying OTP:', otpString);
    console.log('Login method:', loginMethod);
    console.log('User input:', userInput);
    
    // Simulate verification process
    setTimeout(() => {
      // For demo purposes, we'll check if the user input contains certain patterns
      // In real implementation, this would be a proper API call
      const isRegistered = checkIfUserIsRegistered(userInput, loginMethod);
      
      if (isRegistered) {
        // OLD PATIENT: User is already registered, show ABHA selection page
        console.log('Old patient detected - showing ABHA selection page');
        setShowABHASelection(true);
      } else {
        // NEW USER: User is not registered, proceed with registration flow
        console.log('New user detected - showing registration form');
        if (loginMethod === 'aadhaar') {
          // For Aadhaar users, show verification popup first
          setShowAadhaarVerification(true);
        } else {
          // For phone number users, go to Patient Registration page
          setShowPatientRegistration(true);
        }
      }
    }, 1000);
  }, [otp, loginMethod, userInput]);

  // Mock function to check if user is already registered
  const checkIfUserIsRegistered = (userInput, loginMethod) => {
    // In a real application, this would be an API call to check database
    // For demo purposes, we'll simulate some logic
    
    if (loginMethod === 'aadhaar') {
      // Check if Aadhaar number has existing ABHA
      // DEMO: Numbers containing '1234' or '5678' are OLD PATIENTS
      return userInput.includes('1234') || userInput.includes('5678');
    } else {
      // Check if phone number has existing ABHA
      // DEMO: Numbers containing '1234' or '5678' are OLD PATIENTS
      return userInput.includes('1234') || userInput.includes('5678');
    }
  };

  const handleResendOTP = () => {
    setCountdown(30);
    setShowResend(false);
    console.log('Resending OTP...');
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

  const handlePatientRegistrationNavigate = (action) => {
    if (action === 'back') {
      setShowPatientRegistration(false);
    } else if (action === 'success') {
      // Show thank you popup after ABHA creation
      setShowPatientRegistration(false);
      setShowThankYou(true);
    }
  };

  const handleCreateABHANavigate = (action) => {
    if (action === 'back') {
      setShowCreateABHA(false);
    } else if (action === 'success') {
      // Show thank you popup after ABHA creation
      setShowCreateABHA(false);
      setShowThankYou(true);
    } else if (action === 'abha') {
      // Navigate to ABHA page
      setShowCreateABHA(false);
      if (onNavigate) {
        onNavigate('abha');
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
    if (loginMethod === 'aadhaar' && aadharString !== userInput) {
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
        // Aadhar is already registered, proceed to Create ABHA Address page
        console.log('Aadhar is registered, proceeding to CreateABHA');
        setShowAadhaarVerification(false);
        setShowCreateABHA(true);
      } else if (aadharValidation === 'mismatch') {
        // Aadhar number doesn't match, show error message
        console.log('Aadhar number mismatch, showing error message');
      } else {
        // Aadhar is not registered, show "link first" message
        console.log('Aadhar is not registered, showing error message');
      }
    }
  };

  const handleAadhaarVerificationClose = () => {
    setShowAadhaarVerification(false);
    setAadharNumber(['', '', '']);
    setAadharValidation(null);
    setIsCheckingAadhar(false);
    // Navigate to Create ABHA Address page
    setShowCreateABHA(true);
  };

  const handleThankYouClose = () => {
    setShowThankYou(false);
    // Navigate to next step or show success
    if (onNavigate) {
      onNavigate('success');
    }
  };

  const handleABHASelectionNavigate = (action, data) => {
    if (action === 'back') {
      setShowABHASelection(false);
    } else if (action === 'ujur-profile') {
      // Navigate to UjurProfilePage with selected ABHA data
      setShowABHASelection(false);
      if (onNavigate) {
        onNavigate('ujur-profile', data);
      }
    } else if (action === 'patient-registration') {
      // Navigate to patient registration
      setShowABHASelection(false);
      setShowPatientRegistration(true);
    } else if (action === 'create-abha') {
      // Navigate directly to Create ABHA page for Aadhar users
      setShowABHASelection(false);
      setShowCreateABHA(true);
    }
  };

  const getDisplayText = () => {
    if (loginMethod === 'aadhaar') {
      const maskedAadhaar = userInput.replace(/(\d{4})(\d{4})(\d{4})/, '$1 **** ****');
      return `Enter the OTP sent to your mobile number linked with Aadhaar ${maskedAadhaar}`;
    } else {
      const maskedMobile = userInput.replace(/(\d{3})(\d{3})(\d{4})/, '$1 *** $3');
      return `Enter the OTP sent to ${maskedMobile}`;
    }
  };

  // If ABHA Selection page is shown, render ABHASelectionPage component
  if (showABHASelection) {
    const mockExistingABHAs = [
      {
        address: 'mishrahs260526@abdm',
        name: 'hs mishra'
      }
    ];
    
    return (
      <ABHASelectionPage
        onNavigate={handleABHASelectionNavigate}
        onBack={() => setShowABHASelection(false)}
        existingABHAs={mockExistingABHAs}
        loginMethod={loginMethod}
      />
    );
  }

  // If Create ABHA page is shown, render CreateABHAPage component
  if (showCreateABHA) {
    // Create mock patient data for Aadhaar users
    const mockPatientData = {
      firstName: 'HARI SARAN',
      lastName: 'MISHRA',
      gender: 'Male',
      age: 23,
      aadhaarNumber: userInput,
      phoneNumber: '7682097070', // Mock phone number
      email: 'mishrahs260526@gmail.com', // Mock email
      address: '123 Main Street, City, State',
      pincode: '123456'
    };
    
    return (
      <CreateABHAPage
        onNavigate={handleCreateABHANavigate}
        onBack={() => setShowCreateABHA(false)}
        patientData={mockPatientData}
      />
    );
  }

  // If Patient Registration page is shown, render PatientRegistrationPage component
  if (showPatientRegistration) {
    // Create mock patient data for phone number users
    const mockPatientData = {
      firstName: 'HARI SARAN',
      lastName: 'MISHRA',
      gender: 'Male',
      age: 23,
      phoneNumber: userInput,
      email: 'mishrahs260526@gmail.com', // Mock email
      address: '123 Main Street, City, State',
      pincode: '123456'
    };
    
    return (
      <PatientRegistrationPage
        onNavigate={handlePatientRegistrationNavigate}
        onBack={() => setShowPatientRegistration(false)}
        patientData={mockPatientData}
        loginMethod={loginMethod}
      />
    );
  }

  return (
    <div className="otp-page">
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
        <h1 className="main-title">Enter OTP</h1>
        
        {/* Subtitle */}
        <p className="subtitle">{getDisplayText()}</p>

        {/* OTP Input Fields */}
        <div className="otp-container">
          <div className="otp-input-fields">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value.replace(/\D/g, ''))}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`otp-input ${currentIndex === index ? 'typing' : ''} ${digit ? 'filled' : ''}`}
                maxLength="1"
                disabled={isTyping}
              />
            ))}
          </div>
          
          {/* Auto-typing indicator */}
          {isTyping && (
            <div className="auto-typing-indicator">
              <div className="typing-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <span>Auto-typing OTP...</span>
            </div>
          )}
        </div>

        {/* Verify Button */}
        <button 
          className={`verify-button ${otp.every(digit => digit) ? 'active' : ''}`}
          onClick={handleVerifyOTP}
          disabled={!otp.every(digit => digit) || isTyping}
        >
          <span>Verify OTP</span>
          <ChevronDown className="chevron-icon" />
        </button>

        {/* Resend OTP */}
        <div className="resend-container">
          {!showResend ? (
            <p className="resend-text">
              Resend OTP in <span className="countdown">{countdown}s</span>
            </p>
          ) : (
            <button className="resend-button" onClick={handleResendOTP}>
              Resend OTP
            </button>
          )}
        </div>

        {/* Other Login Options */}
        <div className="other-options">
          <div className="options-header">
            <span>Other login options for ABHA</span>
            <ChevronDown className="options-chevron" />
          </div>
        </div>
      </div>

      {/* Bottom Navigation Indicator */}
      <div className="nav-indicator"></div>

      {/* Aadhaar Verification Popup */}
      {showAadhaarVerification && (
        <div className="aadhaar-verification-popup">
          <div className="aadhaar-verification-content">
            <div className="aadhaar-verification-header">
              <h2 className="aadhaar-verification-title">Enter Aadhaar Number</h2>
              <button className="aadhaar-verification-close" onClick={handleAadhaarVerificationClose}>
                ×
              </button>
            </div>
            
            <div className="aadhaar-verification-body">
              <p className="aadhaar-verification-description">
                Please enter your 12-digit Aadhaar number to complete verification and proceed to create your ABHA address.
              </p>
              
              <div className="aadhaar-input-container">
                <div className="aadhaar-input-fields">
                  {aadharNumber.map((number, index) => (
                    <input
                      key={index}
                      type="text"
                      value={number}
                      onChange={(e) => handleAadharChange(index, e.target.value.replace(/\D/g, ''))}
                      placeholder="XXXX"
                      className="aadhaar-input"
                      maxLength="4"
                      data-aadhar-index={index}
                    />
                  ))}
                </div>
              </div>
              
              <div className="aadhaar-validation-message">
                {aadharValidation === 'checking' && (
                  <div className="validation-checking">
                    <div className="loading-spinner"></div>
                    <span>Checking Aadhaar registration...</span>
                  </div>
                )}
                {aadharValidation === 'registered' && (
                  <div className="validation-success">
                    <span className="success-icon">✓</span>
                    <span>KYC completed! Your Aadhaar is already registered.</span>
                  </div>
                )}
                {aadharValidation === 'not-registered' && (
                  <div className="validation-error">
                    <span className="error-icon">⚠</span>
                    <span>Please link your Aadhaar first before proceeding.</span>
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
            
            <div className="aadhaar-verification-footer">
              <button 
                className="aadhaar-verification-button"
                onClick={handleAadharSubmit}
                disabled={aadharNumber.join('').length !== 12 || isCheckingAadhar}
              >
                {isCheckingAadhar ? 'Checking...' : 'Verify Aadhaar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Thank You Popup */}
      {showThankYou && (                               
        <div className="thank-you-popup">
          <div className="thank-you-content">
            <div className="thank-you-icon">
              <Check />
            </div>
            <h2 className="thank-you-title">Verification Complete!</h2>
            <p className="thank-you-message">
              {loginMethod === 'aadhaar' 
                ? 'Your ABHA account has been successfully created. You can now access all health services and manage your health records securely.'
                : 'Your phone number has been successfully verified. You can now access healthcare services using your mobile number.'
              }
            </p>
            <button className="thank-you-button" onClick={handleThankYouClose}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OTPPage;
