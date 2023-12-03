import { React, useContext } from "react";
import MovieYearTitleComponent from "../../components/MovieYearTitle/MovieYearTitleComponent";
import MovieCounterAndReviews from "../../components/MovieYearTitle/MovieCounterAndReviews";
import "./MovieReviewing.css";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { UserContext } from "../../services/usercontext";

const MovieReviewing = () => {
  const { user } = useContext(UserContext);
  const sessionID = user.tmdbSessionId;
  const uid = user.uid;
  console.log("uid: "+uid)

  const author = user.username;
  console.log("author (username): "+author)


  const { movieId } = useParams();
  return (
    <div>
      <NavBar />
      <div className="movie-reviewing">
        <MovieYearTitleComponent
          movieId={movieId}
          Session_ID={sessionID}
          uid={uid}
          author={author}
        />
        <MovieCounterAndReviews movieId={movieId} />
      </div>
    </div>
  );
};

export default MovieReviewing;
