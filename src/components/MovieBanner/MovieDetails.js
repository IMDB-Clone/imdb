import React from 'react';
import './MovieDetails.css';

const MovieDetails = ({ movie }) => {
  return (
    <div className="col">
      <h1 className="movie-title1">{movie.title}</h1>
      <p className="movie-info">
        {movie.year} • {movie.duration} minutes
      </p>
    </div>
  );
};

export default MovieDetails;
