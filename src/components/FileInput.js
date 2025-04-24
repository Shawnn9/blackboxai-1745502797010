import React, { useCallback } from 'react';

function FileInput({ onFileSelect }) {
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith('audio/') || file.type.startsWith('video/'))) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
  }, []);

  const handleFileInput = useCallback((e) => {
    const file = e.target.files[0];
    if (file && (file.type.startsWith('audio/') || file.type.startsWith('video/'))) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <div 
      className="drop-zone"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => document.getElementById('fileInput').click()}
    >
      <div className="drop-zone-content">
        <i className="fas fa-cloud-upload-alt"></i>
        <h3>Drop your media file here</h3>
        <p>or click to browse</p>
        <span className="supported-formats">Supports audio and video files</span>
      </div>
      <input
        type="file"
        id="fileInput"
        className="hidden-input"
        accept="audio/*,video/*"
        onChange={handleFileInput}
      />
      <style jsx>{`
        .drop-zone {
          border: 3px dashed #cbd5e0;
          border-radius: 1rem;
          padding: 3rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: linear-gradient(to bottom, #ffffff, #f7fafc);
        }

        .drop-zone:hover, .drop-zone.drag-over {
          border-color: #4299e1;
          background: linear-gradient(to bottom, #ebf8ff, #e6fffa);
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(66, 153, 225, 0.1);
        }

        .drop-zone-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .drop-zone i {
          font-size: 4rem;
          color: #4299e1;
          margin-bottom: 1rem;
        }

        .drop-zone h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0;
        }

        .drop-zone p {
          font-size: 1.1rem;
          color: #718096;
          margin: 0;
        }

        .supported-formats {
          font-size: 0.875rem;
          color: #a0aec0;
          margin-top: 1rem;
        }

        .hidden-input {
          display: none;
        }

        @media (max-width: 640px) {
          .drop-zone {
            padding: 2rem 1rem;
          }

          .drop-zone i {
            font-size: 3rem;
          }

          .drop-zone h3 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}

export default FileInput;
