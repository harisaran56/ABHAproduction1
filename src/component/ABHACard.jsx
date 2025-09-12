import React, { useState } from 'react';
import { ChevronDown, Settings, QrCode, ChevronRight, Wallet, ArrowLeft, Download } from 'lucide-react';
import ConsentPage from './ConcentPage';
import ProvidersPage from './ProvidersPage';
import BottomNavigation from './BottomNavigation';
import './ABHACard.css';

const ABHACard = ({ onNavigate, userData, loginMethod = 'mobile' }) => {
  const {
    firstName = 'Hari Saran',
    lastName = 'Mishra',
    gender = 'Male',
    age = 23,
    abhaAddress = 'mishrahs260526@abdm',
    abhaNumber = null, // Will be null until KYC is completed
    qrCodeUrl = '/qrcode.jpg' // Default QR code, can be overridden with Aadhar QR code
  } = userData || {};

  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [currentView, setCurrentView] = useState('abha'); // 'abha' or 'consents'
  const [showKYCAnimation, setShowKYCAnimation] = useState(false);
  const [showAadharModal, setShowAadharModal] = useState(false);
  const [aadharNumber, setAadharNumber] = useState(['', '', '']);
  const [aadharValidation, setAadharValidation] = useState(null); // null, 'checking', 'registered', 'not-registered', 'mismatch'
  const [isCheckingAadhar, setIsCheckingAadhar] = useState(false);
  const [originalAadharNumber, setOriginalAadharNumber] = useState('123456789012'); // Mock original Aadhar number
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOTPAutoTyping, setIsOTPAutoTyping] = useState(false);
  const [showLinkingAnimation, setShowLinkingAnimation] = useState(false);

  // Language content mapping
  const languageContent = {
    english: {
      chooseLanguage: 'Choose Language',
      abhaNumberNotAvailable: 'ABHA number not available',
      downloadCard: 'Download Card',
      addToGoogleWallet: 'Add to Google Wallet',
      getAppointmentToken: 'Get appointment token',
      scanQRCode: 'Scan QR code',
      home: 'Home',
      records: 'Records',
      abha: 'ABHA',
      profile: 'Profile',
      advertisement: 'Advertisement',
      freshVeggies: 'Fresh veggies fast',
      freshFruits: 'Fresh fruits & veggies delivered in 10 mins. Enjoy lowest prices + ₹10...',
      minuteDelivery: '10 Minute Delivery'
    },
    hindi: {
      chooseLanguage: 'भाषा चुनें',
      abhaNumberNotAvailable: 'ABHA नंबर उपलब्ध नहीं',
      downloadCard: 'कार्ड डाउनलोड करें',
      addToGoogleWallet: 'Google Wallet में जोड़ें',
      getAppointmentToken: 'अपॉइंटमेंट टोकन प्राप्त करें',
      scanQRCode: 'QR कोड स्कैन करें',
      home: 'होम',
      records: 'रिकॉर्ड्स',
      abha: 'ABHA',
      profile: 'प्रोफाइल',
      advertisement: 'विज्ञापन',
      freshVeggies: 'ताजी सब्जियां तेजी से',
      freshFruits: '10 मिनट में ताजे फल और सब्जियां डिलीवर। सबसे कम कीमतों का आनंद लें + ₹10...',
      minuteDelivery: '10 मिनट डिलीवरी'
    },
    kannada: {
      chooseLanguage: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      abhaNumberNotAvailable: 'ABHA ಸಂಖ್ಯೆ ಲಭ್ಯವಿಲ್ಲ',
      downloadCard: 'ಕಾರ್ಡ್ ಡೌನ್ಲೋಡ್ ಮಾಡಿ',
      addToGoogleWallet: 'Google Wallet ಗೆ ಸೇರಿಸಿ',
      getAppointmentToken: 'ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಟೋಕನ್ ಪಡೆಯಿರಿ',
      scanQRCode: 'QR ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
      home: 'ಮನೆ',
      records: 'ರೆಕಾರ್ಡ್ಗಳು',
      abha: 'ABHA',
      profile: 'ಪ್ರೊಫೈಲ್',
      advertisement: 'ಜಾಹೀರಾತು',
      freshVeggies: 'ತಾಜಾ ತರಕಾರಿಗಳು ವೇಗವಾಗಿ',
      freshFruits: '10 ನಿಮಿಷಗಳಲ್ಲಿ ತಾಜಾ ಹಣ್ಣುಗಳು ಮತ್ತು ತರಕಾರಿಗಳನ್ನು ತಲುಪಿಸಲಾಗುತ್ತದೆ. ಕಡಿಮೆ ಬೆಲೆಗಳನ್ನು ಆನಂದಿಸಿ + ₹10...',
      minuteDelivery: '10 ನಿಮಿಷ ಡೆಲಿವರಿ'
    }
  };

  const currentContent = languageContent[selectedLanguage];

  const handleViewCard = () => {
    console.log('View Card clicked');
  };

  const handleFinishKYC = () => {
    console.log('Finish KYC clicked');
    setShowAadharModal(true);
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
    if (loginMethod === 'aadhaar' && aadharString !== originalAadharNumber) {
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

  // Generate OTP function
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Auto-type OTP function
  const autoTypeOTP = async (otpString) => {
    setIsOTPAutoTyping(true);
    setOtp(['', '', '', '', '', '']);
    
    for (let i = 0; i < otpString.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setOtp(prev => {
        const newOtp = [...prev];
        newOtp[i] = otpString[i];
        return newOtp;
      });
    }
    
    // After auto-typing completes, show linking animation
    setTimeout(() => {
      setIsOTPAutoTyping(false);
      setShowOTPModal(false);
      setShowLinkingAnimation(true);
      
      // After linking animation, proceed to KYC completion
      setTimeout(() => {
        setShowLinkingAnimation(false);
        setShowKYCAnimation(true);
        
        // After KYC animation completes, navigate to ABHA Complete page
        setTimeout(() => {
          setShowKYCAnimation(false);
          if (onNavigate) {
            onNavigate('complete');
          }
        }, 3000);
      }, 2500);
    }, 1000);
  };

  const handleAadharSubmit = async () => {
    const aadharString = aadharNumber.join('');
    if (aadharString.length === 12) {
      const isRegistered = await checkAadharRegistration(aadharString);
      
      if (isRegistered) {
        // Aadhar is already registered, generate OTP and show OTP modal
        const generatedOTP = generateOTP();
        setShowAadharModal(false);
        setShowOTPModal(true);
        
        // Start auto-typing OTP after a short delay
        setTimeout(() => {
          autoTypeOTP(generatedOTP);
        }, 1000);
      } else {
        // Aadhar is not registered, show "link first" message
        // Keep modal open to show the message
      }
    }
  };

  const handleAadharModalClose = () => {
    setShowAadharModal(false);
    setAadharNumber(['', '', '']);
    setAadharValidation(null);
    setIsCheckingAadhar(false);
  };

  const handleGetAppointmentToken = () => {
    console.log('Get appointment token clicked');
  };

  const handleAddToGoogleWallet = () => {
    console.log('Add to Google Wallet clicked');
  };

  const handleScanQRCode = () => {
    console.log('Scan QR code clicked');
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setShowLanguageOptions(false);
  };

  const toggleLanguageOptions = () => {
    setShowLanguageOptions(!showLanguageOptions);
  };

  const closeLanguageOptions = () => {
    setShowLanguageOptions(false);
  };

  const handleGoHome = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const handleGoBack = () => {
    console.log('Back button clicked - navigating back to previous page');
    if (onNavigate) {
      onNavigate('back');
    } else {
      console.warn('onNavigate function not provided - back navigation will not work');
    }
  };

  const handleTabChange = (tab) => {
    setCurrentView(tab);
  };

  const handleInternalNavigation = (tab) => {
    setCurrentView(tab);
  };

  // If current view is consents, render the ConsentPage component
  if (currentView === 'consents') {
    return <ConsentPage onNavigate={onNavigate} userData={userData} onInternalNavigate={handleInternalNavigation} />;
  }

  // If current view is providers, render the ProvidersPage component
  if (currentView === 'providers') {
    return <ProvidersPage onNavigate={onNavigate} userData={userData} onInternalNavigate={handleInternalNavigation} />;
  }

  // If linking animation is shown, render the linking animation component
  if (showLinkingAnimation) {
    return (
      <div className="linking-animation-overlay">
        <div className="linking-animation-container">
          <div className="linking-content">
            <div className="linking-icon">
              <div className="linking-circle">
                <div className="linking-checkmark">
                  <div className="checkmark-stem"></div>
                  <div className="checkmark-kick"></div>
                </div>
              </div>
            </div>
            <h2 className="linking-title">Linking Everything Together!</h2>
            <p className="linking-message">
              Your Aadhaar is being linked with your ABHA account. This process ensures complete verification and security.
            </p>
            <div className="linking-progress">
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
              <div className="progress-steps">
                <div className="step completed">
                  <span className="step-icon">✓</span>
                  <span className="step-text">Aadhaar Verified</span>
                </div>
                <div className="step completed">
                  <span className="step-icon">✓</span>
                  <span className="step-text">OTP Confirmed</span>
                </div>
                <div className="step active">
                  <span className="step-icon">⏳</span>
                  <span className="step-text">Linking ABHA</span>
                </div>
              </div>
            </div>
            <div className="linking-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If KYC animation is shown, render the animation component
  if (showKYCAnimation) {
    return (
      <div className="kyc-animation-overlay">
        <div className="kyc-animation-container">
          <div className="animation-content">
            <div className="success-checkmark">
              <div className="checkmark-circle">
                <div className="checkmark-stem"></div>
                <div className="checkmark-kick"></div>
              </div>
            </div>
            <h2 className="animation-title">ABHA Linked Successfully!</h2>
            <p className="animation-message">
              Your ABHA has been successfully linked to your Aadhaar. You can now access all health services.
            </p>
            <div className="animation-details">
              <div className="detail-item">
                <span className="detail-label">Aadhaar Number:</span>
                <span className="detail-value">**** **** 2605</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className="detail-status verified">✓ Verified & Linked</span>
              </div>
            </div>
            <div className="loading-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If OTP modal is shown, render the OTP modal
  if (showOTPModal) {
    return (
      <div className="otp-modal-overlay">
        <div className="otp-modal-container">
          <div className="otp-modal-content">
            <div className="otp-modal-header">
              <h2 className="otp-modal-title">OTP Verification</h2>
              <button className="otp-modal-close" onClick={() => setShowOTPModal(false)}>
                ×
              </button>
            </div>
            
            <div className="otp-modal-body">
              <p className="otp-modal-description">
                An OTP has been sent to your registered mobile number. Please wait while we auto-fill it for you.
              </p>
              
              <div className="otp-input-container">
                <div className="otp-input-fields">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      value={digit}
                      className={`otp-input ${isOTPAutoTyping ? 'auto-typing' : ''} ${digit ? 'filled' : ''}`}
                      maxLength="1"
                      readOnly
                    />
                  ))}
                </div>
                
                {isOTPAutoTyping && (
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
              
              <div className="otp-status-message">
                <div className="status-success">
                  <span className="success-icon">✓</span>
                  <span>Aadhaar verified successfully! OTP is being processed...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If Aadhar modal is shown, render the modal
  if (showAadharModal) {
    return (
      <div className="aadhar-modal-overlay">
        <div className="aadhar-modal-container">
          <div className="aadhar-modal-content">
            <div className="aadhar-modal-header">
              <h2 className="aadhar-modal-title">Enter Aadhaar Number</h2>
              <button className="aadhar-modal-close" onClick={handleAadharModalClose}>
                ×
              </button>
            </div>
            
            <div className="aadhar-modal-body">
              <p className="aadhar-modal-description">
                Please enter your 12-digit Aadhaar number to complete KYC verification.
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
                    <span>Please link your Aadhaar first before completing KYC.</span>
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
            
            <div className="aadhar-modal-footer">
              <button 
                className="aadhar-submit-button"
                onClick={handleAadharSubmit}
                disabled={aadharNumber.join('').length !== 12 || isCheckingAadhar}
              >
                {isCheckingAadhar ? 'Checking...' : 'Verify Aadhaar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="abha-card-page">
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

      {/* Back Button */}
      <div className="back-button-section">
        <button className="back-button" onClick={handleGoBack}>
          <ArrowLeft className="back-icon" />
        </button>
      </div>

      {/* Language Selection */}
      <div className="language-section">
        <span className="language-label">{currentContent.chooseLanguage}</span>
        <div className="language-options">
          <button 
            className={`language-option ${selectedLanguage === 'english' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('english')}
          >
            English {selectedLanguage === 'english' ? '✓' : ''}
          </button>
          <button 
            className={`language-option ${selectedLanguage === 'hindi' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('hindi')}
          >
            हिन्दी {selectedLanguage === 'hindi' ? '✓' : ''}
          </button>
          <button 
            className={`language-option ${selectedLanguage === 'kannada' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('kannada')}
          >
            ಕನ್ನಡ {selectedLanguage === 'kannada' ? '✓' : ''}
          </button>
          <button className="language-close" onClick={closeLanguageOptions}>×</button>
        </div>
        <Settings className="settings-icon" />
      </div>

      {/* User Profile */}
      <div className="user-profile-section">
        <div className="user-avatar">
          <div className="avatar-circle">
            <span className="avatar-text">{firstName.charAt(0)}{lastName.charAt(0)}</span>
          </div>
        </div>
        <div className="user-info">
          <span className="user-name">{firstName} {lastName}</span>
          <ChevronDown className="dropdown-icon" />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <div 
          className={`nav-tab ${currentView === 'abha' ? 'active' : ''}`}
          onClick={() => handleTabChange('abha')}
        >
          {currentContent.abha}
        </div>
        <div 
          className={`nav-tab ${currentView === 'consents' ? 'active' : ''}`}
          onClick={() => handleTabChange('consents')}
        >
          Consents
        </div>
        <div 
          className={`nav-tab ${currentView === 'providers' ? 'active' : ''}`}
          onClick={() => handleTabChange('providers')}
        >
          Providers
        </div>
      </div>

      {/* Main ABHA Card */}
      <div className="abha-card-container">
        <div className="abha-card">
          {/* Card Header - Dark Blue */}
          <div className="card-header">
            <div className="header-left">
              <div className="national-emblem">
                <div className="emblem-circle">
                  <div className="emblem-center"></div>
                  <div className="emblem-lines">
                    <div className="line line-1"></div>
                    <div className="line line-2"></div>
                    <div className="line line-3"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="header-right">
              <div className="nha-logo">
                <div className="nha-emblem">
                  <div className="nha-center"></div>
                  <div className="nha-lines">
                    <div className="nha-line nha-line-1"></div>
                    <div className="nha-line nha-line-2"></div>
                    <div className="nha-line nha-line-3"></div>
                  </div>
                </div>
                <span className="nha-text">national health authority</span>
              </div>
            </div>
          </div>

          {/* Card Body - White */}
          <div className="card-body">
            <div className="card-content">
              <div className="user-details">
                <h2 className="user-full-name">{firstName} {lastName}</h2>
                <p className="user-demographics">{gender}, {age} years</p>
                
                {!abhaNumber ? (
                  <div className="abha-status">
                    <span className="warning-icon">⚠</span>
                    <span className="warning-text">{currentContent.abhaNumberNotAvailable}</span>
                  </div>
                ) : (
                  <div className="abha-number">
                    <span className="abha-label">ABHA Number:</span>
                    <span className="abha-value">{abhaNumber}</span>
                  </div>
                )}
                
                <div className="abha-address">
                  <span className="address-label">Address:</span>
                  <span className="address-value">{abhaAddress}</span>
                </div>
              </div>

              <div className="qr-section">
                <div className="qr-code">
                  <img 
                    src={qrCodeUrl} 
                    alt="ABHA QR Code" 
                    className="qr-image"
                  />
                </div>
                <button className="download-card-btn" onClick={handleViewCard}>
                  <Download className="download-icon" />
                  <span>{currentContent.downloadCard}</span>
                </button>
              </div>
            </div>

            {/* Finish KYC Button */}
            <button className="finish-kyc-btn" onClick={handleFinishKYC}>
              <Wallet className="wallet-icon" />
              <span>Finish KYC to get ABHA Number</span>
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="appointment-token-btn" onClick={handleGetAppointmentToken}>
          <QrCode className="btn-icon" />
          <span>{currentContent.getAppointmentToken}</span>
        </button>
        
        <button className="google-wallet-btn" onClick={handleAddToGoogleWallet}>
          <Wallet className="btn-icon" />
          <span>{currentContent.addToGoogleWallet}</span>
        </button>
      </div>

      {/* Advertisement Section */}
      <div className="advertisement-section">
        <div className="ad-label">{currentContent.advertisement}</div>
        <div className="ad-card">
          <div className="ad-content">
            
            <div className="ad-text">
              <h3>{currentContent.freshVeggies}</h3>
              <p>{currentContent.freshFruits}</p>
            </div>
            <div className="ad-logo">
              <span className="zepto-logo">Zepto</span>
              <span className="delivery-text">{currentContent.minuteDelivery}</span>
            </div>
          </div>
          <button className="scan-qr-btn" onClick={handleScanQRCode}>
            <QrCode className="qr-icon" />
            <span>{currentContent.scanQRCode}</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentPage="abha" 
        onNavigate={onNavigate} 
        languageContent={{
          home: currentContent.home,
          records: currentContent.records,
          abha: currentContent.abha,
          profile: currentContent.profile
        }}
      />

      {/* System Navigation Bar */}
      <div className="system-nav">
        <div className="system-nav-item">←</div>
        <div className="system-nav-item">○</div>
        <div className="system-nav-item">□</div>
      </div>
    </div>
  );
};

export default ABHACard;
