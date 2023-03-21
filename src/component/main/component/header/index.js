import React from 'react';
import "../../../../css/header.css"
import logoIcon from "../../../../image/logo.svg";
import setingIcon from "../../../../image/setting.svg";

const Header = () => {
  return (
    <div className="header-container">
      <div className="logo">
        <img src={logoIcon} alt="" />
        <div className="app-name">MAQUTE</div>
      </div>
      <div className="logout">
        <div className="avatar">H</div>
        <img
          src={setingIcon}
          alt="logout-icon"
        />
      </div>
    </div>
  );
};

export default Header;