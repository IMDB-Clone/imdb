import React from "react";
import GenresMovieOverview from "./Genres";
import MovieCredits from "./MovieCredits";
import "./GDMC.css";
import ReviewCounter from "./ReviewCounter";
import WatchlistButton from "./WatchlistButton";

const GDMC = (movieId) => {
  movieId = movieId.movieId;
  return (
    <div className="container-fluid movie-container">
      <div className="row">
        <div className="col-lg-9 movie-details-col">
          <div className="movie-genres-row">
            <GenresMovieOverview movieId={movieId} />
          </div>
          <div className="movie-credits-row">
            <MovieCredits movieId={movieId} />
          </div>
        </div>
        <div className="col-lg-2 movie-interaction-col">
          <div className="movie-interaction-row">
            <WatchlistButton className="btn watchlist-btn" mediaId={movieId} />
            <ReviewCounter className="review-counter" movieId={movieId} />
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default GDMC;
