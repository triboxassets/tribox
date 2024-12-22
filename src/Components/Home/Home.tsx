import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar ⬆️/Navbar.tsx';
import WorkCard from '../WorkCard 😀/WorkCard.tsx';
import Footer from '../Footer 🦶🏼/Footer.tsx';
import Banner from '../../Assets/banner.svg';
import Triboxgreen from '../../Assets/Triboxgreen.png';
import dummyhomecollection from '../../dummydatabase.json'; // Your full database
import featureWorks from '../../FeatureWorks.json'; // Only contains the IDs of the cards to be shown
import './Home.css';
import { UilCube, UilImages, UilFile, UilMusic, UilCamera, Uil0Plus, UilFont } from '@iconscout/react-unicons';
import SearchBar from '../SearchBar 🔍/SearchBar.tsx';
import TrendingTags from '../Home/TrendingTags.tsx';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

    // Get the product IDs from FeatureWorks.json
    const featuredProductIds = featureWorks.map((item) => item.id);

    // Filter the products from dummyhomecollection based on the IDs from FeatureWorks.json
    const filteredProducts = dummyhomecollection.filter((product) =>
      featuredProductIds.includes(product.id)
    );

  return (
    <div className="home">
      <header className="hero">
        <video autoPlay muted loop className="hero-background">
          <source src={require('../../Assets/back.webm')} type="video/webm" />
        </video>
        <div className="hero-overlay">
          <Navbar isScrolled={isScrolled} />
          <div className="hero-content">
            <h1 className="hero-title">
              Get <span className="hero-highlight">thousands of assets</span> for Any Project from a Broad Range of Categories.
            </h1>
            <SearchBar />
            <TrendingTags />
          </div>
        </div>
      </header>

      <div className="banner-container">
        <img src={Banner} alt="Banner" className="banner" />
      </div>

      <div className="tribox-container">
        <img src={Triboxgreen} alt="Triboxgreen" className="tribox-image" />
        <div className="tribox-content">
          <div className="tribox-header">
            What is <span className="tribox-highlight">Tribox?</span>
          </div>
          <p className="tribox-description">
            Tribox is a platform where you can find a wide range of digital assets for your projects. From 3D models to templates, we have it all.
          </p>
        </div>
      </div>

      <div className="featured-works-container">
        <h2 className="featured-works-title">FEATURED WORKS</h2>
      </div>

      <div className="menu-container">
        <ul className="menu">
          <li className="menu-item">
            <UilCube className="menu-icon" />
            3D Models
          </li>
          <li className="menu-item">
            <UilImages className="menu-icon" />
            Mockups
          </li>
          <li className="menu-item">
            <UilFile className="menu-icon" />
            Templates
          </li>
          <li className="menu-item">
            <UilMusic className="menu-icon" />
            Audio Samples
          </li>
          <li className="menu-item">
            <UilCamera className="menu-icon" />
            Photos
          </li>
          <li className="menu-item">
            <Uil0Plus className="menu-icon" />
            Presentation Templates
          </li>
          <li className="menu-item">
            <UilFont className="menu-icon" />
            Fonts
          </li>
        </ul>
      </div>

      <div className="work-cards-container">
        <div className="work-cards-grid">
          {filteredProducts.map((product) => (
            <WorkCard key={product.id} productId={product.id} buttonText="View Details" />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;