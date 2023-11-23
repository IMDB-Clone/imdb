import React from "react";
import MovieBanner from "../../components/MovieBanner/MovieBanner";
import MovieComponent from "../MovieMedia/MovieComponent";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS 
import GDMC from "../../components/MovieGrene-description/GDMC";
import Footer from "../../components/Footer/Footer";
import "./MovieDetailPage.css";
const MovieDetailPage = ({ movieId }) => {
    return (
        <div className="movie-section-background">
          <MovieBanner movieId={movieId} />
          <MovieComponent movieId={movieId} />
          <GDMC movieId={movieId} />
          <Footer />
        </div>
      );
      
    };
    export default MovieDetailPage;