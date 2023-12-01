import React, { useState, useEffect } from 'react';
import { fetchMovieDetails } from '../../services/DetailService';
import ReviewPopup from '../ReviewPopup/ReviewPopup'; // Import ReviewPopup and ensure the path is correct
import './MovieYearTitleComponent.css'; // Make sure to create and use the correct CSS file

const MovieYearTitleComponent = ({ movieId ,Session_ID}) => {
    const [movie, setMovie] = useState(null);
    const [showReviewPopup, setShowReviewPopup] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMovieDetails(movieId);
                setMovie(data); // Store the entire movie object
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [movieId]);

    const togglePopup = () => {
        setShowReviewPopup(!showReviewPopup);
    };

    return (
        <div className="movie-card">
            <div className="movie-image">
                <img src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt={`${movie?.title} Poster`} />
            </div>
            <div className="movie-info">
                <h3 className="movie-title">{movie?.title}</h3>
                <span className="movie-year">({movie?.release_date ? new Date(movie.release_date).getFullYear() : ''})</span>
                <button className="review-link" onClick={togglePopup}>Review this title</button> {/* Use button instead of a for accessibility */}
            </div>
            {showReviewPopup && <ReviewPopup isOpen={showReviewPopup} movie={movie} onClose={togglePopup}  Session_ID={Session_ID}/>}
        </div>
    );
}

export default MovieYearTitleComponent;
