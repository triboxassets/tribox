import React from 'react';
import { ReactComponent as TriboxLogo } from '../../Assets/whitelogo.svg'
import './Navbar.css';

const Navbar: React.FC = () => (
  <div className="navbar-wrapper"> 
    <div className="navbar-container">
      <div className="logo-container">
        <TriboxLogo />
      </div>
      <div className="menu-container">
        <div className="menu-items">
          {['Store', 'Destroy My Design', 'About', 'Artists'].map((text) => (
            <div key={text} className="menu-item">
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
