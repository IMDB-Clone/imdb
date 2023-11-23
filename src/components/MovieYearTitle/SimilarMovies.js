// SimilarMovies.js
import React, { useState, useEffect } from "react";
import { fetchSimilarMovies } from "../../services/DetailService";
import default_poster from "../../assets/default_poster.png";
import './SimilarMovies.css';

const SimilarMovies = ({ movieId }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSimilarMovies(movieId)
      .then(setMovies)
      .catch((error) => {
        setError(error.message);
      });
  }, [movieId]);

  if (error) {
    return <div>Error fetching similar movies: {error}</div>;
  }

  if (movies.length === 0) {
    return <div>Loading similar movies...</div>;
  }

  return (
    <div>
      <h2>Similar Movies</h2>
      <div className="similar-movies-list">
        {movies.map((movie) => (
          <div key={movie.id} className="similar-movie-card">
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : default_poster}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarMovies;
