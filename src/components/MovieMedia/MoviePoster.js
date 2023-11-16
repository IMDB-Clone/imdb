import React from 'react';
import './MoviePoster.css'; // Your custom styles

const MoviePoster = ({ posterUrl }) => {
  return (
    <div className="movie-poster col-12 col-md-6">
      <img src={posterUrl} alt="Movie Poster" className="img-fluid" />
      <button className="ribbon-button btn btn-danger">+</button>
    </div>
  );
};

export default MoviePoster;
