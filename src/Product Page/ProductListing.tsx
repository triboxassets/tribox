import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar ⬆️/Navbar.tsx';
import Footer from '../Components/Footer 🦶🏼/Footer.tsx';
import WorkCard from '../Components/WorkCard 😀/WorkCard.tsx';
import dummyhomecollection from '../dummyhomecollection.json';
import './ProductListing.css';

const ProductListing = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const productList = dummyhomecollection;

  return (
    <div className="product-listing">
      <Navbar isScrolled={isScrolled} />

      <header className="product-listing-header">
        <h1>Discover Our Products</h1>
        <p>Explore a wide range of assets tailored to your creative needs.</p>
      </header>

      <div className="product-listing-grid">
        {productList.map((product) => (
          <WorkCard key={product.id} productId={product.id} buttonText="View Details" />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default ProductListing;
