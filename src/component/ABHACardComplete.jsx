import React, { useState } from 'react';
import { ChevronDown, Settings, QrCode, ChevronRight, Wallet, Download, ArrowRight, X } from 'lucide-react';
import './ABHACardComplete.css';
import BottomNavigation from './BottomNavigation';    

const ABHACardComplete = ({ onNavigate, userData }) => {
  const {
    firstName = 'HARI SARAN',
    lastName = 'MISHRA',
    gender = 'Male',
    age = 23,
    abhaAddress= 'mishrahs260526@abdm',
    abhaNumber = '70746324465247', // Default ABHA number after KYC completion
    qrCodeUrl = '/qrcode.jpg' // Default QR code, can be overridden with Aadhar QR code
  } = userData || {};

  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  // Language content mapping
  const languageContent = {
    english: {
      chooseLanguage: 'Choose Language',
      abhaNumberNotAvailable: 'ABHA number not available',
      abhaNumberAvailable: 'ABHA Number',
      downloadCard: 'Download Card',
      addToGoogleWallet: 'Add to Google Wallet',
      inviteFriends: 'Invite friends to create ABHA',
      youBoth: 'YOU BOTH'
    },
    hindi: {
      chooseLanguage: 'भाषा चुनें',
      abhaNumberNotAvailable: 'ABHA नंबर उपलब्ध नहीं',
      abhaNumberAvailable: 'ABHA नंबर',
      downloadCard: 'कार्ड डाउनलोड करें',
      addToGoogleWallet: 'Google Wallet में जोड़ें',
      inviteFriends: 'ABHA बनाने के लिए दोस्तों को आमंत्रित करें',
      youBoth: 'आप दोनों'
    },
    kannada: {
      chooseLanguage: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      abhaNumberNotAvailable: 'ABHA ಸಂಖ್ಯೆ ಲಭ್ಯವಿಲ್ಲ',
      abhaNumberAvailable: 'ABHA ಸಂಖ್ಯೆ',
      downloadCard: 'ಕಾರ್ಡ್ ಡೌನ್ಲೋಡ್ ಮಾಡಿ',
      addToGoogleWallet: 'Google Wallet ಗೆ ಸೇರಿಸಿ',
      inviteFriends: 'ABHA ರಚಿಸಲು ಸ್ನೇಹಿತರನ್ನು ಆಹ್ವಾನಿಸಿ',
      youBoth: 'ನೀವು ಇಬ್ಬರೂ'
    }
  };

  const currentContent = languageContent[selectedLanguage];

  const handleDownloadCard = () => {
    console.log('Download Card clicked');
  };

  const handleAddToGoogleWallet = () => {
    console.log('Add to Google Wallet clicked');
  };

  const handleInviteFriends = () => {
    console.log('Invite friends clicked');
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setShowLanguageOptions(false);
  };

  const closeLanguageOptions = () => {
    setShowLanguageOptions(false);
  };

  const handleGoBack = () => {
    if (onNavigate) {
      onNavigate('back');
    }
  };

  return (
    <div className="abha-card-complete-page">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="time">6:17</span>
          <span className="wifi-icon">📶</span>
        </div>
        <div className="status-right">
          <span className="bluetooth">📶</span>
          <span className="bell">🔔</span>
          <span className="signal">📶</span>
          <span className="volte">Vo WiFi</span>
          <span className="battery">51</span>
        </div>
        <button className="close-button" onClick={handleGoBack}>
          <X className="close-icon" />
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
                
                <div className="abha-number">
                  <span className="abha-label">{currentContent.abhaNumberAvailable}:</span>
                  <span className="abha-value">{abhaNumber || '70746324465247'}</span>
                </div>
                
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
                <button className="download-card-btn" onClick={handleDownloadCard}>
                  <Download className="download-icon" />
                  <span>{currentContent.downloadCard}</span>
                </button>
              </div>
            </div>

            {/* KYC Completed Button or Add to Google Wallet Button */}
            <button 
              className={userData?.kycCompleted ? "kyc-completed-btn" : "google-wallet-btn"} 
              onClick={handleAddToGoogleWallet}
            >
              <Wallet className="wallet-icon" />
              <span>{userData?.kycCompleted ? "KYC Completed" : currentContent.addToGoogleWallet}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Invite Friends Section */}
      <div className="invite-friends-section">
        <div className="invite-content">
          <div className="invite-icon">
            <div className="people-icon">
              <div className="person person-1"></div>
              <div className="person person-2"></div>
              <div className="person person-3"></div>
            </div>
          </div>
          <div className="invite-text">
            <span className="invite-label">{currentContent.inviteFriends}</span>
          </div>
          <div className="invite-action">
            <span className="you-both">{currentContent.youBoth}</span>
            <button className="invite-arrow-btn">
              <ArrowRight className="arrow-icon" />
            </button>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default ABHACardComplete;
