import React from 'react';

interface ArtistCardProps {
  name: string;
  location: string;
  responseTime: string;
  images: string[];
  tags: string[];
  isPro: boolean;
  price?: string;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ 
  name, 
  location, 
  responseTime, 
  images, 
  tags, 
  isPro, 
  price 
}) => {
  return (
    <div className="artist-card">
      <div className="artist-header">
        <h3>{name}</h3>
        {isPro && <span className="pro-badge">PRO</span>}
      </div>
      <p className="artist-location">{location}</p>
      {price ? (
        <p className="artist-price">{price}</p>
      ) : (
        <p className="artist-response">{responseTime}</p>
      )}
      <div className="artist-images">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Art ${index + 1}`} className="artist-image" />
        ))}
      </div>
      <div className="artist-tags">
        {tags.map((tag, index) => (
          <span key={index} className="artist-tag">{tag}</span>
        ))}
      </div>
      <button className="get-in-touch-button">Get in touch</button>
    </div>
  );
};

export default ArtistCard;
