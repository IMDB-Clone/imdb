import React, { useState, useEffect } from 'react';
import './Ratings.css';
import { fetchMovieDetails } from '../../services/movieService'; // Ensure this path is correct

const Ratings = ({ uid }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [reviewsWithDetails, setReviewsWithDetails] = useState([]);

  useEffect(() => {
    if (uid) {
      fetchUserReviews(uid);
    }
  }, [uid]);

  const fetchUserReviews = async (uid) => {
    try {
      const response = await fetch(`http://localhost:3001/api/reviews/user/${uid}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const reviews = await response.json();

      // Fetch movie details for each review
      const reviewsWithMovieDetails = await Promise.all(reviews.map(async (review) => {
        try {
          const movieDetails = await fetchMovieDetails(review.movieId);
          return { ...review, movieDetails };
        } catch (error) {
          console.error('Error fetching movie details:', error);
          return review; // Return review without movie details in case of error
        }
      }));

      setReviewsWithDetails(reviewsWithMovieDetails);
    } catch (error) {
      console.error('Error fetching user reviews:', error);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="ratings">
      <h3 onClick={toggleVisibility} style={{ cursor: 'pointer' }}>User Ratings</h3>
      {isVisible && (
        <ul>
          {reviewsWithDetails.map((review, index) => (
            <li key={index} className="review-item">
              <strong>{review.movieDetails?.title}: </strong> {review.rating} / 10
              {/* <p>{review.headline}</p> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Ratings;
