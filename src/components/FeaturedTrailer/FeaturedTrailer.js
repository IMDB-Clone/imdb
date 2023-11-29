// FeaturedTrailer.js

import React from 'react';
import './FeaturedTrailer.css'; // Import your custom CSS if needed

const FeaturedTrailer = ({ trailer }) => {
  if (!trailer) return null;

  return (
    <div className="featured-trailer container mb-4">
      {/* <h2 className="my-3">{trailer.name}</h2> */}
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          className="embed-responsive-item"
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
          title={trailer.name}
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default FeaturedTrailer;
