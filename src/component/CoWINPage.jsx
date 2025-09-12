import React, { useState } from 'react';
import { ArrowLeft, Home, MoreHorizontal, Bluetooth, Wifi, Battery } from 'lucide-react';
import LinkRecordsToABHA from './LinkRecordsToABHA';
import LoadingAnimation from './LoadingAnimation';
import './ABHACard.css';

const CoWINPage = ({ onBack, userData }) => {
  const {
    firstName = 'hs',
    lastName = 'mishra',
    gender = 'Male',
    yearOfBirth = '2002',
    abhaAddress = 'mishrahs260526@abdm'
  } = userData || {};

  const [patientId, setPatientId] = useState('');
  const [showLinkRecords, setShowLinkRecords] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDiscoverRecords = () => {
    console.log('Discovering CoWIN records for patient ID:', patientId);
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      setShowLinkRecords(true);
    }, 2000); // 2 second loading animation
  };

  const handleBackFromLinkRecords = () => {
    setShowLinkRecords(false);
  };

  // Show loading animation
  if (isLoading) {
    return <LoadingAnimation message="Discovering CoWIN Records..." />;
  }

  // Show LinkRecordsToABHA page if Discover Records button was clicked
  if (showLinkRecords) {
    return (
      <LinkRecordsToABHA 
        onBack={handleBackFromLinkRecords}
        userData={userData}
        programData={{
          programName: 'CoWIN',
          hipId: 'CoWIN'
        }}
      />
    );
  }

  return (
    <div className="discover-records-page">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="time">1:56</span>
          <span className="checkmark">✓</span>
        </div>
        <div className="status-right">
          <Bluetooth size={12} />
          <span className="signal">●●●●●</span>
          <span className="volte">Vo WiFi</span>
          <Wifi size={12} />
          <span className="battery">40</span>
        </div>
      </div>

      {/* Header */}
      <div className="discover-header">
        <div className="header-left">
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={20} />
          </button>
          <button className="home-btn">
            <Home size={16} />
          </button>
          <button className="menu-btn">
            <MoreHorizontal size={16} />
          </button>
        </div>
        <h1 className="page-title">Discover Records</h1>
        <div className="header-right"></div>
      </div>

      {/* Content */}
      <div className="discover-content">
        {/* Patient ID Section */}
        <div className="patient-id-section">
          <label className="section-label">Enter Patient ID (Optional)</label>
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="patient-id-input"
            placeholder=""
          />
        </div>

        {/* Selected Healthcare Program Section */}
        <div className="healthcare-program-section">
          <label className="section-label">SELECTED HEALTHCARE PROGRAM</label>
          <div className="program-card">
            <div className="program-name">CoWIN</div>
            <div className="program-hip-id">HIP ID: CoWIN</div>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="profile-info-section">
          <label className="section-label">PROFILE INFO</label>
          <div className="profile-card">
            <div className="profile-row">
              <span className="profile-label">Name:</span>
              <span className="profile-value">{firstName} {lastName}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">ABHA Address:</span>
              <span className="profile-value">{abhaAddress}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Gender:</span>
              <span className="profile-value">{gender}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Year of Birth:</span>
              <span className="profile-value">{yearOfBirth}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Discover Records Button */}
      <div className="discover-button-section">
        <button className="discover-records-btn" onClick={handleDiscoverRecords}>
          Discover Records
        </button>
        <div className="home-indicator"></div>
      </div>
    </div>
  );
};

export default CoWINPage;
