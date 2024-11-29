import React, { useState } from 'react';
import './LoginPage.css';
import Slideshow from './Slideshow.tsx';
import NavigationTabs from './NavigationTabs.tsx';
import LoginForm from './LoginForm.tsx';
import CreateAccountForm from './CreateAccountForm.tsx';

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Sign-In' | 'Create-Account'>('Sign-In');

  return (
    <div className="login-container">
      <div className="login-left">
        <Slideshow />
      </div>
      <div className="login-right">
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="login-form-container">
          {activeTab === 'Sign-In' ? <LoginForm /> : <CreateAccountForm />}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
