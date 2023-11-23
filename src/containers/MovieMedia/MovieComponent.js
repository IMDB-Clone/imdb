// MovieComponent.js

 import React, { useState, useEffect } from 'react';
import PosterComponent from './PosterComponent';
import TrailerComponent from './TrailerComponent';
import { fetchMovieDetails, fetchMovieTrailers } from '../../services/DetailService'; // Adjust the path as necessary
import './MovieComponent.css';

const MovieComponent = ({ movieId }) => {
  const [posterPath, setPosterPath] = useState('');
  const [videoKey, setVideoKey] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setPosterPath(data.poster_path);

        const trailer = await fetchMovieTrailers(movieId);
        setVideoKey(trailer ? trailer.key : null);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [movieId]);
  
  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        <div className="col-lg-3 col-md-6">
          {posterPath && <PosterComponent posterPath={posterPath} movieId={movieId}/>}
        </div>
        <div className="col-lg-8 col-md-6">
          {videoKey && <TrailerComponent videoKey={videoKey} />}
        </div>
      </div>
    </div>
  );
};

export default MovieComponent;
