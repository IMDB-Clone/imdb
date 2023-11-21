// MovieComponent.js

import React, { useState, useEffect } from 'react';
import PosterComponent from './PosterComponent';
import TrailerComponent from './TrailerComponent';
import { fetchMovieDetails, fetchMovieTrailers } from '../../services/DetailService'; // Adjust the path as necessary
import './MovieComponent.css';
const MovieComponent = () => {
  const [posterPath, setPosterPath] = useState('');
  const [videoKey, setVideoKey] = useState('');
  const movieId = '507089'; // Example movie ID

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

  
  console.log('API Key:', process.env.REACT_APP_API_KEY);
  console.log('Access Token:', process.env.REACT_APP_ACCESS_TOKEN);
  
  return (
    <div className="container-fluid">
      <div className="row no-gutters">
        <div className="col-md-6 ele1">
          {posterPath && <PosterComponent posterPath={posterPath} movieId={movieId}/>}
        </div>
        <div className="col-md-6 ele2">
          {videoKey && <TrailerComponent videoKey={videoKey} />}
        </div>
      </div>
    </div>
  );
};

export default MovieComponent;
