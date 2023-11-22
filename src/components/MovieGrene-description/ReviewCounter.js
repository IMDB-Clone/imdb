import React, { useState, useEffect } from 'react';
import { fetchTotalReviews } from '../../services/DetailService'; // Adjust the import path as needed

const ReviewCounter = ({movieId}) => {

    const [totalReviews, setTotalReviews] = useState(0);


    useEffect(() => {
        fetchTotalReviews(movieId)
            .then(total => setTotalReviews(total))
            .catch(err => console.error('Failed to fetch total reviews:', err));
    }, [movieId]);
    const navigateToReviewsPage = () => {
        // Replace '/reviews' with the path to your reviews page
      ///  history.push(`/reviews/${movieId}`);
    };

    return (
        <p   onClick={navigateToReviewsPage} style={{ cursor: 'pointer' ,color : "black" }}>
            {totalReviews} User reviews
        </p>
    );
};

export default ReviewCounter;
