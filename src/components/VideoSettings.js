import React, { useState, useEffect } from 'react';

function VideoSettings({ onSettingsChange, onSave, estimatedSize }) {
  const [speedFactor, setSpeedFactor] = useState(1);
  const [crf, setCrf] = useState(23);
  const [frameRate, setFrameRate] = useState(30);
  const [scale, setScale] = useState(100);
  const [removeAudio, setRemoveAudio] = useState(false);

  useEffect(() => {
    onSettingsChange({ speedFactor, crf, frameRate, scale, removeAudio });
  }, [speedFactor, crf, frameRate, scale, removeAudio, onSettingsChange]);

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
        <label htmlFor="speedFactor">
          <i className="fas fa-tachometer-alt"></i> Speed Factor
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

      <div className="form-group">
        <label htmlFor="crf">
          <i className="fas fa-compress-arrows-alt"></i> CRF (Quality)
        </label>
        <div className="input-wrapper">
          <input
            id="crf"
            type="number"
            min="0"
            max="51"
            value={crf}
            onChange={(e) => setCrf(parseInt(e.target.value) || 23)}
          />
          <div className="input-buttons">
            <button 
              className="preset-btn" 
              onClick={() => setCrf(18)}
              title="High Quality"
            >
              High
            </button>
            <button 
              className="preset-btn" 
              onClick={() => setCrf(28)}
              title="Low Quality"
            >
              Low
            </button>
          </div>
        </div>
        <span className="input-hint">0 = lossless, 51 = worst quality (23 is default)</span>
      </div>

      <div className="form-group">
        <label htmlFor="frameRate">
          <i className="fas fa-film"></i> Frame Rate (FPS)
        </label>
        <div className="input-wrapper">
          <input
            id="frameRate"
            type="number"
            min="1"
            max="120"
            value={frameRate}
            onChange={(e) => setFrameRate(parseInt(e.target.value) || 30)}
          />
          <div className="input-buttons">
            <button 
              className="preset-btn" 
              onClick={() => setFrameRate(24)}
              title="Cinema Standard"
            >
              24fps
            </button>
            <button 
              className="preset-btn" 
              onClick={() => setFrameRate(60)}
              title="Smooth Motion"
            >
              60fps
            </button>
          </div>
        </div>
        <span className="input-hint">Common values: 24 (cinema), 30 (standard), 60 (smooth)</span>
      </div>

      <div className="form-group">
        <label htmlFor="scale">
          <i className="fas fa-expand-arrows-alt"></i> Scale (%)
        </label>
        <div className="input-wrapper">
          <input
            id="scale"
            type="number"
            min="1"
            max="100"
            value={scale}
            onChange={(e) => setScale(parseInt(e.target.value) || 100)}
          />
          <div className="input-buttons">
            <button 
              className="preset-btn" 
              onClick={() => setScale(50)}
              title="Half Size"
            >
              50%
            </button>
            <button 
              className="preset-btn" 
              onClick={() => setScale(75)}
              title="Three Quarters"
            >
              75%
            </button>
          </div>
        </div>
        <span className="input-hint">Percentage of original size</span>
      </div>

      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={removeAudio}
            onChange={(e) => setRemoveAudio(e.target.checked)}
          />
          <i className="fas fa-volume-mute"></i>
          Remove Audio
        </label>
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

        input[type="number"] {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: all 0.2s;
        }

        input[type="number"]:focus {
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
          outline: none;
        }

        .checkbox-group {
          margin-top: 0.5rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        input[type="checkbox"] {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid #e2e8f0;
          border-radius: 0.25rem;
          cursor: pointer;
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

export default VideoSettings;
