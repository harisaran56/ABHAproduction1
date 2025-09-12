import React, { useState } from 'react';
import { ChevronDown, Settings, QrCode, ChevronRight, Wallet, Download, ArrowRight, X, Trash2, Plus } from 'lucide-react';
import './ABHACardStorage.css';

const ABHACardStorage = ({ onNavigate, userData }) => {
  const {
    firstName = 'HARI SARAN',
    lastName = 'mishra',
    gender = 'Male',
    age = 23,
    abhaAddress = 'mishrahs260526@abdm',
    abhaNumber = '70746324465247', // Default ABHA number after KYC completion
    qrCodeUrl = '/qrcode.jpg' // Default QR code, can be overridden with Aadhar QR code
  } = userData || {};

  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Language content mapping
  const languageContent = {
    english: {
      chooseLanguage: 'Choose Language',
      abhaNumberNotAvailable: 'ABHA number not available',
      downloadCard: 'Download Card',
      addToGoogleWallet: 'Add to Google Wallet',
      inviteFriends: 'Invite friends to create ABHA',
      youBoth: 'YOU BOTH',
      home: 'Home',
      records: 'Records',
      abha: 'ABHA',
      profile: 'Profile',
      deleteCard: 'Delete Card',
      createNew: 'Create New',
      confirmDelete: 'Are you sure you want to delete this ABHA card?',
      deleteConfirm: 'Delete',
      cancel: 'Cancel'
    },
    hindi: {
      chooseLanguage: 'भाषा चुनें',
      abhaNumberNotAvailable: 'ABHA नंबर उपलब्ध नहीं',
      downloadCard: 'कार्ड डाउनलोड करें',
      addToGoogleWallet: 'Google Wallet में जोड़ें',
      inviteFriends: 'ABHA बनाने के लिए दोस्तों को आमंत्रित करें',
      youBoth: 'आप दोनों',
      home: 'होम',
      records: 'रिकॉर्ड्स',
      abha: 'ABHA',
      profile: 'प्रोफाइल',
      deleteCard: 'कार्ड हटाएं',
      createNew: 'नया बनाएं',
      confirmDelete: 'क्या आप वाकई इस ABHA कार्ड को हटाना चाहते हैं?',
      deleteConfirm: 'हटाएं',
      cancel: 'रद्द करें'
    },
    kannada: {
      chooseLanguage: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      abhaNumberNotAvailable: 'ABHA ಸಂಖ್ಯೆ ಲಭ್ಯವಿಲ್ಲ',
      downloadCard: 'ಕಾರ್ಡ್ ಡೌನ್ಲೋಡ್ ಮಾಡಿ',
      addToGoogleWallet: 'Google Wallet ಗೆ ಸೇರಿಸಿ',
      inviteFriends: 'ABHA ರಚಿಸಲು ಸ್ನೇಹಿತರನ್ನು ಆಹ್ವಾನಿಸಿ',
      youBoth: 'ನೀವು ಇಬ್ಬರೂ',
      home: 'ಮನೆ',
      records: 'ರೆಕಾರ್ಡ್ಗಳು',
      abha: 'ABHA',
      profile: 'ಪ್ರೊಫೈಲ್',
      deleteCard: 'ಕಾರ್ಡ್ ಅಳಿಸಿ',
      createNew: 'ಹೊಸದು ರಚಿಸಿ',
      confirmDelete: 'ಈ ABHA ಕಾರ್ಡ್ ಅನ್ನು ಅಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿ ಬಯಸುತ್ತೀರಾ?',
      deleteConfirm: 'ಅಳಿಸಿ',
      cancel: 'ರದ್ದುಗೊಳಿಸಿ'
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

  const handleGoHome = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const handleGoRecords = () => {
    console.log('Records clicked');
  };

  const handleGoProfile = () => {
    console.log('Profile clicked');
  };

  const handleDeleteCard = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    // Import delete function dynamically to avoid circular dependency
    import('../utils/abhaStorage').then(({ deleteABHACard }) => {
      const success = deleteABHACard(abhaAddress);
      if (success) {
        // Navigate back to ABHA creation page
        if (onNavigate) {
          onNavigate('abha');
        }
      }
    });
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleCreateNew = () => {
    // Navigate to ABHA creation page
    if (onNavigate) {
      onNavigate('abha');
    }
  };

  return (
    <div className="abha-card-storage-page">
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
        <div className="nav-tab active">{currentContent.abha}</div>
        <div className="nav-tab">Consents</div>
        <div className="nav-tab">Providers</div>
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
                  <span className="abha-label">ABHA Number:</span>
                  <span className="abha-value">{abhaNumber}</span>
                </div>
                
                <div className="abha-address">
                  <span className="address-label">ABHA Address:</span>
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

            {/* KYC Completed Button */}
            <button className="kyc-completed-btn" onClick={handleAddToGoogleWallet}>
              <Wallet className="wallet-icon" />
              <span>KYC Completed</span>
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

      {/* Action Buttons Section */}
      <div className="action-buttons-section">
        <button className="action-btn create-new-btn" onClick={handleCreateNew}>
          <Plus className="action-icon" />
          <span>{currentContent.createNew}</span>
        </button>
        <button className="action-btn delete-btn" onClick={handleDeleteCard}>
          <Trash2 className="action-icon" />
          <span>{currentContent.deleteCard}</span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-item" onClick={handleGoHome}>
          <div className="nav-icon home-icon">🏠</div>
          <span className="nav-label">{currentContent.home}</span>
        </div>
        <div className="nav-item" onClick={handleGoRecords}>
          <div className="nav-icon records-icon">📁</div>
          <span className="nav-label">{currentContent.records}</span>
        </div>
        <div className="nav-item active">
          <QrCode className="nav-icon" />
          <span className="nav-label">{currentContent.abha}</span>
        </div>
        <div className="nav-item" onClick={handleGoProfile}>
          <div className="nav-icon profile-icon">👤</div>
          <div className="notification-dot"></div>
          <span className="nav-label">{currentContent.profile}</span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <div className="delete-modal-header">
              <Trash2 className="delete-icon" />
              <h3>{currentContent.deleteCard}</h3>
            </div>
            <div className="delete-modal-body">
              <p>{currentContent.confirmDelete}</p>
            </div>
            <div className="delete-modal-actions">
              <button className="modal-btn cancel-btn" onClick={handleCancelDelete}>
                {currentContent.cancel}
              </button>
              <button className="modal-btn confirm-btn" onClick={handleConfirmDelete}>
                {currentContent.deleteConfirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ABHACardStorage;
