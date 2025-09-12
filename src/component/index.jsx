import React, { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  Home,
  Calendar,
  User,
  Heart,
  Stethoscope,
  Building2,
  Pill,
  Microscope,
  MapPin,
  Shield,
} from 'lucide-react';
import ABHAPage from './ABHAPage';
import LoginPage from './LoginPage';
import ABHACardStorage from './ABHACardStorage';
import ABHACardComplete from './ABHACardComplete';
import PatientRegistrationPage from './PatientRegistrationPage';
import UjurProfilePage from './UjurProfilePage';
import CreateABHAPage from './CreateABHAPage';
import { hasABHACard, getLatestABHACard } from '../utils/abhaStorage';
import './style.css';
import BottomNavigation from './BottomNavigation';

const HealthcareApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [hasStoredABHA, setHasStoredABHA] = useState(false);
  const [storedABHAData, setStoredABHAData] = useState(null);
  const [completedABHAData, setCompletedABHAData] = useState(null);
  const [loginMethod, setLoginMethod] = useState('mobile');
  const categories = [
    { name: 'For You', icon: Heart, active: true },
    { name: 'Doctors', icon: Stethoscope, active: false },
    { name: 'Hospitals', icon: Building2, active: false },
    { name: 'Pharmacy', icon: Pill, active: false },
    { name: 'Labs', icon: Microscope, active: false },
  ];

  const favoriteDoctors = [
    {
      name: 'Dr. Netrananda Dora',
      hospital: 'GOURISHANKAR NURSING HOME',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=60&h=60&fit=crop&crop=face',
    },
  ];

  const topDoctors = [
    {
      name: 'Dr. Netrananda Dora',
      specialty: 'Endocrinology',
      available: true,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=60&h=60&fit=crop&crop=face',
    },
  ];

  // Check for stored ABHA card on component mount
  useEffect(() => {
    const checkStoredABHA = () => {
      const hasABHA = hasABHACard();
      setHasStoredABHA(hasABHA);
      
      if (hasABHA) {
        const latestCard = getLatestABHACard();
        setStoredABHAData(latestCard);
      }
    };
    
    checkStoredABHA();
  }, []);

  const handleNavigation = (page, data) => {
    setCurrentPage(page);
    
    // Track login method from data
    if (data && data.loginMethod) {
      setLoginMethod(data.loginMethod);
    }
    
    // Handle completed ABHA data
    if (page === 'success' || page === 'complete') {
      // Create completed ABHA data with proper ABHA number
      const completedData = {
        firstName: 'HARI SARAN',
        lastName: 'MISHRA',
        gender: 'Male',
        age: 23,
        abhaAddress: 'mishrahs260526@abdm',
        abhaNumber: '70746324465247', // Proper ABHA number after KYC completion
        qrCodeUrl: '/qrcode.jpg',
        kycCompleted: true // Flag to indicate KYC is completed
      };
      setCompletedABHAData(completedData);
      setCurrentPage('abha-complete');
      return;
    }
    
    // Refresh ABHA card state when navigating to ABHA page
    if (page === 'abha') {
      const checkStoredABHA = () => {
        const hasABHA = hasABHACard();
        setHasStoredABHA(hasABHA);
        
        if (hasABHA) {
          const latestCard = getLatestABHACard();
          setStoredABHAData(latestCard);
        } else {
          setStoredABHAData(null);
        }
      };
      
      checkStoredABHA();
    }
  };

  if (currentPage === 'abha') {
    // If user has a stored ABHA card, show the card storage page
    if (hasStoredABHA && storedABHAData) {
      return <ABHACardStorage onNavigate={handleNavigation} userData={storedABHAData} />;
    }
    // Otherwise, show the ABHA creation page
    return <ABHAPage onNavigate={handleNavigation} />;
  }

  if (currentPage === 'login') {
    return <LoginPage onNavigate={handleNavigation} />;
  }

  if (currentPage === 'patient-registration') {
    return <PatientRegistrationPage onNavigate={handleNavigation} loginMethod={loginMethod} />;
  }

  if (currentPage === 'create-abha') {
    // Create mock patient data for Aadhar users
    const mockPatientData = {
      firstName: 'HARI SARAN',
      lastName: 'MISHRA',
      gender: 'Male',
      age: 23,
      aadhaarNumber: '123456789012', // Mock Aadhaar number
      phoneNumber: '7682097070', // Mock phone number
      email: 'mishrahs260526@gmail.com', // Mock email
      address: '123 Main Street, City, State',
      pincode: '123456'
    };
    
    return <CreateABHAPage onNavigate={handleNavigation} patientData={mockPatientData} />;
  }

  if (currentPage === 'ujur-profile') {
    return <UjurProfilePage onNavigate={handleNavigation} loginMethod={loginMethod} />;
  }

  if (currentPage === 'abha-complete') {
    return <ABHACardComplete onNavigate={handleNavigation} userData={completedABHAData} />;
  }

  return (
    <div className="healthcare-app">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="time">11:42</span>
          <div className="status-icons">
            <span className="status-icon">📱</span>
            <span className="status-icon">⋯</span>
          </div>
        </div>
        <div className="status-right">
          <span className="network">VoLTE</span>
          <span className="network">4G+</span>
          <div className="signal-bars">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <span className="battery">30</span>
          <Bell className="notification-bell" />
        </div>
      </div>

      {/* User Greeting */}
      <div className="user-greeting">
        <div className="user-avatar">
          <User className="avatar-icon" />
        </div>
        <div className="greeting-text">
          <span>Hi Hs</span>
        </div>
        <ChevronDown className="dropdown-icon" />
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search for any Hospital!"
            className="search-input"
          />
        </div>
      </div>

      {/* Category Navigation */}
      <div className="category-nav">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <div
              key={index}
              className={`category-item ${category.active ? 'active' : ''}`}
            >
              <IconComponent className="category-icon" />
              <span className="category-name">{category.name}</span>
            </div>
          );
        })}
      </div>

      {/* Promotional Banner */}
      {/* <div className="promo-section">
        <div className="promo-banner">
          <div className="promo-content">
            <div className="promo-badge">Nearby Dermatologist</div>
            <div className="promo-title">Needs!</div>
            <button className="search-button">SEARCH NOW →</button>
          </div>
          <div className="promo-image">
            <div className="doctor-illustration">
              <div className="doctor-avatar">
                <User className="doctor-icon" />
              </div>
              <div className="stethoscope"></div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Favorite Doctors */}
      {/* <div className="doctors-section">
        <h2 className="section-title">Favorite Doctors</h2>
        <div className="doctors-list">
          {favoriteDoctors.map((doctor, index) => (
            <div key={index} className="doctor-card">
              <div className="doctor-avatar">
                <img src={doctor.image} alt={doctor.name} />
              </div>
              <div className="doctor-info">
                <div className="doctor-name">{doctor.name}</div>
                <div className="doctor-hospital">{doctor.hospital}</div>
              </div>
              <Heart className="favorite-icon" />
            </div>
          ))}
        </div>
      </div> */}

      {/* Top Doctors */}
      {/* <div className="doctors-section">
        <h2 className="section-title">Top Doctors</h2>
        <div className="doctors-list">
          {topDoctors.map((doctor, index) => (
            <div key={index} className="doctor-card">
              <div className="doctor-avatar">
                <img src={doctor.image} alt={doctor.name} />
              </div>
              <div className="doctor-info">
                <div className="doctor-name">{doctor.name}</div>
                <div className="doctor-specialty">{doctor.specialty}</div>
              </div>
              {doctor.available && (
                <div className="available-badge">Available</div>
              )}
            </div>
          ))}
        </div>
      </div> */}

      {/* Bottom Navigation */}
      {/* <div className="home-bottom-nav">
        <div className="home-nav-item active" onClick={() => handleNavigation('home')}>
          <Home className="home-nav-icon" />
          <span className="home-nav-label">Home</span>
        </div>
        <div className="home-nav-item" onClick={() => handleNavigation('appointments')}>
          <Calendar className="home-nav-icon" />
          <span className="home-nav-label">Appointments</span>
        </div>
        <div className="home-nav-item" onClick={() => handleNavigation('abha')}>
          <Shield className="home-nav-icon" />
          <span className="home-nav-label">ABHA</span>
        </div>
        <div className="home-nav-item" onClick={() => handleNavigation('profile')}>
          <User className="home-nav-icon" />
          <span className="home-nav-label">Profile</span>
        </div>
      </div> */}
      <BottomNavigation 
        currentPage="home" 
        onNavigate={handleNavigation} 
        languageContent={{
          home: 'Home',
          appointments: 'Appointments',
          abha: 'ABHA',
          profile: 'Profile'
        }}
      />
          </div>
  );
};

export default HealthcareApp;

