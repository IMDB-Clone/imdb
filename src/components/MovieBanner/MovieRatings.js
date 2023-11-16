// MovieRatings.js
import React from "react";
import MovieMedia from "./Imdbcomponents/IMDBrating";
import RatingModel from "./Imdbcomponents/RatingModel"; // Import the RatingModel
import Popularity from "./Imdbcomponents/Popularity";
import "./MovieRatings.css";

const MovieRatings = ({ movie }) => {
  return (
    <div className="col-md-4 d-none d-md-block">
      <div className="d-flex justify-content-around align-items-center">
        <div className="text-center">
          <div className="rating-label">IMDb Rating</div>
          <MovieMedia movie={movie} />
        </div>
        <div className="text-center">
          <div className="rating-label">Your Rating</div>
          <RatingModel movie={movie} />{" "}
          {/* Use the RatingModel component here */}
        </div>
        <div className="text-center">
          <div className="rating-label">Popularity</div>
          <Popularity popularity={movie.popularity} />
        </div>
      </div>
    </div>
  );
};

export default MovieRatings;
