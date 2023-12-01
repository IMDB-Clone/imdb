// MovieInfoComponent.js

import React from 'react';
import './MovieInfo.css'; // Your custom styles for non-bootstrap specific styling

const MovieInfo = ({ movieDetails }) => {
  return (
    <div className="movie-info container">
      <div className="row">
        <div className="col-12">
          <h1 className="movie-title">{movieDetails.title}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="movie-poster-container">
            <img
              className="movie-poster img-fluid"
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="movie-genres d-flex flex-wrap">
            {movieDetails.genres.map((genre) => (
              <span key={genre.id} className="genre-bubble">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
