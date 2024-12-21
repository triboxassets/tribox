import React from 'react';
import './ArtistCard.css';

interface ArtistCardProps {
  name: string;
  location: string;
  responseTime: string;
  images: string[];
  tags: string[];
  isPro: boolean;
  profilePhoto: string;
  price?: string;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ 
  name, 
  location, 
  responseTime, 
  images, 
  tags, 
  isPro, 
  profilePhoto, 
  price 
}) => (
  <div className="artist-card">
    <div className="artist-header">
      <h3>{name}</h3>
      {isPro && <span className="featured-badge">Featured</span>}
    </div>
    <div className="artist-info">
      <img src={profilePhoto} alt={`${name}'s profile`} className="profile-photo" />
      <div>
        <p className="artist-location">{location}</p>
        <p className="artist-response">{price || responseTime}</p>
      </div>
    </div>
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

export default ArtistCard;