import React, { useState } from 'react';
import './LoginPage.css';
import Slideshow from './Slideshow.tsx';
import NavigationTabs from './NavigationTabs.tsx';
import LoginForm from './LoginForm.tsx';
import CreateAccountForm from './CreateAccountForm.tsx';
import { UilMoon, UilSun } from '@iconscout/react-unicons'; // Import Unicons

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Sign-In' | 'Create-Account'>('Sign-In');
  const [darkMode, setDarkMode] = useState(false); // State to track dark mode

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  return (
    <div className={`login-container ${darkMode ? 'dark' : ''}`}>
      <div className="login-left">
        <Slideshow />
      </div>
      <div className="login-right">
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="login-form-container">
          {activeTab === 'Sign-In' ? <LoginForm /> : <CreateAccountForm />}
        </div>
      </div>

      <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? <UilSun /> : <UilMoon />} {/* Toggle between moon and sun icons */}
      </div>
    </div>
  );
};

export default LoginPage;
