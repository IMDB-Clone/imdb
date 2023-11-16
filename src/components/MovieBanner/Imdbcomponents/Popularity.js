// Popularity.js
import React from 'react';
import './Popularity.css';
import popularityIcon from './Screenshot 2023-11-16 135155.png'; // Correct the import path

const Popularity = ({ popularity }) => {
  return (
    <div className="popularity-container">
      <img src={popularityIcon} alt="Popularity Icon" className="popularity-icon" />
      <span className="popularity-value">{popularity}</span>
    </div>
  );
};

export default Popularity;
