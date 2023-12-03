import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTotalReviews } from '../../services/DetailService'; // Adjust the import path as needed
const ReviewCounter = ({ movieId }) => {
    const [totalReviews, setTotalReviews] = useState(0);
    const navigate = useNavigate(); // Add this line

    useEffect(() => {
        fetchTotalReviews(movieId)
            .then(total => setTotalReviews(total))
            .catch(err => console.error('Failed to fetch total reviews:', err));
    }, [movieId]);

    const navigateToReviewsPage = () => {
        navigate(`/movie-reviewing/${movieId}`); // Update the path as needed
    };

    return (
        <p onClick={navigateToReviewsPage} style={{ cursor: 'pointer', color: "light blue" }}>
            {totalReviews} User reviews
        </p>
    );
};

export default ReviewCounter;

