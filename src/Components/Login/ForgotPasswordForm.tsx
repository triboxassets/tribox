import React, { useState } from 'react';
import logo from '../../Assets/whitelogo.svg'; // Import the logo
import { UilMoon, UilSun } from '@iconscout/react-unicons'; // Import Unicons
import './LoginPage.css';

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [darkMode, setDarkMode] = useState(false); // State to track dark mode

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  return (
    <div className={`login-container ${darkMode ? 'dark' : ''}`}>
      <div className="login-left">
        <img
          className="forgot-password-background"
          src={require('../../Assets/login/forgotpassword.webp')}
          alt="Background"
        />  
        <div className="login-text-content">
          <h1>It's a fox overlooking a purple sky.</h1>
          <p>
            Reminds me of someone. Isn't that all we need?
          </p>
        </div>
      </div>

      <div className="forgot-password-right">
        <div className="login-form-container">
          <h1>It's okay to forget.</h1>
          <p>Please enter your email and we’ll send you a cool recovery link!.</p>

          <form className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="sign-in-button">
              Send Reset Link
            </button>
          </form>

          <div className="form-options">
            <p>
              Remembered your password?{' '}
              <a href="/login" className="back-to-signin-button">
                Back to Sign In
              </a>
            </p>
          </div>
        </div>
      </div>

      <img className="login-logo" src={logo} alt="Logo" />

      {/* Dark mode toggle icon */}
      <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? <UilSun /> : <UilMoon />} {/* Toggle between moon and sun icons */}
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
