import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  Download,
  Calendar,
  RotateCcw
} from 'lucide-react';
import './ABHACard.css';

const UploadedRecordsSection = ({ uploadedRecords, onDeleteRecord, onEditRecord, dateFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryType, setSelectedCategoryType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [expandedNotes, setExpandedNotes] = useState(new Set());
  const datePickerRef = useRef(null);
  const hiddenDateInputRef = useRef(null);

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Utility function to remove file extension
  const removeFileExtension = (filename) => {
    if (!filename) return '';
    return filename.replace(/\.[^/.]+$/, "");
  };

  // Handle calendar icon click
  const handleCalendarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Calendar icon clicked!');
    
    if (hiddenDateInputRef.current) {
      const input = hiddenDateInputRef.current;
      
      // Make input temporarily visible and clickable
      const originalDisplay = input.style.display;
      const originalPosition = input.style.position;
      const originalOpacity = input.style.opacity;
      
      // Temporarily show the input
      input.style.position = 'absolute';
      input.style.left = '0';
      input.style.top = '0';
      input.style.opacity = '0.01';
      input.style.pointerEvents = 'auto';
      input.style.zIndex = '9999';
      
      // Focus and try to trigger date picker
      input.focus();
      
      // Try showPicker first
      if (input.showPicker && typeof input.showPicker === 'function') {
        try {
          input.showPicker();
        } catch (error) {
          // Fallback to click
          input.click();
        }
      } else {
        // Fallback to click for older browsers
        input.click();
      }
      
      // Restore original styles after a delay
      setTimeout(() => {
        input.style.display = originalDisplay;
        input.style.position = originalPosition;
        input.style.opacity = originalOpacity;
        input.style.pointerEvents = 'none';
        input.style.zIndex = '';
      }, 200);
    }
  };

  // Handle date clear
  const handleDateClear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedDate('');
  };

  // Handle reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('');
    setSelectedCategoryType('');
    setSelectedDate('');
    setActiveFilter(null);
    setShowDatePicker(false);
  };

  // Check if any filters are active
  const hasActiveFilters = selectedCategory || selectedCategoryType || selectedDate;
  
  // Debug logging
  console.log('Filter states:', { selectedCategory, selectedCategoryType, selectedDate, hasActiveFilters });

  // Handle note expansion toggle
  const toggleNoteExpansion = (recordId) => {
    const newExpandedNotes = new Set(expandedNotes);
    if (newExpandedNotes.has(recordId)) {
      newExpandedNotes.delete(recordId);
    } else {
      newExpandedNotes.add(recordId);
    }
    setExpandedNotes(newExpandedNotes);
  };

  // Check if should show read more (more than 3 words)
  const shouldShowReadMore = (note) => {
    if (!note) return false;
    const words = note.trim().split(/\s+/);
    return words.length > 3;
  };

  // Get truncated note text (first 3 words)
  const getTruncatedNoteWords = (note) => {
    if (!note) return '';
    
    const words = note.trim().split(/\s+/);
    
    // If more than 3 words, take first 3 words
    if (words.length > 3) {
      return words.slice(0, 3).join(' ');
    }
    
    return note;
  };

  const categories = [
    { value: 'lab-report', label: 'Lab Report' },
    { value: 'prescription', label: 'Prescription' },
    { value: 'x-ray', label: 'X-Ray' },
    { value: 'scan', label: 'Scan Report' },
    { value: 'invoice', label: 'Medical Invoice' },
    { value: 'discharge-summary', label: 'Discharge Summary' },
    { value: 'vaccination', label: 'Vaccination Certificate' },
    { value: 'other', label: 'Other' }
  ];

  const categoryTypes = {
    'lab-report': [
      { value: 'urine-report', label: 'Urine Report' },
      { value: 'cardiac-report', label: 'Cardiac Report' },
      { value: 'blood-report', label: 'Blood Report' },
      { value: 'liver-function', label: 'Liver Function Test' },
      { value: 'kidney-function', label: 'Kidney Function Test' },
      { value: 'thyroid-report', label: 'Thyroid Report' },
      { value: 'diabetes-report', label: 'Diabetes Report' },
      { value: 'lipid-profile', label: 'Lipid Profile' },
      { value: 'vitamin-test', label: 'Vitamin Test' },
      { value: 'hormone-test', label: 'Hormone Test' },
      { value: 'allergy-test', label: 'Allergy Test' },
      { value: 'other-lab', label: 'Other Lab Test' }
    ],
    'prescription': [
      { value: 'general-medicine', label: 'General Medicine' },
      { value: 'cardiology', label: 'Cardiology' },
      { value: 'neurology', label: 'Neurology' },
      { value: 'orthopedics', label: 'Orthopedics' },
      { value: 'dermatology', label: 'Dermatology' },
      { value: 'pediatrics', label: 'Pediatrics' },
      { value: 'gynecology', label: 'Gynecology' },
      { value: 'psychiatry', label: 'Psychiatry' },
      { value: 'oncology', label: 'Oncology' },
      { value: 'emergency', label: 'Emergency Medicine' },
      { value: 'other-prescription', label: 'Other Prescription' }
    ],
    'x-ray': [
      { value: 'chest-xray', label: 'Chest X-Ray' },
      { value: 'bone-xray', label: 'Bone X-Ray' },
      { value: 'skull-xray', label: 'Skull X-Ray' },
      { value: 'spine-xray', label: 'Spine X-Ray' },
      { value: 'abdomen-xray', label: 'Abdomen X-Ray' },
      { value: 'pelvis-xray', label: 'Pelvis X-Ray' },
      { value: 'limb-xray', label: 'Limb X-Ray' },
      { value: 'other-xray', label: 'Other X-Ray' }
    ],
    'scan': [
      { value: 'ct-scan', label: 'CT Scan' },
      { value: 'mri-scan', label: 'MRI Scan' },
      { value: 'ultrasound', label: 'Ultrasound' },
      { value: 'pet-scan', label: 'PET Scan' },
      { value: 'bone-scan', label: 'Bone Scan' },
      { value: 'thyroid-scan', label: 'Thyroid Scan' },
      { value: 'heart-scan', label: 'Heart Scan' },
      { value: 'brain-scan', label: 'Brain Scan' },
      { value: 'other-scan', label: 'Other Scan' }
    ],
    'invoice': [
      { value: 'consultation-fee', label: 'Consultation Fee' },
      { value: 'procedure-fee', label: 'Procedure Fee' },
      { value: 'medication-cost', label: 'Medication Cost' },
      { value: 'lab-test-cost', label: 'Lab Test Cost' },
      { value: 'scan-cost', label: 'Scan Cost' },
      { value: 'surgery-cost', label: 'Surgery Cost' },
      { value: 'hospital-stay', label: 'Hospital Stay' },
      { value: 'other-cost', label: 'Other Cost' }
    ],
    'discharge-summary': [
      { value: 'surgery-discharge', label: 'Surgery Discharge' },
      { value: 'emergency-discharge', label: 'Emergency Discharge' },
      { value: 'routine-discharge', label: 'Routine Discharge' },
      { value: 'icu-discharge', label: 'ICU Discharge' },
      { value: 'maternity-discharge', label: 'Maternity Discharge' },
      { value: 'pediatric-discharge', label: 'Pediatric Discharge' },
      { value: 'other-discharge', label: 'Other Discharge' }
    ],
    'vaccination': [
      { value: 'covid-vaccine', label: 'COVID-19 Vaccine' },
      { value: 'flu-vaccine', label: 'Flu Vaccine' },
      { value: 'hepatitis-vaccine', label: 'Hepatitis Vaccine' },
      { value: 'mmr-vaccine', label: 'MMR Vaccine' },
      { value: 'polio-vaccine', label: 'Polio Vaccine' },
      { value: 'tetanus-vaccine', label: 'Tetanus Vaccine' },
      { value: 'travel-vaccine', label: 'Travel Vaccine' },
      { value: 'childhood-vaccine', label: 'Childhood Vaccine' },
      { value: 'other-vaccine', label: 'Other Vaccine' }
    ],
    'other': [
      { value: 'medical-certificate', label: 'Medical Certificate' },
      { value: 'fitness-certificate', label: 'Fitness Certificate' },
      { value: 'insurance-document', label: 'Insurance Document' },
      { value: 'referral-letter', label: 'Referral Letter' },
      { value: 'medical-history', label: 'Medical History' },
      { value: 'other-document', label: 'Other Document' }
    ]
  };


  const formatCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryLabel = (categoryValue) => {
    const category = categories.find(cat => cat.value === categoryValue);
    return category ? category.label : 'Other';
  };

  const getCategoryColor = (category, categoryType) => {
    // Return neutral gray color for all category types
    return '#6b7280'; // Gray color for all badges
  };

  // Filter records
  const filteredRecords = uploadedRecords
    .filter(record => {
      const matchesCategory = !selectedCategory || record.category === selectedCategory;
      const matchesCategoryType = !selectedCategoryType || record.categoryType === selectedCategoryType;
      const matchesDate = !selectedDate || record.date === selectedDate;
      
      return matchesCategory && matchesCategoryType && matchesDate;
    });

  const handleDownload = (record) => {
    // Create a download link for the file
    const link = document.createElement('a');
    link.href = record.preview || URL.createObjectURL(record.file);
    link.download = record.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (record) => {
    // Open file in new tab for viewing
    if (record.preview) {
      window.open(record.preview, '_blank');
    } else {
      const url = URL.createObjectURL(record.file);
      window.open(url, '_blank');
    }
  };

  const handleDelete = (recordId) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      onDeleteRecord(recordId);
    }
  };

  const handleEdit = (record) => {
    onEditRecord(record);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedCategoryType(''); // Reset category type when category changes
  };

  const handleCategoryTypeChange = (categoryType) => {
    setSelectedCategoryType(categoryType);
  };

  const getCategoryTypeLabel = (categoryTypeValue, recordCategory) => {
    if (!recordCategory || !categoryTypes[recordCategory]) return '';
    const categoryType = categoryTypes[recordCategory].find(type => type.value === categoryTypeValue);
    return categoryType ? categoryType.label : '';
  };

  if (uploadedRecords.length === 0) {
    return (
      <div className="uploaded-records-section">
        <div className="section-header">
          <h2>Your Health Records</h2>
        </div>
        <div className="empty-state">
          <FileText className="empty-icon" />
          <h3>No records uploaded yet</h3>
          <p>Upload your health documents to keep them organized and easily accessible.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="uploaded-records-section">
      <div className="section-header">
        <h2>Your Health Records ({uploadedRecords.length})</h2>
        <div className="header-actions">
            <div className="filters-container">
              <div className="modern-filters">
                {/* Category Filter */}
              <div className="filter-pill">
                <div 
                  className={`filter-radio ${activeFilter === 'category' ? 'active' : ''}`}
                  onClick={() => setActiveFilter(activeFilter === 'category' ? null : 'category')}
                >
                  <div className="radio-circle"></div>
                </div>
                <span className="filter-title">category</span>
                <div className="filter-dropdown-container">
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="filter-dropdown"
                  >
                    <option value="">All</option>
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Type Filter */}
              <div className="filter-pill">
                <div 
                  className={`filter-radio ${activeFilter === 'type' ? 'active' : ''}`}
                  onClick={() => setActiveFilter(activeFilter === 'type' ? null : 'type')}
                >
                  <div className="radio-circle"></div>
                </div>
                <span className="filter-title">type</span>
                <div className="filter-dropdown-container">
                  <select 
                    value={selectedCategoryType} 
                    onChange={(e) => handleCategoryTypeChange(e.target.value)}
                    className="filter-dropdown"
                    disabled={!selectedCategory}
                  >
                    <option value="">All</option>
                    {selectedCategory && categoryTypes[selectedCategory] && categoryTypes[selectedCategory].map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date Filter */}
              <div className="filter-pill" ref={datePickerRef}>
                <div 
                  className={`filter-radio ${activeFilter === 'date' ? 'active' : ''}`}
                  onClick={() => setActiveFilter(activeFilter === 'date' ? null : 'date')}
                >
                  <div className="radio-circle"></div>
                </div>
                <span className="filter-title">date</span>
                <div className="filter-dropdown-container">
                  <div 
                    className={`calendar-icon-wrapper ${selectedDate ? 'has-date' : ''}`}
                    onClick={handleCalendarClick}
                    title={selectedDate ? `Selected: ${selectedDate}` : 'Select date'}
                  >
                    <Calendar size={16} className="calendar-icon" />
                    {selectedDate && <div className="date-dot"></div>}
                  </div>
                  {selectedDate && (
                    <button
                      className="clear-date-button"
                      onClick={handleDateClear}
                      title="Clear date"
                      type="button"
                    >
                      ×
                    </button>
                  )}
                  <input
                    ref={hiddenDateInputRef}
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                    }}
                    className="hidden-date-input"
                    max={new Date().toISOString().split('T')[0]}
                    style={{ 
                      position: 'absolute', 
                      left: '-9999px', 
                      opacity: 0, 
                      pointerEvents: 'none',
                      width: '1px',
                      height: '1px',
                      zIndex: -1
                    }}
                  />
                </div>
               </div>
               </div>
              
              {/* Reset Button - As Fourth Filter Element */}
              <div className="filter-pill reset-pill">
                <button 
                  className={`reset-filters-btn ${hasActiveFilters ? 'active' : 'inactive'}`}
                  onClick={handleResetFilters}
                  title={hasActiveFilters ? "Reset all filters" : "No active filters"}
                >
                  <RotateCcw size={12} className="reset-icon" />
                  <span className="reset-text">reset</span>
                </button>
              </div>
            </div>
        </div>
      </div>


      <div className="health-records-grid">
        {filteredRecords.map((record, index) => {
          if (!record || !record.id) {
            console.warn('Invalid record found:', record);
            return null;
          }
          
          const categoryColor = getCategoryColor(record.category || 'other', record.categoryType);

          return (
            <div key={record.id} className="health-record-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="header-info">
                    <div className="header-left">
                      <span className="serial-number">#{String(index + 1).padStart(2, '0')}</span>
                      {record.name && (
                        <div className="header-file-name">{removeFileExtension(record.name)}</div>
                      )}
                    </div>
                    <span className="record-date">{formatCurrentDate()}</span>
                  </div>
                </div>
              </div>
              
              <div className="card-content">
                <div className="info-row side-by-side">
                  <div className="info-item">
                    <span className="category-name-badge">
                      {getCategoryLabel(record.category)}
                    </span>
                  </div>
                  <div className="info-item">
                    <span 
                      className="category-type-badge"
                      style={{ '--badge-color': categoryColor }}
                    >
                      {record.categoryType && record.categoryType.trim() !== '' ? getCategoryTypeLabel(record.categoryType, record.category) : 'Not specified'}
                    </span>
                  </div>
                </div>
                
                <div className="info-row">
                  <div className="info-item notes-item-inline">
                    <span className="info-label">Notes:</span>
                    <div className="notes-content-inline">
                      <span className="notes-text-truncated">
                        {record.notes ? getTruncatedNoteWords(record.notes) : ''}
                      </span>
                      {record.notes && shouldShowReadMore(record.notes) && (
                        <button 
                          className="read-more-btn-inline"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleNoteExpansion(record.id);
                          }}
                        >
                          read more
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Floating notes display above card */}
                {expandedNotes.has(record.id) && (
                  <div className="notes-floating-container">
                    <div className="notes-floating-box">
                      <div className="notes-floating-header">
                        <span className="notes-floating-title">📝 Notes</span>
                        <button 
                          className="notes-floating-close"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleNoteExpansion(record.id);
                          }}
                        >
                          ×
                        </button>
                      </div>
                      <div className="notes-floating-content">
                        {record.notes}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="card-actions">
                <button 
                  className="action-btn view-btn"
                  onClick={() => handleView(record)}
                >
                  <FileText size={16} />
                  <span>View</span>
                </button>
                <button 
                  className="action-btn download-btn"
                  onClick={() => handleDownload(record)}
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRecords.length === 0 && uploadedRecords.length > 0 && (
        <div className="no-results">
          <FileText className="no-results-icon" />
          <h3>No records found</h3>
          <p>Try adjusting your filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default UploadedRecordsSection;
