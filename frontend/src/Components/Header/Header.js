import React from "react";

import "./Header.css";

function Header(props) {
  return (
    <div className="header-container">
      <img className="tum-logo-image" src="https://www.moodle.tum.de/img/tum.svg" alt="tumlogo"/>
      <h1 className="main-header"> CIT Form Generator </h1>
      <button className="export-button" onClick={props.toggleExportModal}>Export</button>
    </div>
  );
}

export default Header;
