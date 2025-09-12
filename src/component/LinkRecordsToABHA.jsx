import React from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import './ABHACard.css';

const LinkRecordsToABHA = ({ onBack, userData, programData }) => {
  const {
    firstName = 'hs',
    lastName = 'mishra',
    abhaAddress = 'mishrahs260526@abdm'
  } = userData || {};

  const {
    programName = 'AB - PMJAY',
    hipId = 'PMJAY'
  } = programData || {};

  const handleClose = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="link-records-page">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="time">3:16</span>
          <span className="checkmark">✓</span>
        </div>
        <div className="status-right">
          <span className="volte">Vo</span>
          <span className="wifi">WiFi</span>
          <span className="signal">●●●●●</span>
          <span className="battery">28</span>
        </div>
      </div>

      {/* Header */}
      <div className="link-records-header">
        <button className="back-btn" onClick={handleClose}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">Link Records to ABHA Address</h1>
        <div className="header-spacer"></div>
      </div>

      {/* Content */}
      <div className="link-records-content">
        {/* Selected Healthcare Provider Section */}
        <div className="provider-section">
          <label className="section-label">SELECTED HEALTHCARE PROVIDER</label>
          <div className="provider-card">
            <div className="provider-name">{programName}</div>
            <div className="provider-hip-id">HIP ID: {hipId}</div>
          </div>
        </div>

        {/* Found For Section */}
        <div className="found-for-section">
          <label className="section-label">FOUND FOR</label>
          <div className="found-for-card">
            <div className="user-name">{firstName} {lastName}</div>
            <div className="user-abha-address">{abhaAddress}</div>
          </div>
        </div>

        {/* Available Records Section */}
        <div className="available-records-section">
          <label className="section-label">AVAILABLE RECORDS</label>
          <div className="records-container">
            <div className="no-records-icon">
              <div className="icon-circle">
                <AlertTriangle size={24} className="warning-icon" />
              </div>
            </div>
            <div className="no-records-text">No records found</div>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <div className="close-button-section">
        <button className="close-btn" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default LinkRecordsToABHA;
