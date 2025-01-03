import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../Assets/whitelogo.svg'; // Assuming you have a logo SVG

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/">
            <img src={Logo} alt="Tribox Logo" className="logo" />
          </Link>
        </div>
        <div className="header-menu-container">
          <div className="header-menu-items">
            <Link to="/store" className="header-menu-item">Store</Link>
            <Link to="/Destroy My Design" className="header-menu-item">Destroy My Design</Link>
            <Link to="/artists" className="header-menu-item">Artists</Link>
            <Link to="/about" className="header-menu-item">About</Link>
          </div>
          <Link to="/login" className={`signin-button ${isScrolled ? 'scrolled' : ''}`}>
            <span className="signin-text">Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;