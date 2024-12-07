// TrendingTags.tsx
import React from 'react';
import './TrendingTags.css'; // Make sure to create this CSS file if it's not created

const trendingTags = [
  { name: 'models', background: '#0D0C12', borderColor: '#31121A' },
  { name: '3d models', background: '#0D0C12', borderColor: '#31121A' },
  { name: 'NFTs', background: '#ED254E', borderColor: '#31121A' },
  { name: 'logo pack', background: '#0D0C12', borderColor: '#31121A' },
  { name: 'dashboard', background: '#0D0C12', borderColor: '#31121A' },
  { name: 'HDR', background: '#0D0C12', borderColor: '#31121A' },
];

const TrendingTags = () => {
  return (
    <section className="trending-searches">
      <div className="trending-searches-header">
        <span>Trending Searches</span>
      </div>
      <div className="tags-container">
        {trendingTags.map((tag, index) => (
          <div
            key={index}
            className="tag"
            style={{ background: tag.background, borderColor: tag.borderColor }}
          >
            <span className="tag-text">{tag.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingTags;