// MovieYearTitleComponent.js
import React, { useState, useEffect } from 'react';
import { fetchMovieDetails } from '../../services/DetailService';
import './MovieYearTitleComponent.css'; // Make sure to create and use the correct CSS file

const MovieYearTitleComponent = ({ movieId }) => {
    const [posterPath, setPosterPath] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMovieDetails(movieId);
                setPosterPath(data.poster_path);
                setReleaseYear(data.release_date ? new Date(data.release_date).getFullYear() : '');
                setTitle(data.title);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [movieId]);

    return (
        <div className="movie-card">
            <div className="movie-image">
                <img src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt={`${title} Poster`} />
            </div>
            <div className="movie-info">
                <h3 className="movie-title">{title}</h3>
                <span className="movie-year">({releaseYear})</span>
                <a href="#" className="review-link">Review this title</a>
            </div>
        </div>
    );
}

export default MovieYearTitleComponent;
