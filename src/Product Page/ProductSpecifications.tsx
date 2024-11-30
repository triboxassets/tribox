import React from 'react';
import './ProductSpecifications.css';

const ProductSpecifications = () => {
  return (
    <div className="details-right">
      <h2>Specifications</h2>
      <ul>
        <li><strong>Formats:</strong> .eps, .obj</li>
        <li><strong>Polygons:</strong> 784,570</li>
        <li><strong>Vertices:</strong> 789,755</li>
        <li><strong>Geometry:</strong> Tris/Quads</li>
      </ul>
    </div>
  );
};

export default ProductSpecifications;
