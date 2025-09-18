import React, { useState } from 'react';
import { ChevronDown, Shield, Upload, Mail, Plus, Info } from 'lucide-react';
import BottomNavigation from './BottomNavigation';
import HealthRecordUpload from './HealthRecordUpload';
import UploadedRecordsSection from './UploadedRecordsSection';
import FloatingUploadButton from './FloatingUploadButton';
import ViewAllButton from './ViewAllButton';
import './ABHACard.css';

const RecordsPage = ({ onNavigate, userData }) => {
  const {
    firstName = 'Hari Saran',
    lastName = 'Mishra',
    gender = 'Male',
    age = 32,
    abhaAddress = 'mishrahs260526@abdm',
    abhaNumber = null,
    qrCodeUrl = '/qrcode.jpg'
  } = userData || {};

  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedRecords, setUploadedRecords] = useState([]);
  const [dateFilter, setDateFilter] = useState(null);

  // Language content mapping
  const languageContent = {
    english: {
      home: 'Home',
      records: 'Records',
      abha: 'ABHA',
      profile: 'Profile',
      healthInsuranceCoverage: 'Obtain insights into your Health Insurance coverage',
      healthInsurance: 'Health Insurance',
      expenseRisk: 'EXPENSE RISK',
      coverage: 'Coverage',
      benefits: 'Benefits',
      premium: 'Premium',
      healthRecordsDescription: 'Easily store and manage all your medical files in one place, from lab reports and prescriptions to x-rays, invoices, and more.',
      importFromGmail: 'Import Health Records from Gmail',
      uploadHealthRecord: 'Upload health record',
      privacyStatement: 'YOUR HEALTH DATA IS 100% PRIVATE & SECURE',
      advertisement: 'Advertisement',
      callForAppointment: 'Call for appointment',
      appointmentDescription: '10000+ satisfactory patients, diabetes care, Diabetes Specialist...',
      upload: 'Upload'
    },
    hindi: {
      home: 'होम',
      records: 'रिकॉर्ड्स',
      abha: 'ABHA',
      profile: 'प्रोफाइल',
      healthInsuranceCoverage: 'अपने स्वास्थ्य बीमा कवरेज के बारे में जानकारी प्राप्त करें',
      healthInsurance: 'स्वास्थ्य बीमा',
      expenseRisk: 'खर्च जोखिम',
      coverage: 'कवरेज',
      benefits: 'लाभ',
      premium: 'प्रीमियम',
      healthRecordsDescription: 'लैब रिपोर्ट और प्रिस्क्रिप्शन से लेकर एक्स-रे, चालान और अधिक तक, अपनी सभी चिकित्सा फाइलों को एक स्थान पर आसानी से स्टोर और प्रबंधित करें।',
      importFromGmail: 'Gmail से स्वास्थ्य रिकॉर्ड आयात करें',
      uploadHealthRecord: 'स्वास्थ्य रिकॉर्ड अपलोड करें',
      privacyStatement: 'आपका स्वास्थ्य डेटा 100% निजी और सुरक्षित है',
      advertisement: 'विज्ञापन',
      callForAppointment: 'अपॉइंटमेंट के लिए कॉल करें',
      appointmentDescription: '10000+ संतुष्ट रोगी, मधुमेह देखभाल, मधुमेह विशेषज्ञ...',
      upload: 'अपलोड करें'
    },
    kannada: {
      home: 'ಮನೆ',
      records: 'ರೆಕಾರ್ಡ್ಗಳು',
      abha: 'ABHA',
      profile: 'ಪ್ರೊಫೈಲ್',
      healthInsuranceCoverage: 'ನಿಮ್ಮ ಆರೋಗ್ಯ ವಿಮಾ ಕವರೇಜ್ ಬಗ್ಗೆ ಒಳನೋಟಗಳನ್ನು ಪಡೆಯಿರಿ',
      healthInsurance: 'ಆರೋಗ್ಯ ವಿಮಾ',
      expenseRisk: 'ಖರ್ಚು ಅಪಾಯ',
      coverage: 'ಕವರೇಜ್',
      benefits: 'ಲಾಭಗಳು',
      premium: 'ಪ್ರೀಮಿಯಂ',
      healthRecordsDescription: 'ಲ್ಯಾಬ್ ವರದಿಗಳು ಮತ್ತು ಪರ್ಚೆಗಳಿಂದ ಹಿಡಿದು ಎಕ್ಸ್-ರೇಗಳು, ಇನ್ವಾಯ್ಸ್ಗಳು ಮತ್ತು ಹೆಚ್ಚಿನವುಗಳನ್ನು ಒಂದು ಸ್ಥಳದಲ್ಲಿ ಸುಲಭವಾಗಿ ಸಂಗ್ರಹಿಸಿ ಮತ್ತು ನಿರ್ವಹಿಸಿ.',
      importFromGmail: 'Gmail ನಿಂದ ಆರೋಗ್ಯ ದಾಖಲೆಗಳನ್ನು ಆಮದು ಮಾಡಿ',
      uploadHealthRecord: 'ಆರೋಗ್ಯ ದಾಖಲೆಯನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ',
      privacyStatement: 'ನಿಮ್ಮ ಆರೋಗ್ಯ ಡೇಟಾ 100% ಖಾಸಗಿ ಮತ್ತು ಸುರಕ್ಷಿತ',
      advertisement: 'ಜಾಹೀರಾತು',
      callForAppointment: 'ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಕೋಸ್ಕರ ಕರೆ ಮಾಡಿ',
      appointmentDescription: '10000+ ತೃಪ್ತ ರೋಗಿಗಳು, ಸಕ್ಕರೆ ರೋಗದ ಚಿಕಿತ್ಸೆ, ಸಕ್ಕರೆ ರೋಗ ತಜ್ಞ...',
      upload: 'ಅಪ್ಲೋಡ್ ಮಾಡಿ'
    }
  };

  const currentContent = languageContent[selectedLanguage];

  const handleLanguageChange = (language) => {
    if (languageContent[language]) {
      setSelectedLanguage(language);
    }
  };

  const handleGmailImport = () => {
    // Handle Gmail import functionality
    console.log('Importing from Gmail...');
  };

  const handleUploadRecord = () => {
    setShowUploadModal(true);
  };

  const handleUploadSuccess = (uploadedFiles) => {
    setUploadedRecords(prev => [...prev, ...uploadedFiles]);
    setShowUploadModal(false);
    // Show success message or notification
    console.log('Files uploaded successfully:', uploadedFiles);
  };

  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
  };

  const handleDeleteRecord = (recordId) => {
    setUploadedRecords(prev => prev.filter(record => record.id !== recordId));
  };

  const handleEditRecord = (record) => {
    // Handle edit functionality - could open edit modal
    console.log('Edit record:', record);
  };

  const handleUploadAppointment = () => {
    // Handle appointment upload functionality
    console.log('Uploading appointment...');
  };

  const handleDateRangeSelect = (dateRange) => {
    setDateFilter(dateRange);
    console.log('Date filter applied:', dateRange);
  };

  return (
    <div className="abha-card-page">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="time">11:42</span>
          <span className="checkmark">✓</span>
        </div>
        <div className="status-right">
          <span className="volte">VoLTE</span>
          <span className="network">4G+</span>
          <span className="battery">82</span>
        </div>
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
          <div className="notification-dot"></div>
        </div>
      </div>

      {/* View All Button Section */}
      {/* <ViewAllButton 
        onDateRangeSelect={handleDateRangeSelect}
        uploadedRecords={uploadedRecords}
      /> */}

      {/* Health Records Management Section */}
      {/* <div className="health-records-section">
        <div className="records-buttons">
          <button className="upload-record-btn" onClick={handleUploadRecord}>
            <Upload className="upload-icon" />
            <span>{currentContent.uploadHealthRecord}</span>
          </button>
        </div>
        
        <p className="privacy-statement">{currentContent.privacyStatement}</p>
      </div> */}

      {/* Advertisement Section */}
      {/* <div className="advertisement-section">
        <div className="ad-label">
          <span>{currentContent.advertisement}</span>
          <Info className="info-icon" />
        </div>
        
        <div className="appointment-card">
          <div className="appointment-content">
            <h3 className="appointment-title">{currentContent.callForAppointment}</h3>
            <p className="appointment-description">{currentContent.appointmentDescription}</p>
          </div>
          <button className="appointment-upload-btn" onClick={handleUploadAppointment}>
            <Plus className="plus-icon" />
            <span>{currentContent.upload}</span>
          </button>
        </div>
      </div> */}

      {/* <div>
        <h1>Uploaded Records</h1>
      </div> */}
      

      {/* Uploaded Records Section */}
      <UploadedRecordsSection 
        uploadedRecords={uploadedRecords}
        onDeleteRecord={handleDeleteRecord}
        onEditRecord={handleEditRecord}
        dateFilter={dateFilter}
      />

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentPage="records" 
        onNavigate={onNavigate} 
        languageContent={{
          home: currentContent.home,
          records: currentContent.records,
          abha: currentContent.abha,
          profile: currentContent.profile
        }}
      />

      {/* Upload Modal */}
      {showUploadModal && (
        <HealthRecordUpload 
          onClose={handleCloseUploadModal}
          onUploadSuccess={handleUploadSuccess}
        />
      )}

      {/* Floating Upload Button */}
      <FloatingUploadButton 
        onClick={handleUploadRecord}
        isVisible={!showUploadModal}
      />
    </div>
  );
};

export default RecordsPage;
