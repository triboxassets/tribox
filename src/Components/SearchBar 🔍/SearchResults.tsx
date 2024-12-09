import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar ⬆️/Navbar.tsx';
import WorkCard from '../WorkCard 😀/WorkCard.tsx';
import Footer from '../Footer 🦶🏼/Footer.tsx';
import dummyDatabase from '../../dummydatabase.json';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const { searchQuery } = location.state || {};
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const results = dummyDatabase.filter((item: any) =>
        [item.title, item.productType, ...item.tags].some(
          (field) =>
            typeof field === 'string' &&
            field.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredResults(results);
    }
  }, [searchQuery]);

  const groupByProductType = (results: any[]) =>
    results.reduce((acc: Record<string, any[]>, item: any) => {
      const type = item.productType || 'Uncategorized';
      if (!acc[type]) acc[type] = [];
      acc[type].push(item);
      return acc;
    }, {});

  const groupedResults = groupByProductType(filteredResults);

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case '3D Models': return '#ED254E';
      case 'Mockups': return '#FFBE0B';
      case 'Template': return '#A0ECD0';
      case 'Photos': return '#E5C1BD';
      case 'Fonts': return '#61E294';
      default: return '#CCC';
    }
  };

  return (
    <>
      <Navbar isScrolled={isScrolled} /> {/* Pass the scroll state to Navbar */}
      <div className="container">
        {searchQuery && (
          <>
            <h2 className="search-heading">Assets and Templates For</h2>
            <p className="query-text gradient-text">{searchQuery}</p>
            <div className="query-line"></div>
          </>
        )}
        <div className="search-results">
          {Object.keys(groupedResults).length > 0 ? (
            Object.entries(groupedResults).map(([productType, items]) => (
              <div key={productType} className="product-type-section">
                <h3
                  className="product-type-heading"
                  style={{
                    borderColor: getCategoryColor(productType),
                    color: getCategoryColor(productType), // Dynamic text color
                  }}
                >
                  {productType}
                  <span className="result-count"> ({items.length} results)</span>
                </h3>
                <div className="product-type-grid">
                  {items.map((item) => (
                    <WorkCard
                      key={item.id}
                      productId={item.id}
                      buttonText="View Details"
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No results found for "{searchQuery}"</p>
          )}
        </div>
        <div className="end-section">
          <div className="end-text">
            <h2>
              End of the line, <span className="highlight-text">Cowboy.</span>
            </h2>
            <div className="end-line"></div>
            <h4>We hope you found what you were looking for!</h4>
            <button className="go-to-store-button">Go to store</button>
          </div>
          <img
            className="end-image"
            src={require('../../Assets/gbsticker.png')}
            alt="End Illustration"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
