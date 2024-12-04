import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar ⬆️/Navbar.tsx';
import Snowflakes from '../Snowflakes ❄️/Snowflakes.tsx';
import WorkCard from '../WorkCard 😀/WorkCard.tsx';
import Footer from '../Footer 🦶🏼/Footer.tsx';
import SearchIcon from '../../Assets/search.svg';
import ArrowIcon from '../../Assets/arrow.svg';
import Banner from '../../Assets/banner.svg';
import HeartIcon from '../../Assets/heart.svg';
import Triboxgreen from '../../Assets/Triboxgreen.png';
import dummyhomecollection from '../../dummyhomecollection.json';
import './Home.css';
import { UilCube, UilImages, UilFile, UilMusic, UilCamera, Uil0Plus, UilFont } from '@iconscout/react-unicons';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100); // Adjust the threshold as needed
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const productIds = dummyhomecollection.map((product) => product.id);

  const works = [
    { imageSrc: require('../../Assets/car1.png'), title: 'Car 1', description: 'Description of Car 1', buttonText: 'View Details' },
    { imageSrc: require('../../Assets/car2.png'), title: 'Car 2', description: 'Description of Car 2', buttonText: 'View Details' },
    { imageSrc: require('../../Assets/car3.png'), title: 'Car 3', description: 'Description of Car 3', buttonText: 'View Details' },
    { imageSrc: require('../../Assets/car4.png'), title: 'Car 4', description: 'Description of Car 4', buttonText: 'View Details' },
    { imageSrc: require('../../Assets/car5.png'), title: 'Car 5', description: 'Description of Car 5', buttonText: 'View Details' },
    { imageSrc: require('../../Assets/car6.png'), title: 'Car 6', description: 'Description of Car 6', buttonText: 'View Details' },
    { imageSrc: require('../../Assets/car7.png'), title: 'Car 7', description: 'Description of Car 7', buttonText: 'View Details' },
    { imageSrc: require('../../Assets/car8.png'), title: 'Car 8', description: 'Description of Car 8', buttonText: 'View Details' },
    { imageSrc: require('../../Assets/car9.png'), title: 'Car 9', description: 'Description of Car 9', buttonText: 'View Details' },
    { imageSrc: require('../../Assets/car10.png'), title: 'Car 10', description: 'Description of Car 10', buttonText: 'View Details' },
    { imageSrc: require('../../Assets/car11.png'), title: 'Car 11', description: 'Description of Car 11', buttonText: 'View Details' },
    { imageSrc: require('../../Assets/car12.png'), title: 'Car 12', description: 'Description of Car 12', buttonText: 'View Details' },
    { imageSrc: require('../../Assets/car13.png'), title: 'Car 13', description: 'Description of Car 13', buttonText: 'View Details' },
    { imageSrc: require('../../Assets/car14.png'), title: 'Car 14', description: 'Description of Car 14', buttonText: 'View Details' },
    { imageSrc: require('../../Assets/car15.png'), title: 'Car 15', description: 'Description of Car 15', buttonText: 'View Details' },
    
  ];

  const trendingTags = [
    { name: 'models', background: '#0D0C12', borderColor: '#31121A' },
    { name: '3d models', background: '#0D0C12', borderColor: '#31121A' },
    { name: 'NFTs', background: '#ED254E', borderColor: '#31121A' },
    { name: 'logo pack', background: '#0D0C12', borderColor: '#31121A' },
    { name: 'dashboard', background: '#0D0C12', borderColor: '#31121A' },
    { name: 'HDR', background: '#0D0C12', borderColor: '#31121A' },
  ];

  return (
    <div className="home">
      <header className="hero">
        <Snowflakes count={50} />
        <div className="hero-overlay">
          {/* Pass the isScrolled prop to Navbar */}
          <Navbar isScrolled={isScrolled} />
          <div className="hero-content">
            <h1 className="hero-title">
              Get <span className="hero-highlight">thousands of assets</span> for Any Project from a Broad Range of Categories.
            </h1>
            <div className="search-bar">
              <div className="search-container">
                <div className="search-category">
                  <span>All Items</span>
                  <img src={ArrowIcon} alt="Arrow Icon" className="arrow-icon" />
                  <input type="text" placeholder="What does your project need?" className="search-input" />
                </div>
                <div className="search-icon-container">
                  <img src={SearchIcon} alt="Search Icon" className="search-icon" />
                </div>
              </div>
            </div>
            <section className="trending-searches">
              <div className="trending-searches-header">
                <span>Trending Searches</span>
              </div>
              <div className="tags-container">
                {trendingTags.map((tag, index) => (
                  <div
                    key={index}
                    className="tag"
                    style={{ background: tag.background, borderColor: tag.borderColor }}
                  >
                    <span className="tag-text">{tag.name}</span>
                  </div>
                ))}
              </div>
            </section>
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
          <div className="tribox-description">
            Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
          </div>
          <div className="tribox-button">
            <div className="tribox-button-inner">
              <img src={HeartIcon} alt="Heart Icon" className="tribox-button-icon" />
              <div className="tribox-button-text">View Store</div>
            </div>
          </div>
        </div>
      </div>

      <div className="infinite-scroll-container">
        <div className="loop-slider">
          <div className="inner">
          {works.map((work, index) => (
              <img key={index} src={work.imageSrc} alt={work.title} className="scroll-image" />
            ))}
            {works.map((work, index) => (
              <img key={index + works.length} src={work.imageSrc} alt={work.title} className="scroll-image" />
            ))}
          </div>
        </div>
      </div>

      <div className="infinite-scroll-container second-carousel">
        <div className="loop-slider">
          <div className="inner">
          {works.map((work, index) => (
              <img key={index} src={work.imageSrc} alt={work.title} className="scroll-image" />
            ))}
            {works.map((work, index) => (
              <img key={index + works.length} src={work.imageSrc} alt={work.title} className="scroll-image" />
            ))}
          </div>
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
          {productIds.map((id) => (
            <WorkCard key={id} productId={id} buttonText="View Details" />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
