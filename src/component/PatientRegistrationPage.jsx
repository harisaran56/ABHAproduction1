import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, User, ChevronDown } from 'lucide-react';
import CreateABHAPage from './CreateABHAPage';
import BottomNavigation from './BottomNavigation';
import './PatientRegistrationPage.css';


const PatientRegistrationPage = ({ onNavigate, onBack, loginMethod = 'mobile' }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    pincode: ''
  });
  const [errors, setErrors] = useState({});
  const [showCreateABHA, setShowCreateABHA] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }
    
    // Address validation removed since address field is commented out
    // if (!formData.address.trim()) {
    //   newErrors.address = 'Address is required';
    // } else if (formData.address.trim().length < 10) {
    //   newErrors.address = 'Please enter a complete address';
    // }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 0 || age > 120) {
        newErrors.dateOfBirth = 'Please enter a valid date of birth';
      }
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Patient Registration Data:', formData);
      // Navigate to Create ABHA Address page
      setShowCreateABHA(true);
    }
  };

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else if (onNavigate) {
      onNavigate('back');
    } else {
      window.history.back();
    }
  };

  const handleCreateABHANavigate = (action) => {
    if (action === 'back') {
      setShowCreateABHA(false);
    } else if (action === 'success') {
      // Show success message or navigate to next step
      setShowCreateABHA(false);
      if (onNavigate) {
        onNavigate('success');
      }
    } else if (action === 'abha') {
      // Navigate to ABHA page
      setShowCreateABHA(false);
      if (onNavigate) {
        onNavigate('abha');
      }
    }
  };

  // If Create ABHA page is shown, render CreateABHAPage component
  if (showCreateABHA) {
    return (
      <CreateABHAPage
        onNavigate={handleCreateABHANavigate}
        onBack={() => setShowCreateABHA(false)}
        patientData={formData}
        loginMethod={loginMethod}
      />
    );
  }

  return (
    <div className="patient-registration-page">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="time">11:46</span>
        </div>
        <div className="status-right">
          <div className="signal-bars">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <span className="wifi">📶</span>
          <span className="lte">LTE2</span>
          <span className="battery">47%</span>
        </div>
      </div>

      {/* Header */}
      <div className="header">
        <button className="back-button" onClick={handleGoBack}>
          <ArrowLeft className="arrow-icon" />
        </button>
        <h1 className="header-title">Patient Registration</h1>
        <div className="header-spacer"></div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Logo Container */}
        <div className="logo-container">
          <div className="logo-square">
            <img 
              src="/healthLogo.webp" 
              alt="Health Logo" 
              className="health-logo"
            />
          </div>
          <div className="logo-text">Digital Mission</div>
        </div>

        {/* Introduction Text */}
        <div className="intro-section">
          <h2 className="intro-title">Complete Your Profile
            
          </h2>
          <p className="intro-text">
            Please provide your personal information to create your ABHA account and access healthcare services.
          </p>
        </div>

        {/* Registration Form */}
        <form className="registration-form" onSubmit={handleSubmit}>
          {/* Name Components Row */}
          <div className="name-components-row">
            {/* First Name Component */}
            <div className="name-component">
              <div className="component-label">
                <User className="label-icon" />
                <span>First Name</span>
                <span className="required">*</span>
              </div>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className={`name-input ${errors.firstName ? 'error' : ''}`}
                placeholder="Enter first name"
                maxLength="50"
              />
              {errors.firstName && (
                <span className="error-text">{errors.firstName}</span>
              )}
            </div>

            {/* Last Name Component */}
            <div className="name-component">
              <div className="component-label">
                <User className="label-icon" />
                <span>Last Name</span>
                <span className="required">*</span>
              </div>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className={`name-input ${errors.lastName ? 'error' : ''}`}
                placeholder="Enter last name"
                maxLength="50"
              />
              {errors.lastName && (
                <span className="error-text">{errors.lastName}</span>
              )}
            </div>
          </div>

          {/* Address */}
          {/* <div className="address-component">
            <div className="component-label">
              <MapPin className="label-icon" />
              <span>Address</span>
              <span className="required">*</span>
            </div>
            <textarea
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className={`address-input ${errors.address ? 'error' : ''}`}
              placeholder="Enter your complete address"
              rows="3"
              maxLength="200"
            />
            {errors.address && (
              <span className="error-text">{errors.address}</span>
            )}
          </div> */}

          {/* Date and Gender Components Row */}
          <div className="date-gender-row">
            {/* Date of Birth Component */}
            <div className="date-component">
              <div className="component-label">
                <Calendar className="label-icon" />
                <span>Date of Birth</span>
                <span className="required">*</span>
              </div>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className={`date-input ${errors.dateOfBirth ? 'error' : ''}`}
                max={new Date().toISOString().split('T')[0]}
              />
              {errors.dateOfBirth && (
                <span className="error-text">{errors.dateOfBirth}</span>
              )}
            </div>

            {/* Gender Component */}
            <div className="gender-component">
              <div className="component-label">
                <User className="label-icon" />
                <span>Gender</span>
                <span className="required">*</span>
              </div>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className={`gender-input ${errors.gender ? 'error' : ''}`}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <span className="error-text">{errors.gender}</span>
              )}
            </div>
          </div>

          {/* Pincode Component */}
          <div className="pincode-component">
            <div className="component-label">
              <MapPin className="label-icon" />
              <span>Pincode</span>
              <span className="required">*</span>
            </div>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
              className={`pincode-input ${errors.pincode ? 'error' : ''}`}
              placeholder="Enter 6-digit pincode"
              maxLength="6"
            />
            {errors.pincode && (
              <span className="error-text">{errors.pincode}</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              type="button"
              className="back-button-form"
              onClick={handleGoBack}
            >
              <ArrowLeft className="back-icon" />
              <span>Go Back</span>
            </button>
            
            <button 
              type="submit"
              className="submit-button"
            >
              <span>Continue to Create ABHA Address</span>
              <ChevronDown className="chevron-icon" />
            </button>
          </div>
        </form>

        {/* Privacy Notice */}
        <div className="privacy-notice">
          <p className="privacy-text">
            Your information is secure and will be used only for creating your ABHA account and providing healthcare services.
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentPage="abha" 
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default PatientRegistrationPage;
