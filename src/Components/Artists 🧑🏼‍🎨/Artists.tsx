import React from 'react';
import './Artists.css';
import ArtistCard from './ArtistCard.tsx';
import dummyArtists from '../../dummyartists.json'; // Import the JSON data

const Artists: React.FC = () => {
  return (
    <div className="artists-container">
      <div className="filter-bar">
        <h2>All Designers</h2>
        <div className="filters">
          <button className="filter-button">All</button>
          <button className="filter-button">Product Design</button>
          <button className="filter-button">Web Design</button>
          <button className="filter-button">Illustration</button>
        </div>
        <div className="filter-inputs">
          <input type="text" placeholder="Enter Budget" />
          <input type="text" placeholder="Enter Location" />
        </div>
        <div className="pro-designers">
          <label>PRO Designers</label>
          <input type="checkbox" />
        </div>
      </div>

      <div className="artists-list">
        {dummyArtists.map((artist, index) => (
          <ArtistCard
            key={index}
            name={artist.fullName}
            location={artist.location}
            responseTime={`Followers: ${artist.followers}`}  // Using followers as response time equivalent
            images={artist.artIds.map((id) => `/path-to-art${id}.png`)}  // Adjust image paths based on artIds
            tags={artist.tags}
            isPro={artist.proStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default Artists;
