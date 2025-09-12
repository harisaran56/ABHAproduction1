import React, { useState } from 'react';
import { ChevronDown, Settings, Search, ChevronRight, Plus, X } from 'lucide-react';
import BottomNavigation from './BottomNavigation';
import DiscoverRecords from './DiscoverRecords';
import CoWINPage from './CoWINPage';
import ESanjeevaniOPDPage from './eSanjeevaniOPDPage';
import ESanjeevaniHWCPage from './eSanjeevaniHWCPage';
import RCHMoHFWPage from './RCHMoHFWPage';
import './ABHACard.css';

const ProvidersPage = ({ onNavigate, userData, onInternalNavigate }) => {
  const {
    firstName = 'Hari Saran',
    lastName = 'Mishra',
    gender = 'Male',
    age = 23,
    abhaAddress = 'mishrahs260526@abdm',
    abhaNumber = null,
    qrCodeUrl = '/qrcode.jpg'
  } = userData || {};

  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [activeTab, setActiveTab] = useState('providers');
  const [currentProgram, setCurrentProgram] = useState(null);

  // Language content mapping
  const languageContent = {
    english: {
      chooseLanguage: 'Choose Language',
      home: 'Home',
      records: 'Records',
      abha: 'ABHA',
      profile: 'Profile',
      consents: 'Consents',
      providers: 'Providers',
      searchPlaceholder: 'Search your Hospital, Clinic or Lab name',
      governmentPrograms: 'Government Programs',
      addProvider: 'Add Provider'
    },
    hindi: {
      chooseLanguage: 'भाषा चुनें',
      home: 'होम',
      records: 'रिकॉर्ड्स',
      abha: 'ABHA',
      profile: 'प्रोफाइल',
      consents: 'सहमति',
      providers: 'प्रदाता',
      searchPlaceholder: 'अपने अस्पताल, क्लिनिक या लैब का नाम खोजें',
      governmentPrograms: 'सरकारी कार्यक्रम',
      addProvider: 'प्रदाता जोड़ें'
    },
    kannada: {
      chooseLanguage: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      home: 'ಮನೆ',
      records: 'ರೆಕಾರ್ಡ್ಗಳು',
      abha: 'ABHA',
      profile: 'ಪ್ರೊಫೈಲ್',
      consents: 'ಸಮ್ಮತಿ',
      providers: 'ಪ್ರದಾತರು',
      searchPlaceholder: 'ನಿಮ್ಮ ಆಸ್ಪತ್ರೆ, ಕ್ಲಿನಿಕ್ ಅಥವಾ ಲ್ಯಾಬ್ ಹೆಸರನ್ನು ಹುಡುಕಿ',
      governmentPrograms: 'ಸರ್ಕಾರಿ ಕಾರ್ಯಕ್ರಮಗಳು',
      addProvider: 'ಪ್ರದಾತರನ್ನು ಸೇರಿಸಿ'
    }
  };

  const currentContent = languageContent[selectedLanguage];

  const handleLanguageChange = (language) => {
    if (languageContent[language]) {
      setSelectedLanguage(language);
    } else {
      console.error('Invalid language selected:', language);
    }
  };

  const handleLanguageClose = () => {
    // You can add logic here to close the language selection panel if needed
  };

  const handleProgramClick = (program) => {
    setCurrentProgram(program.name);
  };

  const handleBackFromProgram = () => {
    setCurrentProgram(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'abha') {
      // Navigate back to ABHA card view using internal navigation
      if (onInternalNavigate) {
        onInternalNavigate('abha');
      }
    } else if (tab === 'consents') {
      // Navigate to consents view using internal navigation
      if (onInternalNavigate) {
        onInternalNavigate('consents');
      }
    }
  };

  const governmentPrograms = [
    {
      id: 1,
      name: 'AB - PMJAY',
      descriptions: {
        english: 'Pradhan Mantri Jan Arogya Yojana PM-JAY',
        hindi: 'प्रधानमंत्री जन आरोग्य योजना PM-JAY',
        kannada: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಜನ ಆರೋಗ್ಯ ಯೋಜನೆ PM-JAY'
      },
      icon: '/HospitalLogo.jpg',
      color: '#10b981'
    },
    {
      id: 2,
      name: 'CoWIN',
      descriptions: {
        english: 'C-WIN Winning Over Covid-19',
        hindi: 'को-विन कोविड-19 पर जीत',
        kannada: 'ಕೋ-ವಿನ್ ಕೋವಿಡ್-19 ಮೇಲೆ ಗೆಲುವು'
      },
      icon: '/cowin.jpeg',
      color: '#3b82f6'
    },
    {
      id: 3,
      name: 'eSanjeevaniOPD',
      descriptions: {
        english: 'eSanjeevani OPD',
        hindi: 'ई-संजीवनी ओपीडी',
        kannada: 'ಇ-ಸಂಜೀವನಿ ಒಪಿಡಿ'
      },
      icon: '/OPD.png',
      color: '#f59e0b'
    },
    {
      id: 4,
      name: 'eSanjeevani-HWC',
      descriptions: {
        english: 'eSanjeevani HWC',
        hindi: 'ई-संजीवनी एचडब्ल्यूसी',
        kannada: 'ಇ-ಸಂಜೀವನಿ ಎಚ್ಡಬ್ಲ್ಯೂಸಿ'
      },
      icon: '/OPD.png',
      color: '#f59e0b'
    },
    {
      id: 5,
      name: 'RCH MoHFW',
      descriptions: {
        english: 'RCH MoHFW',
        hindi: 'आरसीएच मोएचएफडब्ल्यू',
        kannada: 'ಆರ್ಸಿಎಚ್ ಮೋಎಚ್ಎಫ್ಡಬ್ಲ್ಯೂ'
      },
      icon: '/HospitalLogo.jpg',
      color: '#f59e0b'
    }
  ];

  // Show program-specific pages based on currentProgram
  if (currentProgram) {
    switch (currentProgram) {
      case 'AB - PMJAY':
        return (
          <DiscoverRecords 
            onBack={handleBackFromProgram}
            userData={userData}
          />
        );
      case 'CoWIN':
        return (
          <CoWINPage 
            onBack={handleBackFromProgram}
            userData={userData}
          />
        );
      case 'eSanjeevaniOPD':
        return (
          <ESanjeevaniOPDPage 
            onBack={handleBackFromProgram}
            userData={userData}
          />
        );
      case 'eSanjeevani-HWC':
        return (
          <ESanjeevaniHWCPage 
            onBack={handleBackFromProgram}
            userData={userData}
          />
        );
      case 'RCH MoHFW':
        return (
          <RCHMoHFWPage 
            onBack={handleBackFromProgram}
            userData={userData}
          />
        );
      default:
        break;
    }
  }

  return (
    <div className="abha-card-page">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="time">11:52</span>
          <span className="checkmark">✓</span>
        </div>
        <div className="status-right">
          <span className="volte">Vo WiFi</span>
          <span className="battery">46</span>
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
          <button className="language-close" onClick={handleLanguageClose}>
            <X size={16} />
          </button>
        </div>
        <Settings className="settings-icon" />
      </div>

      {/* User Profile */}
      <div className="user-profile-section">
        <div className="user-avatar">
          <div className="avatar-circle">
            <span className="avatar-text">hs</span>
          </div>
        </div>
        <div className="user-info">
          <span className="user-name">hs</span>
          <ChevronDown className="dropdown-icon" />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <div 
          className={`nav-tab ${activeTab === 'abha' ? 'active' : ''}`}
          onClick={() => handleTabChange('abha')}
        >
          {currentContent.abha}
        </div>
        <div 
          className={`nav-tab ${activeTab === 'consents' ? 'active' : ''}`}
          onClick={() => handleTabChange('consents')}
        >
          {currentContent.consents}
        </div>
        <div 
          className={`nav-tab ${activeTab === 'providers' ? 'active' : ''}`}
          onClick={() => handleTabChange('providers')}
        >
          {currentContent.providers}
        </div>
      </div>

      {/* Search Bar */}
      <div className="providers-search-section">
        <div className="providers-search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder={currentContent.searchPlaceholder}
            className="search-input"
          />
        </div>
      </div>

      {/* Government Programs Section */}
      <div className="providers-content">
        <h2 className="providers-section-title">{currentContent.governmentPrograms}</h2>
        
        <div className="programs-list">
          {governmentPrograms.map((program) => (
            <div key={program.id} className="program-card" onClick={() => handleProgramClick(program)}>
              <div className="program-info">
                <div className="program-icon" style={{ color: program.color }}>
                  <img 
                    src={program.icon} 
                    alt={program.name}
                    className="program-icon-image"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                    onError={(e) => {
                      console.log('Program icon failed to load:', program.icon);
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="program-icon-fallback" style={{display: 'none', alignItems: 'center', justifyContent: 'center', fontSize: '20px'}}>🏥</div>
                </div>
                <div className="program-details">
                  <h3 className="program-name">{program.name}</h3>
                  <p className="program-description">{program.descriptions[selectedLanguage]}</p>
                </div>
              </div>
              <ChevronRight className="program-chevron" />
            </div>
          ))}
        </div>

        {/* Add Provider Button */}
        <div className="add-provider-section">
          <button className="add-provider-btn">
            <Plus className="add-provider-icon" />
            <span>{currentContent.addProvider}</span>
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
    </div>
  );
};

export default ProvidersPage;
