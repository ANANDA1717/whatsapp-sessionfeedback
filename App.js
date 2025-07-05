import React from 'react';
import SessionSummary from './SessionSummary';
import MessageLogTable from './MessageLogTable';

function App() {
  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1>Session Feedback to WhatsApp</h1>
      <SessionSummary />
      <hr />
      <MessageLogTable />
    </div>
  );
}

export default App;
