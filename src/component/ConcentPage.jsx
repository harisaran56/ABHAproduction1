import React, { useState, useEffect } from 'react';
import { ChevronDown, Settings, X, Clock, CheckCircle, XCircle, AlertCircle, Calendar, User, Shield, Eye, FileText, Bell, Plus, Send } from 'lucide-react';
import BottomNavigation from './BottomNavigation';
import './ABHACard.css';

const ConsentPage = ({ onNavigate, userData, onInternalNavigate }) => {
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
  const [activeTab, setActiveTab] = useState('consents');
  const [activeFilter, setActiveFilter] = useState('pending');
  const [consentRequests, setConsentRequests] = useState([]);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showDenialModal, setShowDenialModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [newRequestForm, setNewRequestForm] = useState({
    providerName: '',
    providerType: '',
    purpose: '',
    duration: '30',
    requestedBy: '',
    department: '',
    description: '',
    dataTypes: [],
    urgency: 'normal'
  });

  // Mock consent requests data
  const mockConsentRequests = [
    // PENDING REQUESTS
    {
      id: '1',
      providerName: 'Apollo Hospitals',
      providerType: 'Hospital',
      providerLogo: '/HospitalLogo.jpg',
      requestDate: '2025-10-1',
      requestTime: '10:30 AM',
      purpose: 'Medical Records Access',
      duration: '30 days',
      requestedBy: 'Dr. Rajesh Kumar',
      department: 'Cardiology',
      status: 'pending',
      description: 'Requesting access to your medical records for ongoing treatment and consultation.',
      dataTypes: ['Lab Reports', 'Prescriptions', 'Diagnosis Reports', 'Treatment History'],
      urgency: 'normal',
      expiryDate: '2025-10-14'
    },
    {
      id: '2',
      providerName: 'Fortis Healthcare',
      providerType: 'Medical Center',
      providerLogo: '/HospitalLogo.jpg',
      requestDate: '2024-01-14',
      requestTime: '2:15 PM',
      purpose: 'Emergency Care',
      duration: '7 days',
      requestedBy: 'Dr. Priya Sharma',
      department: 'Emergency Medicine',
      status: 'pending',
      description: 'Emergency access required for immediate medical care and treatment.',
      dataTypes: ['Emergency Records', 'Allergy Information', 'Current Medications'],
      urgency: 'high',
      expiryDate: '2024-01-21'
    },
    {
      id: '3',
      providerName: 'Max Healthcare',
      providerType: 'Clinic',
      providerLogo: '/HospitalLogo.jpg',
      requestDate: '2024-01-13',
      requestTime: '4:45 PM',
      purpose: 'Second Opinion',
      duration: '15 days',
      requestedBy: 'Dr. Amit Patel',
      department: 'Oncology',
      status: 'pending',
      description: 'Requesting access to your medical records for providing a second medical opinion.',
      dataTypes: ['Diagnosis Reports', 'Imaging Results', 'Treatment Plans'],
      urgency: 'normal',
      expiryDate: '2024-01-28'
    },
    {
      id: '4',
      providerName: 'Med Hospital',
      providerType: 'Hospital',
      providerLogo: '/HospitalLogo.jpg',
      requestDate: '2024-01-12',
      requestTime: '9:20 AM',
      purpose: 'Insurance Claim',
      duration: '45 days',
      requestedBy: 'Dr. Neha Gupta',
      department: 'Administration',
      status: 'pending',
      description: 'Access required for processing your insurance claim and reimbursement.',
      dataTypes: ['Bills', 'Treatment Records', 'Prescription History'],
      urgency: 'low',
      expiryDate: '2024-02-26'
    },
    // GRANTED REQUESTS
    {
      id: '5',
      providerName: 'AIIMS Delhi',
      providerType: 'Government Hospital',
      providerLogo: '/HospitalLogo.jpg',
      requestDate: '2024-01-10',
      requestTime: '11:45 AM',
      purpose: 'Routine Checkup',
      duration: '60 days',
      requestedBy: 'Dr. Sunita Verma',
      department: 'General Medicine',
      status: 'granted',
      description: 'Access granted for routine health checkup and preventive care.',
      dataTypes: ['Medical History', 'Previous Reports', 'Current Medications'],
      urgency: 'normal',
      expiryDate: '2024-03-11',
      grantedDate: '2024-01-10',
      grantedTime: '11:50 AM'
    },
    {
      id: '6',
      providerName: 'Kokilaben Hospital',
      providerType: 'Private Hospital',
      providerLogo: '/HospitalLogo.jpg',
      requestDate: '2024-01-08',
      requestTime: '3:20 PM',
      purpose: 'Specialist Consultation',
      duration: '90 days',
      requestedBy: 'Dr. Vikram Singh',
      department: 'Neurology',
      status: 'granted',
      description: 'Access granted for specialist neurological consultation and treatment.',
      dataTypes: ['MRI Reports', 'Neurological Tests', 'Treatment History'],
      urgency: 'high',
      expiryDate: '2024-04-08',
      grantedDate: '2024-01-08',
      grantedTime: '3:25 PM'
    },
    {
      id: '7',
      providerName: 'Tata Memorial Hospital',
      providerType: 'Cancer Center',
      providerLogo: '/HospitalLogo.jpg',
      requestDate: '2024-01-05',
      requestTime: '9:15 AM',
      purpose: 'Cancer Treatment',
      duration: '180 days',
      requestedBy: 'Dr. Anjali Mehta',
      department: 'Oncology',
      status: 'granted',
      description: 'Access granted for comprehensive cancer treatment and monitoring.',
      dataTypes: ['Biopsy Reports', 'CT Scans', 'Treatment Plans', 'Lab Results'],
      urgency: 'high',
      expiryDate: '2024-07-05',
      grantedDate: '2024-01-05',
      grantedTime: '9:20 AM'
    },
    // DENIED REQUESTS
    {
      id: '8',
      providerName: 'Columbia Asia Hospital',
      providerType: 'Multi-specialty',
      providerLogo: '/HospitalLogo.jpg',
      requestDate: '2024-01-03',
      requestTime: '2:30 PM',
      purpose: 'Research Study',
      duration: '365 days',
      requestedBy: 'Dr. Rahul Sharma',
      department: 'Research',
      status: 'denied',
      description: 'Access denied for participation in medical research study.',
      dataTypes: ['Complete Medical History', 'Genetic Data', 'Treatment Records'],
      urgency: 'low',
      expiryDate: '2024-01-03',
      deniedDate: '2024-01-03',
      deniedTime: '2:35 PM',
      denialReason: 'Patient declined participation in research study'
    },
    {
      id: '9',
      providerName: 'Manipal Hospital',
      providerType: 'Private Hospital',
      providerLogo: '/HospitalLogo.jpg',
      requestDate: '2024-01-01',
      requestTime: '10:00 AM',
      purpose: 'Insurance Verification',
      duration: '30 days',
      requestedBy: 'Dr. Priya Reddy',
      department: 'Administration',
      status: 'denied',
      description: 'Access denied for insurance verification purposes.',
      dataTypes: ['Bills', 'Treatment Records', 'Prescription History'],
      urgency: 'normal',
      expiryDate: '2024-01-01',
      deniedDate: '2024-01-01',
      deniedTime: '10:05 AM',
      denialReason: 'Patient preferred not to share data for insurance verification'
    },
    // EXPIRED REQUESTS
    {
      id: '10',
      providerName: 'Narayana Health',
      providerType: 'Hospital Chain',
      providerLogo: '/HospitalLogo.jpg',
      requestDate: '2023-12-20',
      requestTime: '4:15 PM',
      purpose: 'Telemedicine Consultation',
      duration: '7 days',
      requestedBy: 'Dr. Rajesh Gupta',
      department: 'Telemedicine',
      status: 'expired',
      description: 'Access expired for telemedicine consultation session.',
      dataTypes: ['Video Consultation', 'Prescription Records', 'Follow-up Notes'],
      urgency: 'normal',
      expiryDate: '2023-12-27',
      grantedDate: '2023-12-20',
      grantedTime: '4:20 PM'
    },
    {
      id: '11',
      providerName: 'Fortis Escorts',
      providerType: 'Cardiac Center',
      providerLogo: '/HospitalLogo.jpg',
      requestDate: '2023-12-15',
      requestTime: '1:30 PM',
      purpose: 'Cardiac Surgery',
      duration: '30 days',
      requestedBy: 'Dr. Sanjay Kumar',
      department: 'Cardiac Surgery',
      status: 'expired',
      description: 'Access expired for cardiac surgery preparation and follow-up.',
      dataTypes: ['ECG Reports', 'Echocardiogram', 'Surgery Records', 'Post-op Care'],
      urgency: 'high',
      expiryDate: '2024-01-14',
      grantedDate: '2023-12-15',
      grantedTime: '1:35 PM'
    },
    {
      id: '12',
      providerName: 'Apollo Spectra',
      providerType: 'Diagnostic Center',
      providerLogo: '/HospitalLogo.jpg',
      requestDate: '2023-12-10',
      requestTime: '11:00 AM',
      purpose: 'Diagnostic Tests',
      duration: '14 days',
      requestedBy: 'Dr. Meera Joshi',
      department: 'Diagnostics',
      status: 'expired',
      description: 'Access expired for diagnostic test results and analysis.',
      dataTypes: ['Blood Tests', 'Imaging Reports', 'Pathology Results'],
      urgency: 'normal',
      expiryDate: '2023-12-24',
      grantedDate: '2023-12-10',
      grantedTime: '11:05 AM'
    }
  ];

  // Initialize consent requests
  useEffect(() => {
    setConsentRequests(mockConsentRequests);
  }, []);

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
      pending: 'Pending',
      granted: 'Granted',
      denied: 'Denied',
      expired: 'Expired'
    },
    hindi: {
      chooseLanguage: 'भाषा चुनें',
      home: 'होम',
      records: 'रिकॉर्ड्स',
      abha: 'ABHA',
      profile: 'प्रोफाइल',
      consents: 'सहमति',
      providers: 'प्रदाता',
      pending: 'लंबित',
      granted: 'दिया गया',
      denied: 'अस्वीकृत',
      expired: 'समाप्त'
    },
    kannada: {
      chooseLanguage: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      home: 'ಮನೆ',
      records: 'ರೆಕಾರ್ಡ್ಗಳು',
      abha: 'ABHA',
      profile: 'ಪ್ರೊಫೈಲ್',
      consents: 'ಸಮ್ಮತಿ',
      providers: 'ಪ್ರದಾತರು',
      pending: 'ಬಾಕಿ',
      granted: 'ನೀಡಲಾಗಿದೆ',
      denied: 'ನಿರಾಕರಿಸಲಾಗಿದೆ',
      expired: 'ಅವಧಿ ಮುಗಿದಿದೆ'
    }
  };

  const currentContent = languageContent[selectedLanguage];

  // Consent handling functions
  const handleApproveConsent = (requestId) => {
    const request = consentRequests.find(req => req.id === requestId);
    if (request) {
      setSelectedRequest(request);
      setShowApprovalModal(true);
    }
  };

  const handleDenyConsent = (requestId) => {
    const request = consentRequests.find(req => req.id === requestId);
    if (request) {
      setSelectedRequest(request);
      setShowDenialModal(true);
    }
  };

  const confirmApproval = async () => {
    if (!selectedRequest) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Calculate expiry date based on duration
    const durationDays = parseInt(selectedRequest.duration.replace(' days', ''));
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + durationDays);
    
    // Update the request status to granted with granted date and time
    setConsentRequests(prev => 
      prev.map(req => 
        req.id === selectedRequest.id 
          ? { 
              ...req, 
              status: 'granted',
              grantedDate: new Date().toISOString().split('T')[0],
              grantedTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              expiryDate: expiryDate.toISOString().split('T')[0]
            }
          : req
      )
    );
    
    // Create notification for approved request
    const notification = {
      id: Date.now().toString(),
      type: 'request_approved',
      title: 'Consent Request Approved',
      message: `You have approved ${selectedRequest.providerName}'s request for ${selectedRequest.purpose}`,
      timestamp: new Date().toISOString(),
      requestId: selectedRequest.id,
      read: false
    };
    
    setNotifications(prev => [notification, ...prev]);
    
    setIsProcessing(false);
    setShowApprovalModal(false);
    setSelectedRequest(null);
  };

  const confirmDenial = async () => {
    if (!selectedRequest) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update the request status
    setConsentRequests(prev => 
      prev.map(req => 
        req.id === selectedRequest.id 
          ? { ...req, status: 'denied' }
          : req
      )
    );
    
    setIsProcessing(false);
    setShowDenialModal(false);
    setSelectedRequest(null);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return '#ef4444';
      case 'normal': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'high': return <AlertCircle size={16} />;
      case 'normal': return <Clock size={16} />;
      case 'low': return <CheckCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  // Show pending and granted requests - denied and expired sections are disabled
  const filteredRequests = consentRequests.filter(req => req.status === activeFilter);

  // Additional functions for granted, denied, and expired requests
  const handleRevokeAccess = (requestId) => {
    const request = consentRequests.find(req => req.id === requestId);
    if (request) {
      setSelectedRequest(request);
      setShowDenialModal(true);
    }
  };

  const handleRenewAccess = (requestId) => {
    const request = consentRequests.find(req => req.id === requestId);
    if (request) {
      setSelectedRequest(request);
      setShowApprovalModal(true);
    }
  };

  const handleViewDetails = (requestId) => {
    const request = consentRequests.find(req => req.id === requestId);
    if (request) {
      setSelectedRequest(request);
      setShowDetailsModal(true);
    }
  };

  const confirmRevokeAccess = async () => {
    if (!selectedRequest) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    
    // Update the request status to denied
    setConsentRequests(prev => 
      prev.map(req => 
        req.id === selectedRequest.id 
          ? { ...req, status: 'denied', deniedDate: new Date().toISOString().split('T')[0], deniedTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
          : req
      )
    );
    
    setIsProcessing(false);
    setShowDenialModal(false);
    setSelectedRequest(null);
  };

  const confirmRenewAccess = async () => {
    if (!selectedRequest) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update the request status to granted with new expiry date
    const durationDays = parseInt(selectedRequest.duration.replace(' days', ''));
    const newExpiryDate = new Date();
    newExpiryDate.setDate(newExpiryDate.getDate() + durationDays);
    
    setConsentRequests(prev => 
      prev.map(req => 
        req.id === selectedRequest.id 
          ? { 
              ...req, 
              status: 'granted', 
              grantedDate: new Date().toISOString().split('T')[0], 
              grantedTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              expiryDate: newExpiryDate.toISOString().split('T')[0]
            }
          : req
      )
    );
    
    setIsProcessing(false);
    setShowApprovalModal(false);
    setSelectedRequest(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'granted': return '#10b981';
      case 'denied': return '#ef4444';
      case 'expired': return '#f59e0b';
      case 'pending': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'granted': return <CheckCircle size={16} />;
      case 'denied': return <XCircle size={16} />;
      case 'expired': return <Clock size={16} />;
      case 'pending': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'abha') {
      // Navigate back to ABHA card view using internal navigation
      if (onInternalNavigate) {
        onInternalNavigate('abha');
      }
    } else if (tab === 'providers') {
      // Navigate to providers view using internal navigation
      if (onInternalNavigate) {
        onInternalNavigate('providers');
      }
    }
  };

  const handleFilterChange = (filter) => {
    // Allow all filters - pending, granted, denied, and expired
    setActiveFilter(filter);
  };

  const handleGoHome = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  // New consent request functions
  const handleNewRequestSubmit = async () => {
    if (!newRequestForm.providerName || !newRequestForm.purpose || !newRequestForm.requestedBy) {
      alert('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call to create new consent request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newRequest = {
      id: Date.now().toString(),
      providerName: newRequestForm.providerName,
      providerType: newRequestForm.providerType || 'Healthcare Provider',
      providerLogo: '/HospitalLogo.jpg',
      requestDate: new Date().toISOString().split('T')[0],
      requestTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      purpose: newRequestForm.purpose,
      duration: `${newRequestForm.duration} days`,
      requestedBy: newRequestForm.requestedBy,
      department: newRequestForm.department || 'General Medicine',
      status: 'pending',
      description: newRequestForm.description || 'Requesting access to medical records for treatment purposes.',
      dataTypes: newRequestForm.dataTypes.length > 0 ? newRequestForm.dataTypes : ['Medical Records', 'Lab Reports', 'Prescriptions'],
      urgency: newRequestForm.urgency,
      expiryDate: new Date(Date.now() + parseInt(newRequestForm.duration) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    // Add new request to the list
    setConsentRequests(prev => [newRequest, ...prev]);
    
    // Create notification
    const notification = {
      id: Date.now().toString(),
      type: 'new_request',
      title: 'New Consent Request',
      message: `${newRequestForm.providerName} has requested access to your medical records`,
      timestamp: new Date().toISOString(),
      requestId: newRequest.id,
      read: false
    };
    
    setNotifications(prev => [notification, ...prev]);
    
    // Reset form
    setNewRequestForm({
      providerName: '',
      providerType: '',
      purpose: '',
      duration: '30',
      requestedBy: '',
      department: '',
      description: '',
      dataTypes: [],
      urgency: 'normal'
    });
    
    setIsProcessing(false);
    setShowNewRequestModal(false);
    
    // Show success message
    alert('Consent request sent successfully! Patient will be notified.');
  };

  const handleInputChange = (field, value) => {
    setNewRequestForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addDataType = () => {
    const newType = prompt('Enter data type:');
    if (newType && newType.trim()) {
      setNewRequestForm(prev => ({
        ...prev,
        dataTypes: [...prev.dataTypes, newType.trim()]
      }));
    }
  };

  const removeDataType = (index) => {
    setNewRequestForm(prev => ({
      ...prev,
      dataTypes: prev.dataTypes.filter((_, i) => i !== index)
    }));
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, read: true }
          : notif
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Simulate incoming consent requests (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly generate new requests every 30-60 seconds for demo
      if (Math.random() < 0.3) { // 30% chance every interval
        const providers = [
          { name: 'Max Healthcare', type: 'Hospital', doctor: 'Dr. Priya Sharma', dept: 'Cardiology' },
          { name: 'Medanta Hospital', type: 'Medical Center', doctor: 'Dr. Amit Patel', dept: 'Neurology' },
          { name: 'Fortis Healthcare', type: 'Clinic', doctor: 'Dr. Rajesh Kumar', dept: 'Orthopedics' },
          { name: 'Apollo Hospitals', type: 'Hospital', doctor: 'Dr. Neha Gupta', dept: 'Dermatology' }
        ];
        
        const randomProvider = providers[Math.floor(Math.random() * providers.length)];
        const purposes = ['Medical Records Access', 'Emergency Care', 'Second Opinion', 'Insurance Claim', 'Routine Checkup'];
        const randomPurpose = purposes[Math.floor(Math.random() * purposes.length)];
        
        const newRequest = {
          id: Date.now().toString(),
          providerName: randomProvider.name,
          providerType: randomProvider.type,
          providerLogo: '/HospitalLogo.jpg',
          requestDate: new Date().toISOString().split('T')[0],
          requestTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          purpose: randomPurpose,
          duration: '30 days',
          requestedBy: randomProvider.doctor,
          department: randomProvider.dept,
          status: 'pending',
          description: `Requesting access to your medical records for ${randomPurpose.toLowerCase()}.`,
          dataTypes: ['Lab Reports', 'Prescriptions', 'Diagnosis Reports'],
          urgency: 'normal',
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        };

        setConsentRequests(prev => [newRequest, ...prev]);
        
        const notification = {
          id: Date.now().toString(),
          type: 'new_request',
          title: 'New Consent Request',
          message: `${randomProvider.name} has requested access to your medical records`,
          timestamp: new Date().toISOString(),
          requestId: newRequest.id,
          read: false
        };
        
        setNotifications(prev => [notification, ...prev]);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="abha-card-page">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="time">11:52</span>
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
          <button className="language-close">
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
        <div className="profile-actions">
          <button 
            className="notification-btn"
            onClick={() => setShowNotificationPanel(!showNotificationPanel)}
          >
            <Bell size={20} />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="notification-badge">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>
          <button 
            className="new-request-btn"
            onClick={() => setShowNewRequestModal(true)}
          >
            <Plus size={20} />
            New Request
          </button>
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

      {/* Consent Filter Buttons */}
      <div className="consent-filters">
        <button 
          className={`consent-filter ${activeFilter === 'pending' ? 'active' : ''}`}
          onClick={() => handleFilterChange('pending')}
        >
          {currentContent.pending}
        </button>
        <button 
          className={`consent-filter ${activeFilter === 'granted' ? 'active' : ''}`}
          onClick={() => handleFilterChange('granted')}
        >
          {currentContent.granted}
        </button>
         <button 
           className={`consent-filter ${activeFilter === 'denied' ? 'active' : ''}`}
           onClick={() => handleFilterChange('denied')}
         >
           {currentContent.denied}
         </button>
         <button 
           className={`consent-filter ${activeFilter === 'expired' ? 'active' : ''}`}
           onClick={() => handleFilterChange('expired')}
         >
           {currentContent.expired}
         </button>
      </div>

      {/* Consent Content Area */}
      <div className="consent-content">
        {filteredRequests.length > 0 ? (
          <div className="consent-requests-list">
            {filteredRequests.map((request) => (
              <div key={request.id} className={`consent-request-card ${request.status}`}>
                {/* Compact Card Header */}
                <div className="request-header">
                  <div className="provider-info">
                    <div className="provider-logo">
                      <img 
                        src={request.providerLogo} 
                        alt={request.providerName}
                        className="provider-icon"
                        style={{
                          width: '40px',
                          height: '40px',
                          objectFit: 'contain',
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          padding: '4px',
                          display: 'block'
                        }}
                        onLoad={() => console.log('Image loaded successfully:', request.providerLogo)}
                        onError={(e) => {
                          console.log('Image failed to load:', request.providerLogo);
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'inline';
                        }}
                      />
                      <span className="provider-icon-fallback" style={{display: 'none'}}>🏥</span>
                    </div>
                    <div className="provider-details">
                      <h3 className="provider-name">{request.providerName}</h3>
                      <p className="provider-type">{request.providerType}</p>
                    </div>
                  </div>
                  {request.status !== 'pending' && (
                    <div className="status-indicator" style={{ color: getStatusColor(request.status) }}>
                      {getStatusIcon(request.status)}
                      <span className="status-text">{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</span>
                    </div>
                  )}
                </div>

                {/* Data Access Section */}
                <div className="data-access-section">
                  <div className="data-access-header">
                    <Eye size={16} />
                    <span>Data Access</span>
                  </div>
                  <div className="data-types-grid">
                    {request.dataTypes.slice(0, 3).map((type, index) => (
                      <div key={index} className="data-type-item">
                        <FileText size={12} />
                        <span>{type}</span>
                      </div>
                    ))}
                    {request.dataTypes.length > 3 && (
                      <div className="data-type-item more-items">
                        <span>+{request.dataTypes.length - 3} more</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="request-actions">
                  <button 
                    className="details-btn"
                    onClick={() => handleViewDetails(request.id)}
                  >
                    Details
                  </button>
                  
                  {request.status === 'pending' && (
                    <div className="action-buttons-row">
                      <button 
                        className="deny-btn"
                        onClick={() => handleDenyConsent(request.id)}
                      >
                        <XCircle size={16} />
                        Deny
                      </button>
                      <button 
                        className="approve-btn"
                        onClick={() => handleApproveConsent(request.id)}
                      >
                        <CheckCircle size={16} />
                        Approve
                      </button>
                    </div>
                  )}
                  
                  {request.status === 'granted' && (
                    <button 
                      className="revoke-btn"
                      onClick={() => handleRevokeAccess(request.id)}
                    >
                      <XCircle size={16} />
                      Revoke Access
                    </button>
                  )}
                  
                  {/* {request.status === 'denied' && (
                    <button 
                      className="renew-btn"
                      onClick={() => handleRenewAccess(request.id)}
                    >
                      <CheckCircle size={16} />
                      Request Again
                    </button>
                  )} */}
                  
                  {request.status === 'expired' && (
                    <button 
                      className="renew-btn"
                      onClick={() => handleRenewAccess(request.id)}
                    >
                      <CheckCircle size={16} />
                      Renew Access
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-content">
              <div className="empty-state-icon">
                <div className="icon-blocks">
                  <div className="block"></div>
                  <div className="block"></div>
                  <div className="block"></div>
                </div>
              </div>
               <h2 className="empty-state-title">
                 {activeFilter === 'pending' ? 'No Pending Requests' : 
                  activeFilter === 'granted' ? 'No Granted Requests' :
                  activeFilter === 'denied' ? 'No Denied Requests' :
                  'No Expired Requests'}
               </h2>
               <p className="empty-state-description">
                 {activeFilter === 'pending' 
                   ? 'Healthcare providers can ask for permission to access your medical records.'
                   : activeFilter === 'granted'
                   ? 'You have no granted consent requests at this time.'
                   : activeFilter === 'denied'
                   ? 'You have no denied consent requests at this time.'
                   : 'You have no expired consent requests at this time.'
                 }
               </p>
               <p className="empty-state-subdescription">
                 {activeFilter === 'pending' 
                   ? 'Incoming requests get added here.'
                   : activeFilter === 'granted'
                   ? 'Approved requests will appear here.'
                   : activeFilter === 'denied'
                   ? 'Denied requests will appear here.'
                   : 'Expired requests will appear here.'
                 }
               </p>
            </div>
          </div>
        )}
      </div>

      {/* Notification Panel */}
      {showNotificationPanel && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3>Notifications</h3>
            <div className="notification-actions">
              <button onClick={clearAllNotifications} className="clear-btn">
                Clear All
              </button>
              <button onClick={() => setShowNotificationPanel(false)} className="close-btn">
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <Bell size={24} />
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="notification-icon">
                    <Bell size={16} />
                  </div>
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <span className="notification-time">
                      {new Date(notification.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* New Request Modal */}
      {showNewRequestModal && (
        <div className="consent-modal-overlay">
          <div className="consent-modal-container new-request-modal">
            <div className="consent-modal-header">
              <div className="modal-icon new-request-icon">
                <Plus size={24} />
              </div>
              <h3 className="modal-title">Initiate Consent Request</h3>
              <button 
                className="modal-close"
                onClick={() => setShowNewRequestModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="consent-modal-body">
              <div className="form-group">
                <label>Provider Name *</label>
                <input
                  type="text"
                  value={newRequestForm.providerName}
                  onChange={(e) => handleInputChange('providerName', e.target.value)}
                  placeholder="e.g., Apollo Hospitals"
                />
              </div>
              
              <div className="form-group">
                <label>Provider Type</label>
                <select
                  value={newRequestForm.providerType}
                  onChange={(e) => handleInputChange('providerType', e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="Hospital">Hospital</option>
                  <option value="Clinic">Clinic</option>
                  <option value="Medical Center">Medical Center</option>
                  <option value="Diagnostic Center">Diagnostic Center</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Requested By *</label>
                <input
                  type="text"
                  value={newRequestForm.requestedBy}
                  onChange={(e) => handleInputChange('requestedBy', e.target.value)}
                  placeholder="e.g., Dr. Rajesh Kumar"
                />
              </div>
              
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  value={newRequestForm.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  placeholder="e.g., Cardiology"
                />
              </div>
              
              <div className="form-group">
                <label>Purpose *</label>
                <select
                  value={newRequestForm.purpose}
                  onChange={(e) => handleInputChange('purpose', e.target.value)}
                >
                  <option value="">Select Purpose</option>
                  <option value="Medical Records Access">Medical Records Access</option>
                  <option value="Emergency Care">Emergency Care</option>
                  <option value="Second Opinion">Second Opinion</option>
                  <option value="Insurance Claim">Insurance Claim</option>
                  <option value="Routine Checkup">Routine Checkup</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Duration (days)</label>
                <input
                  type="number"
                  value={newRequestForm.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  min="1"
                  max="365"
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newRequestForm.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the purpose of this consent request..."
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label>Data Types</label>
                <div className="data-types-input">
                  <div className="data-types-list">
                    {newRequestForm.dataTypes.map((type, index) => (
                      <span key={index} className="data-type-tag">
                        {type}
                        <button onClick={() => removeDataType(index)}>
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <button onClick={addDataType} className="add-data-type-btn">
                    <Plus size={14} />
                    Add Data Type
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <label>Urgency</label>
                <select
                  value={newRequestForm.urgency}
                  onChange={(e) => handleInputChange('urgency', e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div className="consent-modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowNewRequestModal(false)}
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button 
                className="confirm-approve-btn"
                onClick={handleNewRequestSubmit}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="loading-spinner"></div>
                    Sending Request...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Request
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approval Confirmation Modal */}
      {showApprovalModal && selectedRequest && (
        <div className="consent-modal-overlay">
          <div className="consent-modal-container">
            <div className="consent-modal-header">
              <div className="modal-icon approve-icon">
                <CheckCircle size={24} />
              </div>
              <h3 className="modal-title">
                {selectedRequest.status === 'expired' ? 'Renew Consent Access' : 
                 selectedRequest.status === 'denied' ? 'Request Consent Again' : 
                 'Approve Consent Request'}
              </h3>
              <button 
                className="modal-close"
                onClick={() => setShowApprovalModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="consent-modal-body">
              <div className="provider-summary">
                <div className="provider-logo">
                  <img 
                    src={selectedRequest.providerLogo} 
                    alt={selectedRequest.providerName}
                    
                    className="provider-icon"
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      padding: '4px',
                      display: 'block'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'inline';
                    }}
                  />
                  <span className="provider-icon-fallback" style={{display: 'none'}}>🏥</span>
                </div>
                <div className="provider-info">
                  <h4>{selectedRequest.providerName}</h4>
                  <p>{selectedRequest.requestedBy} - {selectedRequest.department}</p>
                </div>
              </div>
              
              <div className="consent-details">
                <p className="consent-purpose">{selectedRequest.purpose}</p>
                <p className="consent-description">{selectedRequest.description}</p>
                <div className="consent-duration">
                  <Shield size={16} />
                  <span>Access granted for {selectedRequest.duration}</span>
                </div>
              </div>
              
              <div className="data-access-summary">
                <h5>Data Access Summary:</h5>
                <ul>
                  {selectedRequest.dataTypes.map((type, index) => (
                    <li key={index}>
                      <FileText size={12} />
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="consent-modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowApprovalModal(false)}
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button 
                className="confirm-approve-btn"
                onClick={selectedRequest.status === 'pending' ? confirmApproval : confirmRenewAccess}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="loading-spinner"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    {selectedRequest.status === 'expired' ? 'Renew Access' : 
                     selectedRequest.status === 'denied' ? 'Request Again' : 
                     'Approve Access'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Denial Confirmation Modal */}
      {showDenialModal && selectedRequest && (
        <div className="consent-modal-overlay">
          <div className="consent-modal-container">
            <div className="consent-modal-header">
              <div className="modal-icon deny-icon">
                <XCircle size={24} />
              </div>
              <h3 className="modal-title">
                {selectedRequest.status === 'granted' ? 'Revoke Consent Access' : 'Deny Consent Request'}
              </h3>
              <button 
                className="modal-close"
                onClick={() => setShowDenialModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="consent-modal-body">
              <div className="provider-summary">
                <div className="provider-logo">
                  <img 
                    src={selectedRequest.providerLogo} 
                    alt={selectedRequest.providerName}
                    className="provider-icon"
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      padding: '4px',
                      display: 'block'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'inline';
                    }}
                  />
                  <span className="provider-icon-fallback" style={{display: 'none'}}>🏥</span>
                </div>
                <div className="provider-info">
                  <h4>{selectedRequest.providerName}</h4>
                  <p>{selectedRequest.requestedBy} - {selectedRequest.department}</p>
                </div>
              </div>
              
              <div className="consent-details">
                <p className="consent-purpose">{selectedRequest.purpose}</p>
                <p className="consent-description">{selectedRequest.description}</p>
              </div>
              
              <div className="denial-warning">
                <AlertCircle size={16} />
                <p>
                  {selectedRequest.status === 'granted' 
                    ? 'Are you sure you want to revoke this consent access? The healthcare provider will immediately lose access to your medical records.'
                    : 'Are you sure you want to deny this consent request? The healthcare provider will not be able to access your medical records.'
                  }
                </p>
              </div>
            </div>
            
            <div className="consent-modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowDenialModal(false)}
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button 
                className="confirm-deny-btn"
                onClick={selectedRequest.status === 'granted' ? confirmRevokeAccess : confirmDenial}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="loading-spinner"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <XCircle size={16} />
                    {selectedRequest.status === 'granted' ? 'Revoke Access' : 'Deny Access'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="consent-modal-overlay">
          <div className="consent-modal-container details-modal">
            <div className="consent-modal-header">
              <div className="modal-icon details-icon">
                <Eye size={24} />
              </div>
              <div className="header-content">
                {selectedRequest.status !== 'pending' && (
                  <div className="status-badge" style={{ backgroundColor: getStatusColor(selectedRequest.status) }}>
                    {getStatusIcon(selectedRequest.status)}
                    <span>{selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}</span>
                  </div>
                )}
                <h3 className="modal-title">Consent Request Details</h3>
              </div>
              <button 
                className="modal-close"
                onClick={() => setShowDetailsModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="consent-modal-body">
              {/* Provider Header */}
              <div className="provider-summary">
                <div className="provider-logo">
                  <img 
                    src={selectedRequest.providerLogo} 
                    alt={selectedRequest.providerName}
                    className="provider-icon"
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'contain',
                      borderRadius: '12px',
                      backgroundColor: 'white',
                      padding: '6px',
                      display: 'block'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'inline';
                    }}
                  />
                  <span className="provider-icon-fallback" style={{display: 'none'}}>🏥</span>
                </div>
                <div className="provider-info">
                  <h4>{selectedRequest.providerName}</h4>
                  <p>{selectedRequest.providerType}</p>
                </div>
              </div>

              {/* Request Details */}
              <div className="request-details-section">
                <div className="request-meta">
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>{selectedRequest.requestDate} at {selectedRequest.requestTime}</span>
                  </div>
                  <div className="meta-item">
                    <User size={16} />
                    <span>{selectedRequest.requestedBy} - {selectedRequest.department}</span>
                  </div>
                  {selectedRequest.status === 'granted' && selectedRequest.grantedDate && (
                    <div className="meta-item">
                      <CheckCircle size={16} />
                      <span>Granted on {selectedRequest.grantedDate} at {selectedRequest.grantedTime}</span>
                    </div>
                  )}
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>
                      {selectedRequest.status === 'granted' && selectedRequest.grantedDate 
                        ? <>Valid from <span style={{color: '#ef4444', fontWeight: 'bold'}}>{selectedRequest.grantedDate}</span> to <span style={{color: '#ef4444', fontWeight: 'bold'}}>{selectedRequest.expiryDate}</span></>
                        : selectedRequest.status === 'pending'
                        ? `Will be valid for ${selectedRequest.duration} from approval`
                        : `Valid for ${selectedRequest.duration}`
                      }
                    </span>
                  </div>
                  {selectedRequest.status === 'denied' && selectedRequest.deniedDate && (
                    <div className="meta-item">
                      <XCircle size={16} />
                      <span>Denied on {selectedRequest.deniedDate} at {selectedRequest.deniedTime}</span>
                    </div>
                  )}
                  {selectedRequest.status === 'expired' && selectedRequest.grantedDate && (
                    <div className="meta-item">
                      <Clock size={16} />
                      <span>Expired on {selectedRequest.expiryDate}</span>
                    </div>
                  )}
                </div>

                <div className="request-purpose">
                  <h4 className="purpose-title">{selectedRequest.purpose}</h4>
                  <p className="purpose-description">
                    {selectedRequest.description || `Requesting access to your medical records for ${selectedRequest.purpose.toLowerCase()}.`}
                  </p>
                </div>

                <div className="data-types-section">
                  <div className="data-types-header">
                    <Eye size={16} />
                    <span>Data Access:</span>
                  </div>
                  <div className="data-types-list">
                    {selectedRequest.dataTypes.map((type, index) => (
                      <span key={index} className="data-type-tag">
                        <FileText size={12} />
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedRequest.status === 'denied' && selectedRequest.denialReason && (
                  <div className="denial-reason">
                    <AlertCircle size={16} />
                    <span>Reason: {selectedRequest.denialReason}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="consent-modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </button>
              {selectedRequest.status === 'granted' && (
                <button 
                  className="revoke-btn"
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleRevokeAccess(selectedRequest.id);
                  }}
                >
                  <XCircle size={16} />
                  Revoke Access
                </button>
              )}
              {/* {selectedRequest.status === 'denied' && (
                <button 
                  className="renew-btn"
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleRenewAccess(selectedRequest.id);
                  }}
                >
                  <CheckCircle size={16} />
                  Request Again
                </button>
              )} */}
              {selectedRequest.status === 'expired' && (
                <button 
                  className="renew-btn"
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleRenewAccess(selectedRequest.id);
                  }}
                >
                  <CheckCircle size={16} />
                  Renew Access
                </button>
              )}
            </div>
          </div>
        </div>
      )}

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

export default ConsentPage;