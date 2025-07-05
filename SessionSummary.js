import React, { useState } from 'react';
import axios from 'axios';

const SessionSummary = () => {
  const [feedback, setFeedback] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [patientName, setPatientName] = useState('');
  const [loading, setLoading] = useState(false);

  const sendFeedback = async () => {
    if (!feedback || !phoneNumber || !patientName) {
      alert('⚠️ Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/session/send-feedback', {
        sessionId: 'abc123',
        patientName,
        phoneNumber: `whatsapp:${phoneNumber}`,
        feedback,
      });

      alert('✅ Feedback sent successfully!');
      setFeedback('');
      setPhoneNumber('');
      setPatientName('');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to send feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📝 Send Session Feedback</h2>

        <label style={styles.label}>Patient Name</label>
        <input
          type="text"
          placeholder="Enter patient's name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Phone Number</label>
        <input
          type="text"
          placeholder="e.g. +917775076640"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Feedback</label>
        <textarea
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
          style={styles.textarea}
        />

        <button
          onClick={sendFeedback}
          disabled={loading}
          style={{
            ...styles.button,
            backgroundColor: loading ? '#aaa' : '#007BFF',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Sending...' : 'Send via WhatsApp'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'linear-gradient(135deg, #f0f4ff, #d9ecff)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px 40px',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '500px',
    fontFamily: `'Segoe UI', sans-serif`,
  },
  heading: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#333',
    fontWeight: '600',
  },
  label: {
    marginBottom: '8px',
    display: 'block',
    color: '#555',
    fontWeight: '500',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
  },
  textarea: {
    width: '100%',
    padding: '12px 14px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
    resize: 'vertical',
  },
  button: {
    width: '100%',
    padding: '12px',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    transition: 'background 0.3s',
  },
};

export default SessionSummary;
