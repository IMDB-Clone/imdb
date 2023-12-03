import React from "react";
import MovieYearTitleComponent from "../../components/MovieYearTitle/MovieYearTitleComponent";
import MovieCounterAndReviews from "../../components/MovieYearTitle/MovieCounterAndReviews";
import "./MovieReviewing.css"; // Ensure you have this CSS file
import { useParams } from 'react-router-dom';

const MovieReviewing = () => {
  const { movieId, Session_ID } = useParams();
  return (
    <div className="movie-reviewing">
      <MovieYearTitleComponent movieId={movieId} Session_ID={"e96bc3b2f9c8b8a06ca08112e619ab16b872c3f7"} />
      <MovieCounterAndReviews movieId={movieId} />

    </div>
    
  );
};

export default MovieReviewing;
