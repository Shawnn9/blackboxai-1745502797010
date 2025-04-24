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
  }, []);

  const handleFileInput = useCallback((e) => {
    const file = e.target.files[0];
    if (file && (file.type.startsWith('audio/') || file.type.startsWith('video/'))) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <div 
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => document.getElementById('fileInput').click()}
    >
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept="audio/*,video/*"
        onChange={handleFileInput}
      />
      <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
      <p className="text-gray-600">
        Drag and drop your audio or video file here, or click to browse
      </p>
    </div>
  );
}

export default FileInput;
