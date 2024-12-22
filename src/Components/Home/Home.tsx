import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar ⬆️/Navbar.tsx';
import WorkCard from '../WorkCard 😀/WorkCard.tsx';
import Footer from '../Footer 🦶🏼/Footer.tsx';
import Banner from '../../Assets/banner.svg';
import dummyhomecollection from '../../dummydatabase.json';
import featureWorks from '../../FeatureWorks.json'; // Only contains the IDs of the cards to be shown
import './Home.css';
import { UilCube, UilImages, UilFile, UilMusic, UilCamera, Uil0Plus, UilFont } from '@iconscout/react-unicons';
import SearchBar from '../SearchBar 🔍/SearchBar.tsx';
import TrendingTags from '../Home/TrendingTags.tsx';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Items');

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

  useEffect(() => {
    // Filter the products based on featureWorks IDs
    const filtered = dummyhomecollection.filter(product => featureWorks.some(fw => fw.id === product.id));
    setFilteredProducts(filtered);
  }, []);

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory('All Items');
      setFilteredProducts(dummyhomecollection.filter(product => featureWorks.some(fw => fw.id === product.id)));
    } else {
      setSelectedCategory(category);
      setFilteredProducts(dummyhomecollection.filter(product => featureWorks.some(fw => fw.id === product.id) && product.productType === category));
    }
  };

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
            <p className="hero-description">
              Discover and showcase amazing works from talented artists around the world.
            </p>
            <SearchBar />
            <TrendingTags />
          </div>
        </div>
      </header>

      <div className="banner-container">
        <img src={Banner} alt="Banner" className="banner" />
      </div>

      <div className="featured-works-container">
        <h2 className="featured-works-title">FEATURED WORKS</h2>
      </div>

      <div className="menu-container">
        <ul className="menu">
          <li className={`menu-item ${selectedCategory === '3D Models' ? 'active' : ''}`} onClick={() => handleCategoryClick('3D Models')}>
            <UilCube className="menu-icon" />
            3D Models
          </li>
          <li className={`menu-item ${selectedCategory === 'Mockups' ? 'active' : ''}`} onClick={() => handleCategoryClick('Mockups')}>
            <UilImages className="menu-icon" />
            Mockups
          </li>
          <li className={`menu-item ${selectedCategory === 'Templates' ? 'active' : ''}`} onClick={() => handleCategoryClick('Template')}>
            <UilFile className="menu-icon" />
            Templates
          </li>
          <li className={`menu-item ${selectedCategory === 'Audio' ? 'active' : ''}`} onClick={() => handleCategoryClick('Audio')}>
            <UilMusic className="menu-icon" />
            Audio Samples
          </li>
          <li className={`menu-item ${selectedCategory === 'Photos' ? 'active' : ''}`} onClick={() => handleCategoryClick('Photos')}>
            <UilCamera className="menu-icon" />
            Photos
          </li>
          <li className={`menu-item ${selectedCategory === 'Presentation Templates' ? 'active' : ''}`} onClick={() => handleCategoryClick('Presentation Templates')}>
            <Uil0Plus className="menu-icon" />
            Presentations
          </li>
          <li className={`menu-item ${selectedCategory === 'Fonts' ? 'active' : ''}`} onClick={() => handleCategoryClick('Fonts')}>
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