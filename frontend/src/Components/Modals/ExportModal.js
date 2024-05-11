import React, { useState } from "react";
import "./Modal.css";
var validator = require("email-validator");

function ExportModal(props) {
  const [email, setEmail] = useState("");
  const [showEmailContainer, setShowEmailContainer] = useState(false);

  const handleExportViaUrlClick = () => {
    setShowEmailContainer(true);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOKClick = () => {
    if (validator.validate(email)) {
      props.exportViaUrl(email);
    } else {
      alert("Please enter a valid email address");
    }
  };

  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-content">
        <h2 className="export-heading">Export your form</h2>
        {showEmailContainer && (
          <div className="email-container">
            <label className="email-input" htmlFor="emailforExportURL">
              Enter a valid email to recieve responses for the generated form
            </label>
            <div className="email-container-row">
              <input
                className="email-input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
              <button onClick={handleOKClick}>Enter</button>
            </div>
          </div>
        )}
        <div className="export-options">
          <button
            className="export-option-button"
            onClick={handleExportViaUrlClick}
          >
            Export via URL
          </button>
          <button className="export-option-button" onClick={props.exportAsHTML}>
            Export as HTML
          </button>
          <button
            className="export-option-button"
            onClick={props.exportViaConfiforms}
          >
            Export to ConfiForm
          </button>
        </div>

        <button className="close-modal" onClick={props.toggleExportModal}>
          CLOSE
        </button>
      </div>
    </div>
  );
}

export default ExportModal;
