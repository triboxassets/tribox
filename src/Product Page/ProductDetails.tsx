import React from 'react';
import './ProductDetails.css'; 
import { ReactComponent as StarIcon } from '../Assets/Star.svg'; // Import the star.svg as a React component

const ProductDetails: React.FC = () => {
    return (
      <div className="product-details">
        <div className="details-left">
          <h1>Product Name — Lorem Ipsum</h1>
          <p className="rating">
            <span className="custom-rating-box">
              <StarIcon className="star-icon" /> 4.3
            </span>
          </p>
          <div className="author-upload">
            <div className="author">
              <h3>Author</h3>
              <div className="author-info">
                <img className="author-image" src="../Assets/profile.png" alt="Author" />
                <p>Abbas Raza</p>
              </div>
            </div>
            <div className="upload-date">
              <h3>Upload Date</h3>
              <p>6/14/2024</p>
            </div>
          </div>
          <p className="description">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry...
          </p>
          <button className="btn btn-primary">Download for Free</button>
          <button className="btn btn-secondary">Buy now for $30</button>
        </div>
      </div>
    );
};

export default ProductDetails;
