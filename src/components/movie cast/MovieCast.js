import React, { useState, useEffect } from 'react';
import getMovieCast from '../../services/DetailService';
import './MovieCast.css'; // Import the CSS file

const MovieCast = ({ movieId }) => {
    const [cast, setCast] = useState([]);
  
    useEffect(() => {
      const fetchCast = async () => {
        try {
          const castData = await getMovieCast(movieId);
          setCast(castData.slice(0, 18)); // Ensure only the first 18 are shown
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
          <div key={member.id} className="cast-member">
            <img src={`https://image.tmdb.org/t/p/w500${member.profile_path}`} alt={member.name} className="cast-photo" />
            <h3 className="cast-name">{member.name}</h3>
            <p className="cast-character">{member.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCast;
