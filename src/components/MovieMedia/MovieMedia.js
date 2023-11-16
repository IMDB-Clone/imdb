import React from 'react';
import MoviePoster from './MoviePoster';
import MovieTrailer from './MovieTrailer';

const MovieMedia = ({ posterUrl, trailerUrl, title }) => {
  return (
    <div className="row movie-media">
      <MoviePoster posterUrl={posterUrl} />
      <MovieTrailer trailerUrl={trailerUrl} title={title} />
    </div>
  );
};

export default MovieMedia;
