import React, { useState, useEffect } from 'react';
import { fetchGenresAndOverview } from '../../services/DetailService'; // Adjust the path as necessary
import './Genres.css';

const GenresMovieOverview = ({ movieId }) => { // Destructuring movieId directly
  const [genres, setGenres] = useState([]);
  const [movieSummary, setMovieSummary] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGenresAndOverview(movieId);
        setGenres(data.genres);
        setMovieSummary(data.overview);
      } catch (error) {
        console.error('Failed to fetch genres and overview:', error);
      }
    };

    fetchData();
  }, [movieId]); // Added movieId as a dependency

  return (
    <div className="Genres">
      <div className="Genres-container">
        {genres.map((genre, index) => (
          <button key={index} className="Genres-item">
            {genre.name}
          </button>
        ))}
      </div>
      <div className="Movie-summary">
        <p>{movieSummary}</p>
      </div>
    </div>
  );
};

export default GenresMovieOverview;
