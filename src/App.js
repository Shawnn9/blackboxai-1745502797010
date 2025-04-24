import React, { useState, useRef } from 'react';
import VideoSettings from './components/VideoSettings';
import AudioSettings from './components/AudioSettings';
import FileInput from './components/FileInput';
import History from './components/History';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [history, setHistory] = useState([]);
  const [estimatedSize, setEstimatedSize] = useState(0);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setFileType(file.type.startsWith('video/') ? 'video' : 'audio');
  };

  const handleSettingsChange = (settings) => {
    // Calculate estimated size based on settings
    let newSize = selectedFile?.size || 0;
    
    if (fileType === 'video') {
      newSize *= (settings.scale / 100);
      newSize *= (settings.frameRate / 30);
      newSize *= (1 / settings.speedFactor);
      if (settings.removeAudio) newSize *= 0.9;
      newSize *= (settings.crf / 23); // 23 is default CRF
    } else {
      newSize *= (settings.sampleRate / 44100);
      newSize *= (settings.bitrate / 320);
      newSize *= (1 / settings.speedFactor);
    }

    setEstimatedSize(Math.round(newSize));
  };

  const handleSave = (settings) => {
    const historyEntry = {
      id: Date.now(),
      filename: selectedFile?.name,
      type: fileType,
      settings,
      timestamp: new Date().toLocaleString()
    };
    setHistory([historyEntry, ...history]);
  };

  const handleHistoryDelete = (id) => {
    setHistory(history.filter(entry => entry.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Media Optimizer</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <FileInput onFileSelect={handleFileSelect} />
        </div>

        {selectedFile && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {fileType === 'video' ? (
                <VideoSettings 
                  onSettingsChange={handleSettingsChange}
                  onSave={handleSave}
                  estimatedSize={estimatedSize}
                />
              ) : (
                <AudioSettings 
                  onSettingsChange={handleSettingsChange}
                  onSave={handleSave}
                  estimatedSize={estimatedSize}
                />
              )}
            </div>
            <div className="md:col-span-1">
              <History 
                history={history}
                onDelete={handleHistoryDelete}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
