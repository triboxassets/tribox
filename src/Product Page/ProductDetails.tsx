import React from 'react';
import './ProductDetails.css'; 
import { ReactComponent as StarIcon } from '../Assets/Star.svg'; // Import the star.svg as a React component
import ReactMarkdown from 'react-markdown'; // Import react-markdown to parse markdown content

interface ProductDetailsProps {
  product: {
    title: string;
    descriptionHtml: string;
    metafields: { key: string; value: string }[];
    tags: string[];
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const { title, descriptionHtml, metafields, tags } = product;
    const rating = metafields.find((field) => field.key === 'rating')?.value || 'N/A';
    const uploadDate = metafields.find((field) => field.key === 'upload_date')?.value || 'Unknown';
    const author = metafields.find((field) => field.key === 'author')?.value || 'Unknown';

    return (
      <div className="product-details">
        <div className="details-left">
          <h1>{title}</h1>
          <p className="rating">
            <span className="custom-rating-box">
              <StarIcon className="star-icon" /> {rating}
            </span>
          </p>
          <div className="author-upload">
            <div className="author">
              <h3>Author</h3>
              <div className="author-info">
                <img className="author-image" src="../Assets/profile.png" alt="Author" />
                <p>{author}</p>
              </div>
            </div>
            <div className="upload-date">
              <h3>Upload Date</h3>
              <p>{uploadDate}</p>
            </div>
          </div>
          <div className="description">
            <ReactMarkdown>{descriptionHtml}</ReactMarkdown> {/* Render HTML description */}
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
