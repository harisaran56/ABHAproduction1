import React from 'react';
import { Home, FolderOpen, QrCode, User } from 'lucide-react';
import './ABHACard.css';

const BottomNavigation = ({ currentPage = 'home', onNavigate, languageContent = {} }) => {
  const defaultContent = {
    home: 'Home',
    records: 'Records',
    abha: 'ABHA',
    profile: 'Profile'
  };

  const content = { ...defaultContent, ...languageContent };

  const handleNavigation = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="abha-bottom-nav">
      <div 
        className={`abha-nav-item ${currentPage === 'home' ? 'active' : ''}`} 
        onClick={() => handleNavigation('home')}
      >
        <Home className="abha-nav-icon" />
        <span className="abha-nav-label">{content.home}</span>
      </div>
      <div 
        className={`abha-nav-item ${currentPage === 'records' ? 'active' : ''}`} 
        onClick={() => handleNavigation('records')}
      >
        <FolderOpen className="abha-nav-icon" />
        <span className="abha-nav-label">{content.records}</span>
      </div>
      <div 
        className={`abha-nav-item ${currentPage === 'abha' ? 'active' : ''}`} 
        onClick={() => handleNavigation('abha')}
      >
        <QrCode className="abha-nav-icon" />
        <span className="abha-nav-label">{content.abha}</span>
      </div>
      <div 
        className={`abha-nav-item ${currentPage === 'profile' ? 'active' : ''}`} 
        onClick={() => handleNavigation('profile')}
      >
        <User className="abha-nav-icon" />
        <div className="abha-notification-dot"></div>
        <span className="abha-nav-label">{content.profile}</span>
      </div>
    </div>
  );
};

export default BottomNavigation;
