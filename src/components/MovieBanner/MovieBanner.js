import React, { useState, useEffect } from 'react';
import { fetchMovieData } from '../../services/DetailService'; // Adjust the path as necessary
import './MovieBanner.css';
import MovieDetails from './MovieDetails';
import MovieRatings from './MovieRatings';

const MovieBanner = ({movieId , Session_ID}) => {
  

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
    const fetchData = async () => {
      try {
        const movieData = await fetchMovieData(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error('Failed to fetch movie data:', error);
      }
    };

    fetchData();
  }, [movieId]);
   // The empty array ensures this effect runs only once after the initial render

  return (
    <div className="movie-banner">
      <div className="container movie-banner-container">
        {/* Love you Saeed */}
        <MovieDetails movie={movie} />
        <MovieRatings movie={movie} movieId={movieId} Session_ID={Session_ID} />
      </div>
    </div>
  );
};

export default MovieBanner;