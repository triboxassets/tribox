import React from 'react';
import './Snowflakes.css';

const Snowflakes: React.FC<{ count: number }> = ({ count }) => (
  <div className="snow-container">
    {Array.from({ length: count }).map((_, i) => (
      <div 
        key={i} 
        className="snowflake" 
        style={{
          left: `${Math.random() * 100}vw`, // Random horizontal position (0-100% of viewport width)
          animationDuration: `${Math.random() * 5 + 5}s`, // Random animation duration (between 5-10 seconds)
          animationDelay: `${Math.random() * 5}s`, // Optional: random delay before they start falling
          width: `${Math.random() * 4 + 3}px`, // Random width between 3px and 7px (square)
          height: `${Math.random() * 4 + 3}px`, // Random height between 3px and 7px (square)
        }}
      />
    ))}
  </div>
);

export default Snowflakes;
