import React from "react";

const MovieMedia = ({ movie }) => {
  return (
    /* <span className="rating-star">⭐</span>
          <span className="rating-value">{movie.imdbRating}/10</span>
          <span className="rating-count">{movie.totalRatings}</span>*/
     <div className="row">
      
      <div className="col-md-4">
        <div className="rating-star">⭐</div>
        </div>
        <div className="col-md-4">
        <div className="row">
        <div className="rating-value">{movie.imdbRating}/10</div>
        </div>
        <div className="row">
        <div className="rating-count">{movie.totalRatings}</div>
        </div>
        </div>

      </div>
  );
};


export default MovieMedia;
