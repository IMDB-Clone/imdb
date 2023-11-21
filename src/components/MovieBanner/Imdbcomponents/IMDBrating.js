import React from 'react';

const MovieMedia = ({ imdbRating, totalRatings }) => {
  return (
    <div className="row">
      <div className="col-md-4">
        <div className="rating-star">⭐</div>
      </div>
      <div className="col-md-4">
        <div className="row">
          <div className="rating-value">{imdbRating}/10</div>
        </div>
        <div className="row">
          <div className="rating-count">{totalRatings} </div>
        </div>
      </div>
    </div>
  );
};

export default MovieMedia;
