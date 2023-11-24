// RatingButton.js
import React from 'react';
import './RatingButton.css';

const RatingButton = ({ movieId, rating, hasRated, onClick }) => {
  const buttonLabel = hasRated ? `${rating}/10` : 'Rate';
  const buttonClass = hasRated ? 'rated' : '';

  return (
    <div className={`rating-button ${buttonClass}`} onClick={() => onClick(movieId)}>
      <span className="star">&#9733;</span>
      <span className="button-label">{buttonLabel}</span>
    </div>
  );
};

export default RatingButton;
