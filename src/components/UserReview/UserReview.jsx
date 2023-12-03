import React, { useState, useEffect } from 'react';
import './UserReview.css';
import { fetchMovieDetails } from '../../services/movieService';

const UserReview = ({ uid }) => {
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
    <div className="user-reviews">
      <h3 onClick={toggleVisibility} style={{ cursor: 'pointer' }}>User Reviews</h3>
      {isVisible && (
        <ul>
          {reviewsWithDetails.map((review, index) => (
            <li key={index} className="review-item">
              <strong>{review.movieDetails?.title} ({review.movieDetails?.release_date}):</strong>
              <p><em>Rating:</em> {review.rating} / 5</p>
              <p><em>Headline:</em> {review.headline}</p>
              <p><em>Content:</em> {review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserReview;
