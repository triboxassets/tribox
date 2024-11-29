import React, { useState } from 'react';
import eyeIcon from '../../Assets/eye-icon.svg';
import eyeIconOpen from '../../Assets/eye-icon-open.svg';
import googleIcon from '../../Assets/google-icon.svg';
import metaIcon from '../../Assets/meta-icon.svg';
import appleIcon from '../../Assets/apple-icon.svg';
import './LoginPage.css';

const LoginForm: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
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
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Enter your password"
            />
            <img
              src={passwordVisible ? eyeIconOpen : eyeIcon}
              alt="Show password"
              className="eye-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          </div>
        </div>
        <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" />
            <span>Remember me!</span>
          </label>
          <a href="/forgot-password" className="forgot-password">
            Forgot Password?
          </a>
        </div>
        <button type="submit" className="sign-in-button">
          Sign in
        </button>
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
  );
};

export default LoginForm;
