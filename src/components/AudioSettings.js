import React, { useState, useEffect } from 'react';

function AudioSettings({ onSettingsChange, onSave, estimatedSize }) {
  const [sampleRate, setSampleRate] = useState(44100);
  const [bitrate, setBitrate] = useState(128);
  const [speedFactor, setSpeedFactor] = useState(1);

  useEffect(() => {
    onSettingsChange({ sampleRate, bitrate, speedFactor });
  }, [sampleRate, bitrate, speedFactor, onSettingsChange]);

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="settings-form">
      <div className="form-group">
        <label htmlFor="sampleRate">
          <i className="fas fa-wave-square"></i> Sample Rate (Hz)
        </label>
        <div className="input-wrapper">
          <input
            id="sampleRate"
            type="number"
            min="8000"
            max="48000"
            step="100"
            value={sampleRate}
            onChange={(e) => setSampleRate(parseInt(e.target.value) || 44100)}
          />
          <div className="input-buttons">
            <button 
              className="preset-btn" 
              onClick={() => setSampleRate(44100)}
              title="CD Quality"
            >
              44.1k
            </button>
            <button 
              className="preset-btn" 
              onClick={() => setSampleRate(48000)}
              title="Studio Quality"
            >
              48k
            </button>
          </div>
        </div>
        <span className="input-hint">Common values: 44100 Hz (CD), 48000 Hz (Studio)</span>
      </div>

      <div className="form-group">
        <label htmlFor="bitrate">
          <i className="fas fa-tachometer-alt"></i> Bitrate (kbps)
        </label>
        <div className="input-wrapper">
          <input
            id="bitrate"
            type="number"
            min="45"
            max="320"
            value={bitrate}
            onChange={(e) => setBitrate(parseInt(e.target.value) || 128)}
          />
          <div className="input-buttons">
            <button 
              className="preset-btn" 
              onClick={() => setBitrate(128)}
              title="Standard Quality"
            >
              128k
            </button>
            <button 
              className="preset-btn" 
              onClick={() => setBitrate(320)}
              title="High Quality"
            >
              320k
            </button>
          </div>
        </div>
        <span className="input-hint">Higher values = better quality, larger file size</span>
      </div>

      <div className="form-group">
        <label htmlFor="speedFactor">
          <i className="fas fa-forward"></i> Speed Factor
        </label>
        <div className="input-wrapper">
          <input
            id="speedFactor"
            type="number"
            min="0.1"
            max="4"
            step="0.1"
            value={speedFactor}
            onChange={(e) => setSpeedFactor(parseFloat(e.target.value) || 1)}
          />
          <div className="input-buttons">
            <button 
              className="preset-btn" 
              onClick={() => setSpeedFactor(0.5)}
              title="Half Speed"
            >
              0.5x
            </button>
            <button 
              className="preset-btn" 
              onClick={() => setSpeedFactor(2)}
              title="Double Speed"
            >
              2x
            </button>
          </div>
        </div>
        <span className="input-hint">1 = normal speed, {'<'}1 = slower, {'>'}1 = faster</span>
      </div>

      <div className="estimated-size">
        <i className="fas fa-hdd"></i>
        <span>Estimated Size: {formatSize(estimatedSize)}</span>
      </div>

      <button onClick={onSave} className="save-button">
        <i className="fas fa-save"></i> Save Settings
      </button>

      <style jsx>{`
        .settings-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #2d3748;
        }

        .form-group label i {
          color: #4299e1;
        }

        .input-wrapper {
          display: flex;
          gap: 0.5rem;
        }

        input {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: all 0.2s;
        }

        input:focus {
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
          outline: none;
        }

        .input-buttons {
          display: flex;
          gap: 0.25rem;
        }

        .preset-btn {
          padding: 0.5rem;
          background: #edf2f7;
          border: none;
          border-radius: 0.375rem;
          color: #4a5568;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .preset-btn:hover {
          background: #e2e8f0;
          color: #2d3748;
        }

        .input-hint {
          font-size: 0.875rem;
          color: #718096;
        }

        .estimated-size {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: #edf2f7;
          border-radius: 0.5rem;
          font-weight: 500;
        }

        .estimated-size i {
          color: #4299e1;
        }

        .save-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #4299e1;
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .save-button:hover {
          background: #3182ce;
          transform: translateY(-1px);
        }

        .save-button:active {
          transform: translateY(0);
        }

        @media (max-width: 640px) {
          .input-wrapper {
            flex-direction: column;
          }

          .input-buttons {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

export default AudioSettings;
