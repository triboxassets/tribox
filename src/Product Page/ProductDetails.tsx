import React from 'react';
import './ProductDetails.css'; 
import { ReactComponent as StarIcon } from '../Assets/Star.svg'; // Import the star.svg as a React component
import ReactMarkdown from 'react-markdown'; // Import react-markdown to parse markdown content

const ProductDetails: React.FC = () => {
    const description = `
    # Lorem Ipsum
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    
    ## Features
    - Easy to use
    - Lightweight
    - High quality

    For more information, visit [our website](https://example.com)
    `;

    // Dummy tags data
    const tags = ["3D Models", "GLTF", "Rendering", "Textures"];

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
          <div className="description">
            <ReactMarkdown>{description}</ReactMarkdown> {/* Render Markdown description */}
          </div>
          
          {/* Tags Section */}
          <div className="ProductDetails-tags">
            <h3>Tags:</h3>
            <div className="tags-container">
              {tags.map((tag, index) => (
                <span key={index} className="ProductDetails-tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Download Poster Link */}
          <div className="download-poster-link">
            <a href="https://example.com/download" target="_blank" rel="noopener noreferrer">
              Download this listing as a cool poster
            </a>
          </div>

          <button className="btn btn-primary">Download for Free</button>
          <button className="btn btn-secondary">Buy now for $30</button>
        </div>
      </div>
    );
};

export default ProductDetails;
