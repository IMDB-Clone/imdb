import React from 'react';
import './MovieTrailer.css'; // Your custom styles

const MovieTrailer = ({ trailerUrl, title }) => {
  return (
    <div className="movie-trailer col-12 col-md-6 text-center">
      <h2>A Guide to the Films of {title}</h2>
      <button className="btn btn-primary" onClick={() => window.open(trailerUrl, "_blank")}>
        Play clip 2:09
      </button>
    </div>
  );
};

export default MovieTrailer;
