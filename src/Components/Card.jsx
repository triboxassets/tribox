// src/components/Card.js

import React from 'react';

const Card = ({ imageSrc, title, description, buttonText }) => {
  return (
    <div className="work-card">
      <img className="work-card-image" src={imageSrc} alt={title} />
      <h3 className="work-card-title">{title}</h3>
      <p className="work-card-description">{description}</p>
      <button className="work-card-button">{buttonText}</button>
    </div>
  );
};

export default Card;
