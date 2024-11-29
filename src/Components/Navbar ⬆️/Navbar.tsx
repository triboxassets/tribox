import React from 'react';
import { Link } from 'react-router-dom'; // Add this import for Link
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
          <Link to="/login"> {/* Link component to navigate to the login page */}
            <span className="signin-text">Sign Up/Login</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Navbar;
