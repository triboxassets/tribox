import React, { useState } from 'react';
import './LoginPage.css';
import loginImage from '../../Assets/login/loginimage.png';
import logo from '../../Assets/whitelogo.svg';
import googleIcon from '../../Assets/google-icon.svg';
import metaIcon from '../../Assets/meta-icon.svg';
import appleIcon from '../../Assets/apple-icon.svg';
import eyeIcon from '../../Assets/eye-icon.svg';

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Sign-In' | 'Create-Account'>('Sign-In');

  const handleTabClick = (tab: 'Sign-In' | 'Create-Account') => {
    setActiveTab(tab);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img className="login-background-image" src={loginImage} alt="Background" />
        <div className="login-overlay" />
        <img className="login-logo" src={logo} alt="Logo" />
        <div className="login-text-content">
          <h1>its the year 2000</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          <span className="photo-credit">Photo by Mikhail Nilov</span>
        </div>
      </div>

      <div className="login-right">
        <div className="login-nav">
          <span
            className={activeTab === 'Sign-In' ? 'active' : ''}
            onClick={() => handleTabClick('Sign-In')}
          >
            Sign-In
          </span>
          <span>|</span>
          <span
            className={activeTab === 'Create-Account' ? 'active' : ''}
            onClick={() => handleTabClick('Create-Account')}
          >
            Create an account
          </span>
        </div>
        <div className="login-bar-container">
          <div
            className="login-bar"
            style={{
              transform: activeTab === 'Sign-In' ? 'translateX(0)' : 'translateX(100%)',
            }}
          />
        </div>

        <div className="login-form-container">
          {activeTab === 'Sign-In' ? (
            <>
              <h1>Welcome Back.</h1>
              <p>Enter your email and password to access your account.</p>
              <form className="login-form">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <div className="password-input">
                    <input type="password" placeholder="Enter your password" />
                    <img src={eyeIcon} alt="Show password" className="eye-icon" />
                  </div>
                </div>
                <div className="form-options">
                  <label className="remember-me">
                    <input type="checkbox" />
                    <span>Remember me!</span>
                  </label>
                  <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
                </div>
                <button type="submit" className="sign-in-button">Sign in</button>
                <div className="social-login">
                  <button className="social-button google">
                    <img src={googleIcon} alt="Google" />
                    Sign in with Google
                  </button>
                  <button className="social-button meta">
                    <img src={metaIcon} alt="Meta" />
                    Sign in with Meta
                  </button>
                  <button className="social-button apple">
                    <img src={appleIcon} alt="Apple" />
                    Sign in with Apple
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h1>Welcome to Tribox.</h1>
              <p>Just need a little bit of your information and I’ll give you your very own account!</p>
              <form className="login-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter your full name" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" placeholder="Create a password" />
                </div>
                <button type="submit" className="sign-in-button">Create Account</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
