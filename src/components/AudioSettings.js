import React, { useState, useEffect } from 'react';

function AudioSettings({ onSettingsChange, onSave, estimatedSize }) {
  const [sampleRate, setSampleRate] = useState(44100);
  const [bitrate, setBitrate] = useState(128);
  const [speedFactor, setSpeedFactor] = useState(1);

  useEffect(() => {
    onSettingsChange({ sampleRate, bitrate, speedFactor });
  }, [sampleRate, bitrate, speedFactor, onSettingsChange]);

  const handleSave = () => {
    onSave({ sampleRate, bitrate, speedFactor });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Audio Settings</h2>
      <div>
        <label>Sample Rate (Hz):</label>
        <input
          type="number"
          min="8000"
          max="48000"
          value={sampleRate}
          onChange={(e) => setSampleRate(parseInt(e.target.value) || 44100)}
        />
      </div>
      <div>
        <label>Bitrate (kbps):</label>
        <input
          type="number"
          min="45"
          max="320"
          value={bitrate}
          onChange={(e) => setBitrate(parseInt(e.target.value) || 128)}
        />
      </div>
      <div>
        <label>Audio Speed Factor:</label>
        <input
          type="number"
          min="0.1"
          step="0.1"
          value={speedFactor}
          onChange={(e) => setSpeedFactor(parseFloat(e.target.value) || 1)}
        />
      </div>
      <div>
        <strong>Estimated Size: </strong>{estimatedSize} bytes
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default AudioSettings;
