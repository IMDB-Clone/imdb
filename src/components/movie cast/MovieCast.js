import React, { useState, useEffect } from 'react';
import getMovieCast from '../../services/DetailService';
import './MovieCast.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const MovieCast = ({ movieId }) => {
    const [cast, setCast] = useState([]);

    useEffect(() => {
        const fetchCast = async () => {
            try {
                const castData = await getMovieCast(movieId);
                setCast(castData.slice(0, 10)); // Only show the first 10 cast members
            } catch (error) {
                console.error(error);
            }
        };

        fetchCast();
    }, [movieId]);

    return (
        <div className="movie-cast-container">
            <h2 className="cast-title">Top Cast</h2>
            <div className="cast-grid">
                {cast.map(member => (
                    <Link key={member.id} to={`/actor/${member.id}`} className="cast-member-link">
                        <div className="cast-member">
                            <img src={`https://image.tmdb.org/t/p/w500${member.profile_path}`} alt={member.name} className="cast-photo" />
                            <div className="cast-text">
                                <h3 className="cast-name">{member.name}</h3>
                                <p className="cast-character">{member.character}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MovieCast;
