import React, { useState, useEffect, useContext } from "react";
import MovieBanner from "../../components/MovieBanner/MovieBanner";
import MovieComponent from "../MovieMedia/MovieComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import GDMC from "../../components/MovieGrene-description/GDMC";
import Footer from "../../components/Footer/Footer";
import MovieCast from "../../components/movie cast/MovieCast";
import { fetchTrailers1 } from "../../services/DetailService";
import TrailerList from "../../components/TrailerList/TrailerList";
import "./MovieDetailPage.css";
import { useParams } from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";
import { UserContext } from '../../services/usercontext';

const MovieDetailPage = () => {
  const { movieId, Session_ID } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [featuredTrailer, setFeaturedTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const sessionID = user?.tmdbSessionId;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const trailerResponse = await fetchTrailers1(movieId);
        setTrailers(trailerResponse.results);
        setFeaturedTrailer(trailerResponse.results[0]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [movieId,Session_ID]);

  const handleTrailerSelect = (trailer) => {
    setFeaturedTrailer(trailer);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="movie-section-background">
      <NavBar />
      <MovieBanner movieId={movieId} Session_ID={sessionID} />
      <MovieComponent movieId={movieId} Session_ID={sessionID} />
      <GDMC movieId={movieId} Session_ID={sessionID} />
      <TrailerList trailers={trailers.filter(t => t.id !== featuredTrailer?.id)} onTrailerSelect={handleTrailerSelect} />
      <MovieCast movieId={movieId} />
      <Footer />
    </div>
  );
};

export default MovieDetailPage;
