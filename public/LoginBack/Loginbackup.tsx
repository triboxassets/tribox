  import React, { useState, useRef, useEffect } from 'react';
  import './LoginPage.css';
  import slide1Image from '../../Assets/login/slide1.png';
  import slide2Image from '../../Assets/login/slide2.jpg';
  import slide3Image from '../../Assets/login/slide3.png';
  import slide4Image from '../../Assets/login/slide4.webp';
  import logo from '../../Assets/whitelogo.svg';
  import googleIcon from '../../Assets/google-icon.svg';
  import metaIcon from '../../Assets/meta-icon.svg';
  import appleIcon from '../../Assets/apple-icon.svg';
  import eyeIcon from '../../Assets/eye-icon.svg';
  import eyeIconOpen from '../../Assets/eye-icon-open.svg';

  const slides = [
    {
      image: slide1Image,
      heading: "It's the year 2000",
      description:
        "Lorem Ipsum is simply depressing. Not a day goes by where I curse the Lorem Ipsum of this world. I hope it rains soon. I like to eat potatoes.",
      credit: "Photo by Mikhail Nilov",
    },
    {
      image: slide2Image,
      heading: "Abbas, your steaks suck.",
      description:
        "I can't believe I'm saying this in a public forum. I never really wanted to take an approach like this but the world must know of the absolute atrocity that you call cooked meat. I am absolutely flabbergasted by the taste and my mouth feels rotten after I taste your steak.",
      credit: "Photo by John Doe",
    },
    {
      image: slide3Image,
      heading: "I'm testin' something.",
      description:
        "Ah yes, let's start by checking if the paragraph comes through fine. Yes they do, baby girl. Looking mad spicy. Time to check if Emojis work/look good in this paragraph. ❤️‍🩹👿. Ummmm, yeah it does bad bois. Let's get this show on the road.",
      credit: "Photo by Jane Smith",
    },
    {
      image: slide4Image,
      heading: "I'm coming alive again.",
      description:
        "My friend puts tobacco in his sandwiches and I feel like this is something we need to talk about. I mean, seriously, tobacco? Of all things? Tobacco. When he first told me he puts tobacco in his sandwiches, I thought he meant Tabasco. Like that, sauce. But no, this mfer actually puts the cancer plant straight into his sandwich. Well, atleast he's not a madman who adds tomatoes to his stuff. 😌",
      credit: "Photo by Jane Smith",
    },
  ];

  const LoginPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'Sign-In' | 'Create-Account'>('Sign-In');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0); // State for the slideshow
    const [progress, setProgress] = useState(0); // State for the progress bar
    const barRef = useRef<HTMLDivElement>(null);
    const navRefs = useRef<{ [key: string]: HTMLSpanElement | null }>({
      'Sign-In': null,
      'Create-Account': null,
    });

    // Slideshow and progress bar logic
    useEffect(() => {
      const slideDuration = 10000; // 10 seconds per slide
      const startSlideShow = () => {
        const interval = setInterval(() => {
          setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, slideDuration);

        return interval;
      };

      const startProgress = () => {
        const startTime = performance.now();
        const updateProgress = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const percentage = (elapsed % slideDuration) / slideDuration;

          setProgress(percentage * 100);
          requestAnimationFrame(updateProgress);
        };
        requestAnimationFrame(updateProgress);
      };

      const slideInterval = startSlideShow();
      startProgress();

      return () => clearInterval(slideInterval); // Cleanup interval on unmount
    }, []);

    useEffect(() => {
      const updateBarPosition = () => {
        const activeTabElement = navRefs.current[activeTab];
        if (barRef.current && activeTabElement) {
          const { offsetWidth, offsetLeft } = activeTabElement;
          barRef.current.style.width = `${offsetWidth}px`;
          barRef.current.style.transform = `translateX(${offsetLeft}px)`;
        }
      };

      updateBarPosition();
      window.addEventListener('resize', updateBarPosition);

      return () => window.removeEventListener('resize', updateBarPosition);
    }, [activeTab]);

    const handleTabClick = (tab: 'Sign-In' | 'Create-Account') => {
      setActiveTab(tab);
    };

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    return (
      <div className="login-container">
        <div className="login-left">
          <img
            className="login-background-image"
            src={slides[currentSlide].image}
            alt="Background"
          />
          <div className="login-overlay" />
          <img className="login-logo" src={logo} alt="Logo" />
          <div className="login-text-content">
            <h1>{slides[currentSlide].heading}</h1>
            <p>{slides[currentSlide].description}</p>
            <span className="photo-credit">{slides[currentSlide].credit}</span>
          </div>
          
          <div className="progress-container">
            <progress className="slide-progress" value={progress} max="100"></progress>
          </div>
        </div>

        <div className="login-right">
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
                      <input
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="Enter your password"
                      />
                      <img
                        src={passwordVisible ? eyeIconOpen : eyeIcon}
                        alt="Show password"
                        className="eye-icon"
                        onClick={togglePasswordVisibility}
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
                  <button type="submit" className="sign-in-button">
                    Create Account
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default LoginPage;
