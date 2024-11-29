import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link component for navigation
import slides from './slides.ts'; // Move slides data to a separate file
import logo from '../../Assets/whitelogo.svg';
import './LoginPage.css';

const Slideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

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

  return (
    <>
      <img className="login-background-image" src={slides[currentSlide].image} alt="Slide" />
      <div className="login-overlay" />
      {/* Make the logo a clickable link */}
      <Link to="/Home">
        <img className="login-logo" src={logo} alt="Logo" />
      </Link>
      <div className="login-text-content">
        <h1>{slides[currentSlide].heading}</h1>
        <p>{slides[currentSlide].description}</p>
        <span className="photo-credit">{slides[currentSlide].credit}</span>
      </div>
      <div className="progress-container">
        <progress className="slide-progress" value={progress} max="100"></progress>
      </div>
    </>
  );
};

export default Slideshow;
