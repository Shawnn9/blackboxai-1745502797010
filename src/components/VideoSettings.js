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

  const handleSave = () => {
    onSave({ speedFactor, crf, frameRate, scale, removeAudio });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Video Settings</h2>
      <div>
        <label>Speed Factor:</label>
        <input
          type="number"
          min="0.1"
          step="0.1"
          value={speedFactor}
          onChange={(e) => setSpeedFactor(parseFloat(e.target.value) || 1)}
        />
      </div>
      <div>
        <label>CRF (Constant Rate Factor):</label>
        <input
          type="number"
          min="0"
          max="51"
          value={crf}
          onChange={(e) => setCrf(parseInt(e.target.value) || 23)}
        />
      </div>
      <div>
        <label>Frame Rate:</label>
        <input
          type="number"
          min="1"
          max="120"
          value={frameRate}
          onChange={(e) => setFrameRate(parseInt(e.target.value) || 30)}
        />
      </div>
      <div>
        <label>Scale (%):</label>
        <input
          type="number"
          min="1"
          max="100"
          value={scale}
          onChange={(e) => setScale(parseInt(e.target.value) || 100)}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={removeAudio}
            onChange={(e) => setRemoveAudio(e.target.checked)}
          />
          Remove Audio
        </label>
      </div>
      <div>
        <strong>Estimated Size: </strong>{estimatedSize} bytes
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default VideoSettings;
