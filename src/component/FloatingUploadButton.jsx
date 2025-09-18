import React from 'react';
import { Upload, Plus } from 'lucide-react';
import './ABHACard.css';

const FloatingUploadButton = ({ onClick, isVisible = true }) => {
  if (!isVisible) return null;

  return (
    <div className="floating-upload-container">
      <button 
        className="floating-upload-btn"
        onClick={onClick}
        title="Upload Health Records"
      >
        <div className="floating-btn-content">
          <Upload className="floating-btn-icon" />
          <span className="floating-btn-text">Upload</span>
        </div>
        <div className="floating-btn-pulse"></div>
      </button>
    </div>
  );
};

export default FloatingUploadButton;
