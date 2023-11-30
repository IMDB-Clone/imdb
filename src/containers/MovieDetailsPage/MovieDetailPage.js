import React from "react";
import MovieBanner from "../../components/MovieBanner/MovieBanner";
import MovieComponent from "../MovieMedia/MovieComponent";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS 
import GDMC from "../../components/MovieGrene-description/GDMC";
import Footer from "../../components/Footer/Footer";
import MovieCast from "../../components/movie cast/MovieCast";
import "./MovieDetailPage.css";
const MovieDetailPage = ({ movieId , Session_ID }) => {
  
    return (
      <div className="movie-section-background">
          <MovieBanner movieId={movieId} Session_ID={Session_ID} />
          <MovieComponent movieId={movieId} Session_ID={Session_ID} />
          <GDMC movieId={movieId} Session_ID={Session_ID} />
          <MovieCast movieId={movieId} />
          <Footer />
       
        </div>
          
      );
      
    };
    export default MovieDetailPage;