import React, { useState, useEffect } from "react";
import {
  fetchTopUSMovies,
  fetchMovieDetails,
} from "../../services/movieService";
import "./TopUS.css";

const TopUS = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const topMovies = await fetchTopUSMovies();
        const movieDetailsPromises = topMovies.map((movie) =>
          fetchMovieDetails(movie.id)
        );
        const movieDetails = await Promise.all(movieDetailsPromises);

        let moviesWithRevenue = topMovies.map((movie, index) => ({
          ...movie,
          revenue: movieDetails[index].revenue || 0,
        }));

        moviesWithRevenue.sort((a, b) => b.revenue - a.revenue);

        moviesWithRevenue = moviesWithRevenue
          .map((movie, index) => ({
            ...movie,
            rank: index + 1, // Add the rank property here
          }))
          .slice(0, 5);

        console.log(moviesWithRevenue);
        setMovies(moviesWithRevenue);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    loadMovies();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="top-us">
      <h3 className="title">Top box office (US)</h3>
      <ul className="movies">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <span className="rank">{movie.rank}</span>
            <div className="movie-info">
              <a
                href={`/movie-details/${movie.id}`}
                key={movie.id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="movie-title">{movie.title}</span>
              </a>

              <span className="revenue">{`$${(movie.revenue / 1000000).toFixed(
                1
              )}M`}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUS;
