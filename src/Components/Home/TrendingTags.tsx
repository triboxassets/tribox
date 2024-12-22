import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TrendingTags.css';

const trendingTags = [
  { name: 'models' },
  { name: '3d models' },
  { name: 'NFTs' },
  { name: 'logo pack' },
  { name: 'dashboard' },
  { name: 'HDR' },
];

const TrendingTags = () => {
  const navigate = useNavigate();

  const handleTagClick = (tagName: string) => {
    navigate('/searchresults', { state: { searchQuery: tagName } });
  };

  return (
    <section className="trending-tags-searches">
      <div className="trending-tags-header">
        <span>Trending Searches</span>
      </div>
      <div className="trending-tags-container">
        {trendingTags.map((tag, index) => (
          <div
            key={index}
            className="trending-tag"
            onClick={() => handleTagClick(tag.name)}
          >
            <span className="trending-tag-text">{tag.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingTags;