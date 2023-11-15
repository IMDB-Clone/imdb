import React, { useState, useEffect } from 'react';
import { fetchTopUSMovies, fetchMovieDetails } from '../../services/movieService';
import watchlistIcon from '../../assets/watchlist.png';
import watchlistedIcon from '../../assets/watchlisted.png';
import './TopUS.css';

const TopUS = () => {
    const [movies, setMovies] = useState([]);
    const [watchlistedMovies, setWatchlistedMovies] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const topMovies = await fetchTopUSMovies();
        const movieDetailsPromises = topMovies.map((movie) => fetchMovieDetails(movie.id));
        const movieDetails = await Promise.all(movieDetailsPromises);

        let moviesWithRevenue = topMovies.map((movie, index) => {
          return {
            ...movie,
            revenue: movieDetails[index].revenue || 0
          };
        });

        moviesWithRevenue.sort((a, b) => b.revenue - a.revenue);

        moviesWithRevenue = moviesWithRevenue.slice(0, 5);

        setMovies(moviesWithRevenue);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    loadMovies();
  }, []);

  const toggleWatchlist = (movieId) => {
    setWatchlistedMovies((prevWatchlistedMovies) => {
      const updatedWatchlistedMovies = new Set(prevWatchlistedMovies);
      if (updatedWatchlistedMovies.has(movieId)) {
        updatedWatchlistedMovies.delete(movieId);
      } else {
        updatedWatchlistedMovies.add(movieId);
      }
      return updatedWatchlistedMovies;
    });
  };

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
            <button className="watchlist-button" onClick={() => toggleWatchlist(movie.id)}>
              <img 
                src={watchlistedMovies.has(movie.id) ? watchlistedIcon : watchlistIcon}
                alt="Toggle watchlist"
              />
            </button>
            <div className="movie-info">
              <span className="movie-title">{movie.title}</span>
              <span className="revenue">{`$${(movie.revenue / 1000000).toFixed(1)}M`}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUS;
