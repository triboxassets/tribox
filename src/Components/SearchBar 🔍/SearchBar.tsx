import React, { useState } from 'react';
import {
  UilSearch,
  UilEstate,
  UilCube,
  UilImage,
  UilPicture,
  UilMusic,
  UilCamera,
  UilPresentationEdit,
  UilFont,
  UilLayerGroup
} from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ArrowIcon from '../../Assets/arrow.svg';
import './SearchBar.css';
import dummyDatabase from '../../dummydatabase.json'; // Assuming this is the JSON file location

const SearchBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    name: "All Items",
    icon: <UilEstate />
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate(); // Initialize navigate

  // Categories with Unicons
  const categories = [
    { name: "All Items", icon: <UilEstate /> },
    { name: "3D Models", icon: <UilCube /> },
    { name: "Mockups", icon: <UilImage /> },
    { name: "Templates", icon: <UilPicture /> },
    { name: "Audio", icon: <UilMusic /> },
    { name: "Photos", icon: <UilCamera /> },
    { name: "Presentation Templates", icon: <UilPresentationEdit /> },
    { name: "Fonts", icon: <UilFont /> },
    { name: "Misc", icon: <UilLayerGroup /> }
  ];

  const handleCategoryClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filteredSuggestions = dummyDatabase.filter(item => {
        const matchesCategory =
          selectedCategory.name === "All Items" || item.productType === selectedCategory.name;
        const matchesQuery =
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())));

        return matchesCategory && matchesQuery;
      });

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery) {
      navigate('/searchresults', {
        state: {
          searchQuery,
          category: selectedCategory.name,
        },
      });
    }
  };

  return (
    <div className="search-bar">
      <div className="search-container">
        <div className="search-category" onClick={handleCategoryClick}>
          <div className="category-label">
            {selectedCategory.icon}
            <span>{selectedCategory.name}</span>
          </div>
          <img
            src={ArrowIcon}
            alt="Arrow Icon"
            className={`arrow-icon ${isDropdownOpen ? 'open' : ''}`}
          />
        </div>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Search for assets..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-icon-container">
            <UilSearch className="search-icon" />
          </button>
        </form>
      </div>
      {isDropdownOpen && (
        <ul className="dropdown-menu">
          {categories.map((category) => (
            <li
              key={category.name}
              className="dropdown-item"
              onClick={() => handleCategorySelect(category)}
            >
              {category.icon}
              {category.name}
            </li>
          ))}
        </ul>
      )}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} className="suggestion-item">
              <img src={suggestion.thumbnail} alt={suggestion.title} className="suggestion-thumbnail" />
              <div className="suggestion-text">
                <h4>{suggestion.title}</h4>
                <p>{suggestion.productType}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;