import React, { useState, useEffect } from 'react';
import { fetchTotalReview } from '../../services/DetailService';
import './MovieReviews.css'; // Ensure this is the correct path to your CSS file

const MovieCounterAndReviews = ({ movieId }) => {
    const [reviews, setReviews] = useState([]);
    const [sortType, setSortType] = useState('featured');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTotalReview(movieId);
                setReviews(data); // Assuming this is the correct format
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [movieId]);

    // Sort function that can be run without including 'reviews' in the dependency array
    const sortReviews = (reviews, sortType) => {
      switch (sortType) {
        case 'date':
          return [...reviews].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        case 'rating':
          return [...reviews].sort((a, b) => b.author_details.rating - a.author_details.rating);
        default:
          return reviews;
      }
    };

    useEffect(() => {
        setReviews(revs => sortReviews(revs, sortType));
    }, [sortType]);

    return (
        <div className="movie-reviews-container">
            <div className="sort-select">
                <label htmlFor="sortby">Sort by: </label>
                <select id="sortby" value={sortType} onChange={(e) => setSortType(e.target.value)}>
                    <option value="featured">Featured</option>
                    <option value="date">Date</option>
                    <option value="rating">Rating</option>
                </select>
            </div>
            {reviews.map(review => (
                <div key={review.id} className="review-card">
                    <div className="review-header">
                        <span className="review-rating">★ {review.author_details.rating}/10</span>
                        <span className="review-author">{review.author}</span>
                        <span className="review-date">{new Date(review.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="review-content">{review.content}</p>
                    <div className="review-helpful">
                        <button className="helpful-button">Yes</button>
                        <button className="helpful-button">No</button>
                        <span>Helpfulness count</span> {/* Replace with actual data */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MovieCounterAndReviews;
