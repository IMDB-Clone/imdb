import React from 'react';
import './MovieMedia.css';
// MovieMedia.js
const MovieMedia = ({ imdbRating, totalRatings }) => {
  return (
    <div className="movie-media-container">
      <div className="rating-star">⭐</div>
      <div className="rating-details">
        <div className="rating-value">{imdbRating}/10</div>
        <div className="rating-count">{totalRatings}</div>
      </div>
    </div>
  );
};


export default MovieMedia;
