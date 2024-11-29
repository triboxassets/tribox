import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar ⬆️/Navbar.tsx';
import Footer from '../Components/Footer 🦶🏼/Footer.tsx';
import PreviewWindow from './Previewwindow.tsx';
import './ProductListing.css';
import BackArrow from '../Assets/back_arrow.svg'; // Importing the SVG

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

  return (
    <div className="product-listing">
      <Navbar isScrolled={isScrolled} />

      {/* Back Button */}
      <div className="back-button-container">
        <div className="back-button">
          <button onClick={() => window.history.back()}>
            <img src={BackArrow} alt="Back" className="back-arrow-icon" />Back
          </button>
        </div>
      </div>

      {/* Product Preview Window */}
      <div className="preview-container">
        <PreviewWindow />
      </div>

      {/* Product Details */}
      <div className="product-details">
        <div className="details-left">
          <h1>Product Name — Lorem Ipsum</h1>
          <p className="rating">⭐ 4.3</p>
          <p className="author">Author: Abbas Raza</p>
          <p className="upload-date">Upload Date: 6/14/2024</p>
          <p className="description">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry...
          </p>
          <button className="btn btn-primary">Download for Free</button>
          <button className="btn btn-secondary">Buy now for $30</button>
        </div>
        <div className="details-right">
          <h2>Specifications</h2>
          <ul>
            <li><strong>Formats:</strong> .eps, .obj</li>
            <li><strong>Polygons:</strong> 784,570</li>
            <li><strong>Vertices:</strong> 789,755</li>
            <li><strong>Geometry:</strong> Tris/Quads</li>
          </ul>
        </div>
      </div>

      {/* Stuff You Might Like */}
      <div className="related-products">
        <h2>Stuff You Might Like (Allegedly)</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src="/assets/related-product-1.jpg" alt="Makeup 3D Model" />
            <p>Makeup 3D Model</p>
          </div>
          <div className="product-card">
            <img src="/assets/related-product-2.jpg" alt="Q-Box 3D Model" />
            <p>Q-Box 3D Model</p>
          </div>
          <div className="product-card">
            <img src="/assets/related-product-3.jpg" alt="Islamic Architecture" />
            <p>Islamic Architecture</p>
          </div>
          <div className="product-card">
            <img src="/assets/related-product-4.jpg" alt="Beads in Box" />
            <p>Beads in Box</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductListing;
