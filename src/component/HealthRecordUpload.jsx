import React, { useState, useRef } from 'react';
import { 
  Upload, 
  X, 
  FileText, 
  Image, 
  File, 
  Calendar, 
  User, 
  Tag,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import './ABHACard.css';

const HealthRecordUpload = ({ onClose, onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [documentCategory, setDocumentCategory] = useState('');
  const [documentCategoryType, setDocumentCategoryType] = useState('');
  const [fileName, setFileName] = useState('');
  const [notes, setNotes] = useState('');
  const fileInputRef = useRef(null);

  const documentCategories = [
    { value: 'lab-report', label: 'Lab Report', icon: FileText },
    { value: 'prescription', label: 'Prescription', icon: FileText },
    { value: 'x-ray', label: 'X-Ray', icon: Image },
    { value: 'scan', label: 'Scan Report', icon: Image },
    { value: 'invoice', label: 'Medical Invoice', icon: File },
    { value: 'discharge-summary', label: 'Discharge Summary', icon: FileText },
    { value: 'vaccination', label: 'Vaccination Certificate', icon: FileText },
    { value: 'other', label: 'Other', icon: File }
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

  const allowedFileTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = [];
    const errors = [];

    files.forEach(file => {
      if (!allowedFileTypes.includes(file.type)) {
        errors.push(`${file.name}: Unsupported file type`);
        return;
      }
      if (file.size > maxFileSize) {
        errors.push(`${file.name}: File too large (max 10MB)`);
        return;
      }
      validFiles.push(file);
    });

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    if (validFiles.length > 0) {
      const newFiles = validFiles.map(file => ({
        id: Date.now() + Math.random(),
        file,
        name: fileName.trim(), // Use the required custom file name
        originalName: file.name, // Keep track of original file name
        size: file.size,
        type: file.type,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
        category: documentCategory || 'other',
        categoryType: documentCategoryType || '',
        date: new Date().toISOString().split('T')[0],
        notes: notes
      }));
      
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (fileId) => {
    setSelectedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove && fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  const updateFileDetails = (fileId, field, value) => {
    setSelectedFiles(prev => 
      prev.map(file => 
        file.id === fileId ? { ...file, [field]: value } : file
      )
    );
  };


  const simulateUpload = async (file) => {
    return new Promise((resolve) => {
      const duration = Math.random() * 2000 + 1000; // 1-3 seconds
      const interval = 100;
      let progress = 0;
      
      const timer = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(timer);
          // Return the file object directly, not wrapped in success object
          resolve(file);
        }
        setUploadProgress(prev => ({ ...prev, [file.id]: progress }));
      }, interval);
    });
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select at least one file to upload');
      return;
    }

    if (!fileName.trim()) {
      alert('Please enter a file name');
      return;
    }

    setIsUploading(true);
    setUploadStatus('uploading');

    try {
      const uploadPromises = selectedFiles.map(file => simulateUpload(file));
      const results = await Promise.all(uploadPromises);
      
      setUploadStatus('success');
      
      // Simulate API call delay
      setTimeout(() => {
        if (onUploadSuccess) {
          // Pass the uploaded files directly to the success callback
          onUploadSuccess(results);
        }
        
        // Reset form
        setSelectedFiles([]);
        setDocumentCategory('');
        setDocumentCategoryType('');
        setFileName('');
        setNotes('');
        setUploadProgress({});
        
        onClose();
      }, 1500);
      
    } catch (error) {
      setUploadStatus('error');
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    // Clean up object URLs
    selectedFiles.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    onClose();
  };

  return (
    <div className="upload-modal-overlay">
      <div className="upload-modal">
        <div className="upload-modal-header">
          <h2>Upload Health Records</h2>
          <button className="close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className="upload-modal-content">
          {/* Document Details Form */}
          <div className="document-details-form">
            <h3>Document Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select 
                  value={documentCategory} 
                  onChange={(e) => {
                    setDocumentCategory(e.target.value);
                    setDocumentCategoryType(''); // Reset category type when category changes
                  }}
                  className="form-select"
                >
                  <option value="">Select Category</option>
                  {documentCategories.map(category => {
                    const IconComponent = category.icon;
                    return (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    );
                  })}
                </select>
              </div>
              
              {documentCategory && categoryTypes[documentCategory] && (
                <div className="form-group">
                  <label>Category Type</label>
                  <select 
                    value={documentCategoryType} 
                    onChange={(e) => setDocumentCategoryType(e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select Type</option>
                    {categoryTypes[documentCategory].map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label>File Name <span className="required-asterisk">*</span></label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter file name"
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes..."
                className="form-textarea"
                rows="1"
              />
            </div>
          </div>

          {/* File Upload Area */}
          <div className="file-upload-area">
            <div 
              className="upload-dropzone"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="upload-icon-large" />
              <p>Click to select files or drag and drop</p>
              <p className="upload-hint">Supports: PDF, DOC, DOCX, JPG, PNG, GIF (Max 10MB each)</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </div>

          {/* Selected Files List */}
          {selectedFiles.length > 0 && (
            <div className="selected-files">
              <h3>Selected Files ({selectedFiles.length})</h3>
              <div className="files-list">
                {selectedFiles.map(file => {
                  const progress = uploadProgress[file.id] || 0;
                  
                  return (
                    <div key={file.id} className="file-item">
                      <div className="file-preview">
                        {file.preview && (
                          <img src={file.preview} alt="Preview" className="file-preview-image" />
                        )}
                      </div>
                      <div className="file-details">
                        <div className="file-name">{file.name}</div>
                        <div className="file-meta">
                          <span className="file-type">{file.type.split('/')[1].toUpperCase()}</span>
                        </div>
                        {isUploading && (
                          <div className="upload-progress">
                            <div className="progress-bar">
                              <div 
                                className="progress-fill" 
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="progress-text">{Math.round(progress)}%</span>
                          </div>
                        )}
                      </div>
                      <button 
                        className="remove-file-btn"
                        onClick={() => removeFile(file.id)}
                        disabled={isUploading}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Upload Status */}
          {uploadStatus && (
            <div className={`upload-status ${uploadStatus}`}>
              {uploadStatus === 'uploading' && (
                <>
                  <Loader2 className="status-icon spinning" />
                  <span>Uploading files...</span>
                </>
              )}
              {uploadStatus === 'success' && (
                <>
                  <CheckCircle className="status-icon" />
                  <span>Files uploaded successfully!</span>
                </>
              )}
              {uploadStatus === 'error' && (
                <>
                  <AlertCircle className="status-icon" />
                  <span>Upload failed. Please try again.</span>
                </>
              )}
            </div>
          )}
        </div>

        <div className="upload-modal-footer">
          <button 
            className="cancel-btn" 
            onClick={handleClose}
            disabled={isUploading}
          >
            Cancel
          </button>
          <button 
            className="upload-btn" 
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || isUploading}
          >
            {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} File${selectedFiles.length !== 1 ? 's' : ''}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthRecordUpload;
