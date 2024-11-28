import React from 'react';
import { ReactComponent as TriboxLogo } from '../../Assets/whitelogo.svg';
import './Navbar.css';

const Navbar: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => (
  <div className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}>
    <div className="navbar-container">
      <div className="logo-container">
        <TriboxLogo />
      </div>
      <div className="header-menu-container">
        <div className="header-menu-items">
          {['Store', 'Destroy My Design', 'About', 'Artists'].map((text) => (
            <div key={text} className="header-menu-item">
              {text}
            </div>
          ))}
        </div>
        <div className="signin-button">
          <span className="signin-text">Sign In</span>
        </div>
      </div>
    </div>
  </div>
);

export default Navbar;
