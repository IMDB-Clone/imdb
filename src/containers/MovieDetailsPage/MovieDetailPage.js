import React, { useState, useEffect } from "react";
import MovieBanner from "../../components/MovieBanner/MovieBanner";
import MovieComponent from "../MovieMedia/MovieComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import GDMC from "../../components/MovieGrene-description/GDMC";
import Footer from "../../components/Footer/Footer";
import MovieCast from "../../components/movie cast/MovieCast";
import { fetchTrailers1 } from "../../services/DetailService";
import TrailerList from "../../components/TrailerList/TrailerList";
import "./MovieDetailPage.css";

const MovieDetailPage = ({ movieId, Session_ID }) => {
  const [trailers, setTrailers] = useState([]);
  const [featuredTrailer, setFeaturedTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, [movieId]);

  const handleTrailerSelect = (trailer) => {
    setFeaturedTrailer(trailer);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="movie-section-background">
      <MovieBanner movieId={movieId} Session_ID={Session_ID} />
      <MovieComponent movieId={movieId} Session_ID={Session_ID} />
      <GDMC movieId={movieId} Session_ID={Session_ID} />
      <TrailerList trailers={trailers.filter(t => t.id !== featuredTrailer?.id)} onTrailerSelect={handleTrailerSelect} />
      <MovieCast movieId={movieId} />
      <Footer />
    </div>
  );
};

export default MovieDetailPage;
