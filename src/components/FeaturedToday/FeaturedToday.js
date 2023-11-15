import React, { useState, useEffect } from "react";
import { fetchPopularMovies } from "../../services/movieService";
import "./FeaturedToday.css";

const FeaturedToday = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const moviesData = await fetchPopularMovies();
        const selectedMovies = moviesData
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setMovies(selectedMovies);
      } catch (error) {
        console.error("Failed to fetch featured today movies:", error);
      }
    };

    getPopularMovies();
  }, []);

  return (
    <div className="featured-today">
      <h2>Featured today</h2>
      <div className="movies-container">
        {movies.map((movie) => (
          <a href={`/movie/${movie.id}`} key={movie.id} className="movie-item ">
            {" "}
            <div className="custom-movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>{" "}
          </a>
        ))}
      </div>
    </div>
  );
};

export default FeaturedToday;
