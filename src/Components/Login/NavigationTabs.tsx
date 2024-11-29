import React, { useRef, useEffect } from 'react';
import './LoginPage.css';

interface NavigationTabsProps {
  activeTab: 'Sign-In' | 'Create-Account';
  setActiveTab: (tab: 'Sign-In' | 'Create-Account') => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, setActiveTab }) => {
  const navRefs = useRef<{ [key: string]: HTMLSpanElement | null }>({});
  const barRef = useRef<HTMLDivElement | null>(null);

  const handleTabClick = (tab: 'Sign-In' | 'Create-Account') => {
    setActiveTab(tab);

    // Animate the bar position based on the selected tab
    if (barRef.current && navRefs.current[tab]) {
      const { offsetLeft, offsetWidth } = navRefs.current[tab]!;
      barRef.current.style.transform = `translateX(${offsetLeft}px)`;
      barRef.current.style.width = `${offsetWidth}px`;
    }
  };

  useEffect(() => {
    // Initialize the bar position based on the active tab
    if (barRef.current && navRefs.current[activeTab]) {
      const { offsetLeft, offsetWidth } = navRefs.current[activeTab]!;
      barRef.current.style.transform = `translateX(${offsetLeft}px)`;
      barRef.current.style.width = `${offsetWidth}px`;
    }
  }, [activeTab]);

  return (
    <div className="login-nav-container">
      <div className="login-nav">
        <span
          ref={(el) => (navRefs.current['Sign-In'] = el)}
          className={activeTab === 'Sign-In' ? 'active' : ''}
          onClick={() => handleTabClick('Sign-In')}
        >
          Sign-In
        </span>
        <span
          ref={(el) => (navRefs.current['Create-Account'] = el)}
          className={activeTab === 'Create-Account' ? 'active' : ''}
          onClick={() => handleTabClick('Create-Account')}
        >
          Create an account
        </span>
      </div>
      <div className="login-bar-container">
        <div className="login-bar" ref={barRef} />
      </div>
    </div>
  );
};

export default NavigationTabs;
