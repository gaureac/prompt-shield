import React from 'react';
import './App.css';
import promptShieldLogo from '/prompt-shield.svg';

function App() {
  return (
    <div className="popup-container">
      <div className="header">
        <div className="logo-container">
          <img
            src={promptShieldLogo}
            alt="Prompt Shield Logo"
            className="logo"
          />
          <h1 className="title">Prompt Shield</h1>
        </div>
      </div>

      <div className="content">
        <p className="description">
          Prevents accidental email sharing in ChatGPT by detecting and blocking
          email addresses in prompts.
        </p>

        <div className="status-indicator">
          <div className="status-dot active"></div>
          <span className="status-text">Protection Active</span>
        </div>
      </div>
    </div>
  );
}

export default App;
