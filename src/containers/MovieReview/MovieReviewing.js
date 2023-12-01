import React from "react";
import MovieYearTitleComponent from "../../components/MovieYearTitle/MovieYearTitleComponent";
import MovieCounterAndReviews from "../../components/MovieYearTitle/MovieCounterAndReviews";
import "./MovieReviewing.css"; // Ensure you have this CSS file
import { useParams } from 'react-router-dom';

const MovieReviewing = () => {

  const { movieId } = useParams();

  return (
    <div className="movie-reviewing">
      <MovieYearTitleComponent movieId={movieId} />
      <MovieCounterAndReviews movieId={movieId} />
    </div>
    
  );
};

export default MovieReviewing;
