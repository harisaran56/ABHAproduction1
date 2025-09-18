import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Calendar, Clock, Filter, X } from 'lucide-react';
import './ABHACard.css';

const ViewAllButton = ({ onDateRangeSelect, uploadedRecords = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const dropdownRef = useRef(null);

  const dateRanges = [
    { value: 'all', label: 'All Records', count: uploadedRecords.length },
    { value: 'today', label: 'Today', count: getRecordsCount('today') },
    { value: 'week', label: 'This Week', count: getRecordsCount('week') },
    { value: 'month', label: 'This Month', count: getRecordsCount('month') },
    { value: 'year', label: 'This Year', count: getRecordsCount('year') },
    { value: 'custom', label: 'Custom Range', count: 0 }
  ];

  function getRecordsCount(range) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return uploadedRecords.filter(record => {
      const recordDate = new Date(record.date);
      
      switch (range) {
        case 'today':
          return recordDate >= today;
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          return recordDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          return recordDate >= monthAgo;
        case 'year':
          const yearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
          return recordDate >= yearAgo;
        default:
          return true;
      }
    }).length;
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowCustomDatePicker(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRangeSelect = (range) => {
    setSelectedRange(range);
    
    if (range === 'custom') {
      setShowCustomDatePicker(true);
    } else {
      setShowCustomDatePicker(false);
      setIsOpen(false);
      
      // Calculate date range
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      let startDate, endDate;
      
      switch (range) {
        case 'today':
          startDate = today;
          endDate = new Date(today.getTime() + 24 * 60 * 60 * 1000);
          break;
        case 'week':
          startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          endDate = new Date(today.getTime() + 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          endDate = new Date(today.getTime() + 24 * 60 * 60 * 1000);
          break;
        case 'year':
          startDate = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
          endDate = new Date(today.getTime() + 24 * 60 * 60 * 1000);
          break;
        case 'all':
        default:
          startDate = null;
          endDate = null;
          break;
      }
      
      onDateRangeSelect({ startDate, endDate, range });
    }
  };

  const handleCustomDateSubmit = () => {
    if (customStartDate && customEndDate) {
      const startDate = new Date(customStartDate);
      const endDate = new Date(customEndDate);
      
      if (startDate <= endDate) {
        onDateRangeSelect({ startDate, endDate, range: 'custom' });
        setIsOpen(false);
        setShowCustomDatePicker(false);
      } else {
        alert('End date must be after start date');
      }
    } else {
      alert('Please select both start and end dates');
    }
  };

  const getSelectedRangeLabel = () => {
    const range = dateRanges.find(r => r.value === selectedRange);
    return range ? range.label : 'All Records';
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="view-all-container">
      <div className="view-all-button" ref={dropdownRef}>
        <button 
          className="view-all-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="btn-content">
            <span className="btn-text">View All</span>
            <ChevronDown className={`btn-icon ${isOpen ? 'rotated' : ''}`} />
          </div>
        </button>

        {isOpen && (
          <div className="view-all-dropdown">
            <div className="dropdown-header">
              <h3>Filter Records</h3>
              <button 
                className="close-btn"
                onClick={() => setIsOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="date-ranges">
              {dateRanges.map(range => (
                <button
                  key={range.value}
                  className={`range-btn ${selectedRange === range.value ? 'active' : ''}`}
                  onClick={() => handleRangeSelect(range.value)}
                >
                  <div className="range-content">
                    <span className="range-label">{range.label}</span>
                    {range.value !== 'custom' && (
                      <span className="range-count">({range.count})</span>
                    )}
                  </div>
                  {range.value === 'custom' && (
                    <Calendar className="calendar-icon" />
                  )}
                </button>
              ))}
            </div>

            {showCustomDatePicker && (
              <div className="custom-date-picker">
                <div className="date-picker-header">
                  <Calendar className="picker-icon" />
                  <span>Select Custom Range</span>
                </div>
                
                <div className="date-inputs">
                  <div className="date-input-group">
                    <label>From Date</label>
                    <input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="date-input"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="date-input-group">
                    <label>To Date</label>
                    <input
                      type="date"
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="date-input"
                      max={new Date().toISOString().split('T')[0]}
                      min={customStartDate}
                    />
                  </div>
                </div>

                <div className="date-picker-actions">
                  <button 
                    className="cancel-btn"
                    onClick={() => setShowCustomDatePicker(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="apply-btn"
                    onClick={handleCustomDateSubmit}
                    disabled={!customStartDate || !customEndDate}
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            )}

            {selectedRange !== 'all' && !showCustomDatePicker && (
              <div className="selected-range-info">
                <Clock className="info-icon" />
                <span>
                  Showing records from: {getSelectedRangeLabel()}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllButton;
