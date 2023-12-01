import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchTotalReview } from '../../services/DetailService';
import './MovieReviews.css'; // Ensure this is the correct path to your CSS file

const MovieCounterAndReviews = ({ movieId }) => {
    const [reviews, setReviews] = useState([]);
    const [sortType, setSortType] = useState('featured');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetching reviews from the external API
                const externalReviews = await fetchTotalReview(movieId);

                // Fetching reviews from your database
                const response = await axios.get(`http://localhost:3001/api/reviews/${movieId}`);
                const databaseReviews = response.data;

                // Combine both sets of reviews
                const combinedReviews = [...externalReviews, ...databaseReviews];

                setReviews(combinedReviews);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [movieId]);

    // Sort function
    const sortReviews = (reviews, sortType) => {
        switch (sortType) {
            case 'date':
                return [...reviews].sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt));
            case 'rating':
                // Assuming default rating as 0 if not available
                return [...reviews].sort((a, b) => {
                    const ratingA = a.author_details?.rating || a.rating || 0;
                    const ratingB = b.author_details?.rating || b.rating || 0;
                    return ratingB - ratingA;
                });
            default:
                return reviews;
        }
    };

    useEffect(() => {
        setReviews(revs => sortReviews(revs, sortType));
    }, [sortType]);
    console.log(reviews);

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
            <span className="review-rating">★ {review.author_details?.rating ?? review.rating}/10</span>
            <span className="review-author">{review.author}</span>
            <span className="review-date">
              {review.created_at ? new Date(review.created_at).toLocaleDateString() : review.createdAt}
            </span>
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
