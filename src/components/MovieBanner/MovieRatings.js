// MovieRatings.js
import React from "react";
import MovieMedia from "./Imdbcomponents/IMDBrating";
import RatingModal from './Imdbcomponents/RatingModal';
import Popularity from "./Imdbcomponents/Popularity";
import "./MovieRatings.css";

const MovieRatings = ({ movie , movieId}) => {
 
  return (
    <div className="col-md-4 d-none d-md-block">
      <div className="d-flex justify-content-around align-items-center">
        <div className="row">
          <div className="col-md-4">
          <div className="rating-label">IMDb Rating</div>
          </div>
            <div className="col-md-4">
            <div className="rating-label">Your Rating</div>
            </div>
            <div className="col-md-4">
            <div className="rating-label">Popularity</div>
            </div>
           
          <div className="row">
          <div className="col-md-4">
          <MovieMedia imdbRating={movie.imdbRating}
          totalRatings={movie.totalRatings} />
          </div>
          <div className="col-md-4">
          <RatingModal movieTitle={movie.title}  movieId={movieId}/>

          </div>
          <div className="col-md-4">
          <Popularity popularity={movie.popularity} />

          </div>
          
        </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRatings;
