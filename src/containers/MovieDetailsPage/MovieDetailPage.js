import React from "react";
import MovieBanner from "../../components/MovieBanner/MovieBanner";
import MovieComponent from "../MovieMedia/MovieComponent";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS 
import GDMC from "../../components/MovieGrene-description/GDMC";
import Footer from "../../components/Footer/Footer";
import MovieCast from "../../components/movie cast/MovieCast";
import "./MovieDetailPage.css";
import { useParams } from 'react-router-dom';

const MovieDetailPage = () => {

  const { movieId } = useParams();
  
    return (
      <div className="movie-section-background">
          <MovieBanner movieId={movieId} />
          <MovieComponent movieId={movieId} />
          <GDMC movieId={movieId} />
          <MovieCast movieId={movieId} />
          <Footer />
       
        </div>
          
      );
      
    };
    export default MovieDetailPage;