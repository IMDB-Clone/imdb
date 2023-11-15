import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieTrailers from '../../components/MovieTrailers/MovieTrailers';

const MovieDetailsPage = () => {
  const { id } = useParams(); // This grabs the movie ID from the URL
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    // Assuming you have a function to fetch movie details
    const fetchMovieDetails = async () => {
      // ... fetch logic here ...
      // setMovieDetails with the fetched data
    };

    fetchMovieDetails();
  }, [id]);

  // Placeholder for share functionality
  const handleShare = (platform) => {
    console.log(`Share on ${platform}`);
    // Implement share functionality here
  };

  if (!movieDetails) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="movie-details-page">
      <h1>{movieDetails.title}</h1>
      {/* ... other movie details ... */}
      
      {/* Include the MovieTrailers component */}
      <MovieTrailers movieId={id} />

      {/* Share dropdown menu */}
      <DropdownButton id="dropdown-item-button" title="Share">
        <Dropdown.Item as="button" onClick={() => handleShare('Facebook')}>
          Facebook
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => handleShare('Twitter')}>
          Twitter
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => handleShare('Copy Link')}>
          Copy Link
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default MovieDetailsPage;
