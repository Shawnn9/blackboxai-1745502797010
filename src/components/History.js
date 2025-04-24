import React from 'react';

function History({ history, onDelete }) {
  const formatValue = (value) => {
    if (typeof value === 'number') {
      if (Number.isInteger(value)) {
        return value;
      }
      return value.toFixed(2);
    }
    return value ? 'Yes' : 'No';
  };

  return (
    <div className="history-wrapper">
      <h2>History</h2>
      <div className="history-list">
        {history.length === 0 ? (
          <div className="empty-history">
            <i className="fas fa-history"></i>
            <p>No saved settings yet</p>
          </div>
        ) : (
          history.map((entry) => (
            <div key={entry.id} className="history-item">
              <button
                onClick={() => onDelete(entry.id)}
                className="delete-button"
                title="Delete"
              >
                <i className="fas fa-times"></i>
              </button>
              
              <div className="history-header">
                <div className="file-info">
                  <i className={`fas fa-${entry.type === 'video' ? 'video' : 'music'}`}></i>
                  <span className="filename">{entry.filename}</span>
                </div>
                <span className="timestamp">{entry.timestamp}</span>
              </div>

              <div className="settings-list">
                {Object.entries(entry.settings).map(([key, value]) => (
                  <div key={key} className="setting-item">
                    <span className="setting-label">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="setting-value">{formatValue(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <style jsx>{`
        .history-wrapper {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        h2 {
          margin: 0 0 1.5rem;
          color: #2d3748;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .empty-history {
          text-align: center;
          padding: 2rem;
          color: #a0aec0;
        }

        .empty-history i {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .empty-history p {
          margin: 0;
          font-size: 1.1rem;
        }

        .history-item {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 1.25rem;
          margin-bottom: 1rem;
          position: relative;
          transition: all 0.2s ease;
        }

        .history-item:hover {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          transform: translateY(-1px);
        }

        .delete-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: #e53e3e;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 0.375rem;
          transition: all 0.2s ease;
        }

        .delete-button:hover {
          background: #fff5f5;
          color: #c53030;
        }

        .history-header {
          margin-bottom: 1rem;
          padding-right: 2rem;
        }

        .file-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .file-info i {
          color: #4299e1;
        }

        .filename {
          font-weight: 600;
          color: #2d3748;
        }

        .timestamp {
          font-size: 0.875rem;
          color: #718096;
        }

        .settings-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.75rem;
        }

        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          background: white;
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }

        .setting-label {
          color: #718096;
          text-transform: capitalize;
        }

        .setting-value {
          font-weight: 500;
          color: #2d3748;
        }

        @media (max-width: 640px) {
          .settings-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default History;
