import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar ⬆️/Navbar.tsx';
import Footer from '../Components/Footer 🦶🏼/Footer.tsx';
import PreviewWindow from './Previewwindow.tsx';
import ProductDetails from './ProductDetails.tsx';
import ProductSpecifications from './ProductSpecifications.tsx';
import './ProductListing.css';
import BackArrow from '../Assets/back_arrow.svg';
import dummydatabase from '../dummydatabase.json'; // Assuming the JSON file is in the same folder
import dummycollections from '../dummycollections.json'; // Assuming the JSON file is in the same folder
import { useParams } from 'react-router-dom'; // For extracting the dynamic productId

const ProductListing = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [collection, setCollection] = useState<any>(null);

  // Get the productId from the route
  const { productId } = useParams<{ productId: string }>();

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

  // Fetch product data based on the dynamic productId
  useEffect(() => {
    const productData = dummydatabase.find((item) => item.id === productId);
    setProduct(productData);

    if (productData) {
      const collectionData = dummycollections.collections.find((collection) => collection.id === parseInt(productData.collection_id));
      setCollection(collectionData);
    }
  }, [productId]);

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

      {/* Main Product Section */}
      <div className="main-product-section">
        {/* Product Preview Window */}
        <div className="preview-container">
          {product && collection && (
            <PreviewWindow
              featuredImage={product.featuredImage.src}
              allImages={product.AllImages}
              signatureSvg={collection.signature_svg}
            />
          )}
        </div>

        {/* Product Details and Specifications in the same container */}
        <div className="product-details-specifications-container">
          {product && <ProductDetails product={product} />} {/* Pass product data to ProductDetails */}
          <ProductSpecifications />
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