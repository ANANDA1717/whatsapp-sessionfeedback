import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessageLogTable = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/session/logs')
      .then((res) => {
        console.log('✅ Logs fetched:', res.data);
        setLogs(res.data);
      })
      .catch((err) => console.error('❌ Error loading logs:', err));
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.tableContainer}>
        <h2 style={styles.heading}>📨 Last 10 WhatsApp Feedback Messages</h2>

        {logs.length === 0 ? (
          <p style={styles.noLogs}>No logs found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Feedback</th>
                <th style={styles.th}>Session ID</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Sent At</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={log.id}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{log.to}</td>
                  <td style={styles.td}>{log.feedback}</td>
                  <td style={styles.td}>{log.sessionId}</td>
                  <td style={{ ...styles.td, ...styles.statusCell(log.status) }}>
                    {log.status}
                  </td>
                  <td style={styles.td}>
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f4f7fc',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: `'Segoe UI', sans-serif`,
    display: 'flex',
    justifyContent: 'center',
  },
  tableContainer: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '1000px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '22px',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '14px',
  },
  th: {
    backgroundColor: '#f0f0f0',
    padding: '12px',
    borderBottom: '1px solid #ccc',
    color: '#333',
    fontWeight: '600',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #e0e0e0',
    color: '#555',
  },
  noLogs: {
    textAlign: 'center',
    color: '#888',
    fontSize: '16px',
    padding: '20px 0',
  },
  statusCell: (status) => ({
    backgroundColor:
      status === 'sent'
        ? '#d4edda'
        : status === 'queued'
        ? '#fff3cd'
        : '#f8d7da',
    color:
      status === 'sent'
        ? '#155724'
        : status === 'queued'
        ? '#856404'
        : '#721c24',
    fontWeight: '500',
    borderRadius: '4px',
    textAlign: 'center',
  }),
};

export default MessageLogTable;
