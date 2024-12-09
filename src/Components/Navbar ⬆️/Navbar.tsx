import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
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
              {text === 'Artists' ? (
                <Link to="/artists" className="menu-link">{/* Link to Artists */}
                  {text}
                </Link>
              ) : (
                text
              )}
            </div>
          ))}
        </div>
        <div className="signin-button">
          <Link to="/login">
            <span className="signin-text">Sign Up/Login</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Navbar;
