import React from 'react';
import './TrailerComponent.css';

const TrailerComponent = ({ videoKey }) => {
  // Construct the URL for the YouTube video embed
  const trailerUrl = `https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&loop=0`;

  return (
    <div className="trailer-placeholder">
      <iframe 
        src={trailerUrl}  
        title="Movie Trailer" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen 
        className="img-fluid"
      ></iframe>
    </div>
  );
};

export default TrailerComponent;
