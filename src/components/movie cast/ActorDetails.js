import React, { useState, useEffect } from 'react';
import { fetchActorDetails, fetchActorMovies } from '../../services/DetailService';
import { useParams } from 'react-router-dom';
import './ActorDetails.css';

const ActorDetails = () => {
  let { actorId } = useParams();
  const [actorDetails, setActorDetails] = useState(null);
  const [actorMovies, setActorMovies] = useState([]);

  useEffect(() => {
    const fetchDetailsAndMovies = async () => {
      try {
        const details = await fetchActorDetails(actorId);
        const movies = await fetchActorMovies(actorId);
        setActorDetails(details);
        setActorMovies(movies.cast.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetailsAndMovies();
  }, [actorId]);

  return (
    <div className="actor-details-container">
      {/* Actor's header information */}
      {actorDetails && (
    <div className="actor-header">
      <img
        src={`https://image.tmdb.org/t/p/w500${actorDetails.profile_path}`}
        alt={actorDetails.name}
        className="actor-photo"
      />
          <div>
          <h1 className="actor-name">{actorDetails.name}</h1>
        <p className="actor-bio">{actorDetails.biography}</p>
        <p className="actor-dob">Born: {actorDetails.birthday}</p>
            {/* Assuming .actor-dob is defined in your CSS */}
          </div>
        </div>
      )}

      {/* Known For section */}
      <div className="known-for-section">
    <h2 className="known-for-title">Known For</h2>
    <div className="known-for-grid">
      {actorMovies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <div className="movie-poster-container">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              </div>
              <div className="movie-details">
                <p className="movie-title">{movie.title}</p>
                <p className="movie-rating">
                  <span className="rating-star">★</span> {/* Assuming you have a star icon */}
                  {movie.vote_average}
                </p>
                <p className="movie-role">{movie.character}</p>
                <p className="movie-year">{movie.release_date.split('-')[0]}</p>
                {/* Assuming release_date is in 'YYYY-MM-DD' format */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActorDetails;
