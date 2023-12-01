import React from "react";
import MovieYearTitleComponent from "../../components/MovieYearTitle/MovieYearTitleComponent";
import MovieCounterAndReviews from "../../components/MovieYearTitle/MovieCounterAndReviews";
import "./MovieReviewing.css"; // Ensure you have this CSS file

const MovieReviewing = ({ movieId , Session_ID}) => {
  return (
    <div className="movie-reviewing">
      <MovieYearTitleComponent movieId={movieId} Session_ID={Session_ID} />
      <MovieCounterAndReviews movieId={movieId} />

    </div>
    
  );
};

export default MovieReviewing;
