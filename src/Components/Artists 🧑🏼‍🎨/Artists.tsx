import React, { useState } from 'react';
import './Artists.css';
import ArtistCard from './ArtistCard.tsx';
import dummyArtists from '../../dummyartists.json';
import dummyDatabase from '../../dummydatabase.json';
import Navbar from '../Navbar ⬆️/Navbar.tsx';
import Footer from '../Footer 🦶🏼/Footer.tsx';

const Artists: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showFeatured, setShowFeatured] = useState(false);

  const filteredArtists = dummyArtists.filter(artist => {
    const matchesSearch = artist.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || artist.tags.includes(selectedFilter);
    const matchesFeatured = !showFeatured || artist.proStatus;
    return matchesSearch && matchesFilter && matchesFeatured;
  });

  const getImagesByIds = (ids: string[]) => {
    return ids.map(id => {
      const art = dummyDatabase.find(item => item.id === id);
      return art ? art.featuredImage.src : '';
    }).filter(src => src !== '');
  };

  return (
    <div className="artists-container">
      <Navbar />
      <div className="main-content">
        <div className="top-banner">
          <img src="/assets/topbord.gif" alt="Top Banner" className="top-banner-img" />
        </div>
        <div className="header-container">
          <h2 className="all-designers">All Designers<span className="dot">.</span></h2>
        </div>
        <div className="filter-bar">
          <div className="filters">
            {['All', 'Product Design', 'Web Design', 'Illustration', 'Mockups', 'Fonts', 'Photography', 'Abstract', 'Branding'].map((filter) => (
              <button 
                key={filter} 
                className={`filter-button ${selectedFilter === filter ? 'active' : ''}`} 
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="filter-inputs">
            <input 
              type="text" 
              placeholder="Search by name" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="search-bar-artists"
            />
            <div className="featured-artists">
              <label>Featured Artists</label>
              <div className="toggle-switch">
                <input 
                  type="checkbox" 
                  id="featured-toggle" 
                  checked={showFeatured} 
                  onChange={() => setShowFeatured(!showFeatured)} 
                />
                <label htmlFor="featured-toggle" className="toggle-label"></label>
              </div>
            </div>
          </div>
        </div>
        <div className="artists-list">
          {filteredArtists.map((artist, index) => (
            <ArtistCard
              key={index}
              name={artist.fullName}
              location={artist.location}
              responseTime={`Followers: ${artist.followers}`}
              images={getImagesByIds(artist.artIds)}
              tags={artist.tags}
              isPro={artist.proStatus}
              profilePhoto={artist.profilePhoto}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Artists;