import GenresMovieOverview from "./Genres";
import MovieCredits from "./MovieCredits";
import "./GDMC.css";
import ReviewCounter from "./ReviewCounter";
import WatchlistButton from "./WatchlistButton";
import { fetchMovieData } from '../../services/DetailService';
import { useState, useEffect } from 'react';
import MovieMedia from "../MovieBanner/Imdbcomponents/IMDBrating";
import RatingModal from '../MovieBanner/Imdbcomponents/RatingModal';
import Popularity from "../MovieBanner/Imdbcomponents/Popularity";

const GDMC = ({movieId, Session_ID}) => {
  const [movie, setMovie] = useState({
    title: '',
    year: '',
    rating: '',
    duration: '',
    imdbRating: '',
    totalRatings: '',
    yourRating: null,
    popularity: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await fetchMovieData(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error('Failed to fetch movie data:', error);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <div className="container-fluid movie-container-gdmc">
      <div className="row">
        <div className="col-lg-9 movie-details-col">
          <div className="movie-genres-row">
            <GenresMovieOverview movieId={movieId} />
          </div>
          <div className="movie-ratings-row">
          <div className="row">
          <div className="col-md-4">
          <MovieMedia imdbRating={movie.imdbRating}
          totalRatings={movie.totalRatings} />
          </div>
          <div className="col-md-4">
          <RatingModal movieTitle={movie.title}  movieId={movieId} Session_ID={Session_ID}/>

          </div>
          <div className="col-md-4">
          <Popularity popularity={movie.popularity} />

          </div>
          
        </div>
            </div>
          <div className="movie-credits-row">
            <MovieCredits movieId={movieId} />
          </div>

        </div>
        <div className="col-lg-2 movie-interaction-col">
          <div className="movie-interaction-row">
            <WatchlistButton className="btn watchlist-btn" mediaId={movieId} Session_ID={Session_ID} />
            <ReviewCounter className="review-counter" movieId={movieId} />
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default GDMC;