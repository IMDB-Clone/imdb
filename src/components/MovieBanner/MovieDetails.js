import React from 'react';
import './MovieDetails.css';

const MovieDetails = ({ movie }) => {
  return (
    <div className="col-md-8">
      <h1 className="movie-title">{movie.title}</h1>
      <p className="movie-info">
        {movie.year} • {movie.rating} • {movie.duration}
      </p>
    </div>
  );
};

export default MovieDetails;
