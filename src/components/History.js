import React from 'react';

function History({ history, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">History</h2>
      {history.length === 0 ? (
        <p className="text-gray-500">No history yet</p>
      ) : (
        <div className="space-y-4">
          {history.map((entry) => (
            <div key={entry.id} className="border rounded p-3 relative">
              <button
                onClick={() => onDelete(entry.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <i className="fas fa-trash"></i>
              </button>
              <p className="font-medium">{entry.filename}</p>
              <p className="text-sm text-gray-600">{entry.timestamp}</p>
              <div className="mt-2">
                {entry.type === 'video' ? (
                  <>
                    <p>Speed: {entry.settings.speedFactor}x</p>
                    <p>CRF: {entry.settings.crf}</p>
                    <p>Frame Rate: {entry.settings.frameRate}</p>
                    <p>Scale: {entry.settings.scale}%</p>
                    <p>Remove Audio: {entry.settings.removeAudio ? 'Yes' : 'No'}</p>
                  </>
                ) : (
                  <>
                    <p>Sample Rate: {entry.settings.sampleRate}Hz</p>
                    <p>Bitrate: {entry.settings.bitrate}kbps</p>
                    <p>Speed: {entry.settings.speedFactor}x</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
