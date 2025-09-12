import React, { useEffect, useRef } from 'react';
import {
  ChevronDown,
  Settings,
  Info,
  Play,
  Bell,
  Plus,
} from 'lucide-react';
import BottomNavigation from './BottomNavigation';
import './ABHAPage.css';

const ABHAPage = ({ onNavigate }) => {
  const infoCards = [
    {
      id: 1,
      title: 'What is ABHA ID?',
      illustration: 'person-card',
      content: {
        name: 'Riya Agarwal',
        location: 'Hyderabad',
        year: '1997',
        gender: 'Female',
        hasQR: true,
      },
    },
    {
      id: 2,
      title: 'How to create ABHA using Aadhaar?',
      illustration: 'mobile-form',
      content: {
        fields: ['2478', '3546', '7384'],
        hasNext: true,
        hasCard: true,
      },
    },
    {
      id: 3,
      title: 'How to create ABHA using Phone Number?',
      illustration: 'mobile-phone',
      content: {
        phone: '+91 9167941400',
        hasNext: true,
        hasCard: true,
      },
    },
    {
      id: 4,
      title: 'How to verify KYC?',
      illustration: 'kyc-card',
      content: {
        verified: true,
        hasQR: true,
      },
    },
  ];

  const cardsContainerRef = useRef(null);
  const autoScrollRef = useRef(null);

  // Auto-scroll functionality
  useEffect(() => {
    const cardsContainer = cardsContainerRef.current;
    if (!cardsContainer) return;

    let isPaused = false;
    let isUserScrolling = false;
    let scrollTimeout;

    const startAutoScroll = () => {
      if (isPaused || isUserScrolling) return;
      
      autoScrollRef.current = setInterval(() => {
        if (isPaused || isUserScrolling) return;
        
        if (cardsContainer.scrollLeft >= cardsContainer.scrollWidth - cardsContainer.clientWidth - 10) {
          // Reset to beginning when reaching the end
          cardsContainer.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          // Scroll to next card
          cardsContainer.scrollBy({
            left: 236, // Card width (220px) + gap (16px)
            behavior: 'smooth'
          });
        }
      }, 3500); // Scroll every 3.5 seconds
    };

    const stopAutoScroll = () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
    };

    const pauseAutoScroll = () => {
      isPaused = true;
      stopAutoScroll();
    };

    const resumeAutoScroll = () => {
      isPaused = false;
      startAutoScroll();
    };

    const handleUserScroll = () => {
      isUserScrolling = true;
      pauseAutoScroll();
      
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Resume auto-scroll after user stops scrolling
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
        resumeAutoScroll();
      }, 2000); // Wait 2 seconds after user stops scrolling
    };

    // Start auto-scroll
    startAutoScroll();

    // Event listeners
    const handleMouseEnter = () => pauseAutoScroll();
    const handleMouseLeave = () => resumeAutoScroll();
    const handleTouchStart = () => pauseAutoScroll();
    const handleTouchEnd = () => {
      setTimeout(() => resumeAutoScroll(), 1000);
    };

    cardsContainer.addEventListener('mouseenter', handleMouseEnter);
    cardsContainer.addEventListener('mouseleave', handleMouseLeave);
    cardsContainer.addEventListener('scroll', handleUserScroll);
    cardsContainer.addEventListener('touchstart', handleTouchStart);
    cardsContainer.addEventListener('touchend', handleTouchEnd);

    // Cleanup
    return () => {
      stopAutoScroll();
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      cardsContainer.removeEventListener('mouseenter', handleMouseEnter);
      cardsContainer.removeEventListener('mouseleave', handleMouseLeave);
      cardsContainer.removeEventListener('scroll', handleUserScroll);
      cardsContainer.removeEventListener('touchstart', handleTouchStart);
      cardsContainer.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="abha-page">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="time">11:42</span>
        </div>
        <div className="status-right">
          <div className="signal-bars">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <span className="wifi">📶</span>
          <span className="battery">30%</span>
          <Bell className="bell-icon" />
        </div>
      </div>

      {/* Header */}
      <div className="header">
        <div className="user-profile">
          <div className="avatar">
            <div className="avatar-inner"></div>
          </div>
          <div className="user-info">
            <span className="user-name">Hari</span>
            <ChevronDown className="dropdown-icon" />
          </div>
        </div>
        <Settings className="settings-icon" />
      </div>

      {/* Main ABHA Section */}
      <div className="abha-section">
        {/* Learn More Button */}
        <div className="learn-more-container">
          <div className="learn-more">
            <span>Learn more about ABHA</span>
            <Info className="info-icon" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="main-content-area">
          {/* Left Side - Text and Buttons */}
          <div className="content-left">
            <h1 className="main-title">
              <span className="title-line-1">Create your ABHA</span>
              {/* <span className="title-line-2">ABHA</span> */}
            </h1>
            <div className="button-group">
              <button className="create-abha-btn" onClick={() => onNavigate('login')}>
                Create ABHA
                
              </button>
              <button className="link-abha-btn">Link ABHA
                
              </button>
            </div>
          </div>

          {/* Right Side - Decorative Elements */}
          <div className="content-right">
            {/* Purple Rectangles with Plus Icons */}
            <div className="purple-rectangles">
              <div className="rectangle rectangle-1">
                {/* <Plus className="plus-icon" /> */}
              </div>
              <div className="rectangle rectangle-2">
                {/* <Plus className="plus-icon" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Health Avatar Section */}
      <div className="health-avatar-section">
        <div className="avatar-container">
          <img 
            src="/healthavtar.jpg" 
            alt="Health Avatar" 
            className="health-avatar-image"
          />
        </div>
      </div>

      {/* Know More About ABHA Section - Professional Redesign */}
      <div className="know-more-section">
        <div className="section-header">
          <h2 className="section-title">Know more about ABHA</h2>
          <p className="section-subtitle">Discover everything you need to know about your digital health identity</p>
        </div>
        
        <div className="cards-container" ref={cardsContainerRef}>
          {/* Card 1: What is ABHA ID */}
          <div className="info-card">
            <div className="card-icon">
              <div className="icon-circle">
                <div className="icon-symbol">🆔</div>
              </div>
            </div>
            <div className="card-content">
              <h3 className="card-title">What is ABHA ID?</h3>
              <p className="card-description">Your unique 14-digit digital health identity that connects all your health records</p>
              <div className="card-features">
                <span className="feature-tag">Unique Identity</span>
                <span className="feature-tag">14-digit Number</span>
                <span className="feature-tag">Digital Health</span>
              </div>
            </div>
            <div className="card-action">
              <button className="learn-more-btn">
                <span>Learn More</span>
                <div className="arrow-icon">→</div>
              </button>
            </div>
          </div>

          {/* Card 2: Create ABHA with Aadhaar */}
          <div className="info-card">
            <div className="card-icon">
              <div className="icon-circle">
                <div className="icon-symbol">📱</div>
              </div>
            </div>
            <div className="card-content">
              <h3 className="card-title">Create ABHA with Aadhaar</h3>
              <p className="card-description">Quick and secure ABHA creation using your existing Aadhaar number</p>
              <div className="card-features">
                <span className="feature-tag">Aadhaar Linked</span>
                <span className="feature-tag">Quick Setup</span>
                <span className="feature-tag">Secure Process</span>
              </div>
            </div>
            <div className="card-action">
              <button className="learn-more-btn">
                <span>Learn More</span>
                <div className="arrow-icon">→</div>
              </button>
            </div>
          </div>

          {/* Card 3: Phone Verification */}
          <div className="info-card">
            <div className="card-icon">
              <div className="icon-circle">
                <div className="icon-symbol">📞</div>
              </div>
            </div>
            <div className="card-content">
              <h3 className="card-title">Phone Verification</h3>
              <p className="card-description">Verify your mobile number to ensure secure access to your health records</p>
              <div className="card-features">
                <span className="feature-tag">OTP Verification</span>
                <span className="feature-tag">Mobile Linked</span>
                <span className="feature-tag">Secure Access</span>
              </div>
            </div>
            <div className="card-action">
              <button className="learn-more-btn">
                <span>Learn More</span>
                <div className="arrow-icon">→</div>
              </button>
            </div>
          </div>

          {/* Card 4: KYC Verification */}
          <div className="info-card">
            <div className="card-icon">
              <div className="icon-circle">
                <div className="icon-symbol">✅</div>
              </div>
            </div>
            <div className="card-content">
              <h3 className="card-title">KYC Verification</h3>
              <p className="card-description">Complete your Know Your Customer verification for enhanced security</p>
              <div className="card-features">
                <span className="feature-tag">Identity Verified</span>
                <span className="feature-tag">Enhanced Security</span>
                <span className="feature-tag">Full Access</span>
              </div>
            </div>
            <div className="card-action">
              <button className="learn-more-btn">
                <span>Learn More</span>
                <div className="arrow-icon">→</div>
              </button>
            </div>
          </div>
        </div>

        <div className="section-footer">
          <div className="footer-content">
            <div className="footer-icon">🔒</div>
            <div className="footer-text">
              <span className="footer-title">Secure & Private</span>
              <span className="footer-subtitle">Your health data is protected with bank-level security</span>
            </div>
          </div>
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

export default ABHAPage;
