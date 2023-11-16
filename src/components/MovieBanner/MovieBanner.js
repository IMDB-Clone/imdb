import React, { useState, useEffect } from 'react';
import './MovieBanner.css'; // Import the CSS for MovieBanner
import MovieDetails from './MovieDetails';
import MovieRatings from './MovieRatings';

const MovieBanner = () => {
  const [movie, setMovie] = useState({
    title: '',
    year: '',
    rating: '',
    duration: '',
    imdbRating: '',
    totalRatings: '',
    yourRating: null,
    popularity: ''
  });
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
        const response = await fetch('YOUR_API_ENDPOINT');
        const data = await response.json();

        // Assuming the API returns movie data in a format similar to our state structure
        setMovie({
          title: data.title,
          year: data.year,
          rating: data.rating,
          duration: data.duration,
          imdbRating: data.imdbRating,
          totalRatings: data.totalRatings,
          yourRating: data.yourRating, // This would be dynamic based on user's action
          popularity: data.popularity
        });
      } catch (error) {
        console.error('Failed to fetch movie data:', error);
      }
    };

    fetchMovieData();
  }, []); // The empty array ensures this effect runs only once after the initial render

  return (
    <div className="movie-banner">
      <div className="container movie-banner-container">
        {/*Love you Saeed */}
        <MovieDetails movie={movie} />
        <MovieRatings movie={movie} />
      </div>
    </div>
  );
};

export default MovieBanner;
