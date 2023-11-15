import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUpcomingMovies } from "../../services/movieService";
import "./ComingSoon.css";
import playButton1 from "../../assets/play-button1.png";
import playButton2 from "../../assets/play-button2.png";
import default_poster from "../../assets/default_poster.png";

const ComingSoon = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies = await fetchUpcomingMovies();
        setUpcomingMovies(movies);
      } catch (error) {
        setError(error.message);
      }
    };

    getMovies();
  }, []);

  if (error) {
    return <div>Error fetching movies: {error}</div>;
  }

  if (upcomingMovies.length === 0) {
    return <div>Loading...</div>;
  }

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleMouseEnter = (movieId) => {
    setHoveredMovieId(movieId); 
  };

  const handleMouseLeave = () => {
    setHoveredMovieId(null); 
  };

  return (
    <div className="coming-soon">
      <h2>Coming Soon</h2>
      <div className="movies-list">
        {upcomingMovies.map((movie) => (
          <div
            key={movie.id}
            className="movie-item"
            onClick={() => handleMovieClick(movie.id)}
          >
            <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : default_poster
                }
              alt={movie.title}
            />
            <div className="movie-info">
              <button className="play-button">
                <img
                  src={hoveredMovieId === movie.id ? playButton2 : playButton1}
                  alt="Play Trailer"
                  onMouseEnter={() => handleMouseEnter(movie.id)}
                  onMouseLeave={handleMouseLeave}
                />
              </button>
              <p>{movie.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComingSoon;