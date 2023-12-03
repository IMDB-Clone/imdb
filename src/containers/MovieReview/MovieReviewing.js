import {React, useContext} from "react";
import MovieYearTitleComponent from "../../components/MovieYearTitle/MovieYearTitleComponent";
import MovieCounterAndReviews from "../../components/MovieYearTitle/MovieCounterAndReviews";
import "./MovieReviewing.css"; // Ensure you have this CSS file
import { useParams } from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";
import { UserContext } from '../../services/usercontext';

const MovieReviewing = () => {
  const { user } = useContext(UserContext);
  const sessionID = user?.tmdbSessionId;
  
  const { movieId, Session_ID } = useParams();
  return (
    <div className="movie-reviewing">
      <NavBar />
      <MovieYearTitleComponent movieId={movieId} Session_ID={sessionID} />
      <MovieCounterAndReviews movieId={movieId} />
    </div>
    
  );
};

export default MovieReviewing;
