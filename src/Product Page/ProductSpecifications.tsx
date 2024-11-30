import React from 'react';
import './ProductSpecifications.css';

const ProductSpecifications = () => {
  return (
    <div className="product-specs-container">
      <div className="specs-section">
        <div className="formats-available">
          <h3>Formats Available</h3>
          <div className="format-buttons">
            <button className="format-btn">.eps</button>
            <button className="format-btn">.obj</button>
          </div>
        </div>

        <div className="product-id">
          <h3>Product ID</h3>
          <p>13fiomoasfj-11ad</p>
        </div>

        <div className="software-used">
          <h3>Software Used</h3>
          <div className="software-logos">
            <img src="blender-logo.png" alt="Blender" />
            <img src="photoshop-logo.png" alt="Photoshop" />
          </div>
        </div>

        <div className="model-info">
          <div className="model-stat">
            <h4>Polygons</h4>
            <p>784,570</p>
          </div>
          <div className="model-stat">
            <h4>Vertices</h4>
            <p>789,755</p>
          </div>
          <div className="model-stat">
            <h4>Geometry</h4>
            <p>Tris/Quads</p>
          </div>
        </div>

        <div className="includes-section">
          <h3>Includes</h3>
          <div className="includes-icons">
            <img src="textures-icon.png" alt="Textures" />
            <img src="uvs-icon.png" alt="UVs" />
            <img src="brushes-icon.png" alt="Brushes" />
          </div>
        </div>

        <div className="licence-section">
          <h3>Open Licence</h3>
          <p>You can use this template/model however you want...</p>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecifications;
