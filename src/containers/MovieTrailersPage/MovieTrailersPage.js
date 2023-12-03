// MovieTrailersPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FeaturedTrailer from '../../components/FeaturedTrailer/FeaturedTrailer';
import TrailerList from '../../components/TrailerList/TrailerList';
import { fetchTrailers, fetchMovieDetails } from '../../services/movieService';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import './MovieTrailersPage.css'
import Footer from '../../components/Footer/Footer';
import ShareComponent from '../../components/ShareComponent/ShareComponent'
import NavBar from '../../components/NavBar/NavBar';
const MovieTrailersPage = () => {
  const { movieId } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [featuredTrailer, setFeaturedTrailer] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const trailerResponse = await fetchTrailers(movieId);
        const detailsResponse = await fetchMovieDetails(movieId);
        setTrailers(trailerResponse.results);
        setFeaturedTrailer(trailerResponse.results[0]);
        setMovieDetails(detailsResponse);
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
    <>
    <NavBar />
    <div className="movie-trailers-page pt-4">
      <div className="p-5">
      <ShareComponent />
        <div className="row">
          <div className="col-md-3">
            <MovieInfo movieDetails={movieDetails} />
          </div>
          <div className="col-md-9">
            <FeaturedTrailer trailer={featuredTrailer} />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <TrailerList trailers={trailers.filter(t => t.id !== featuredTrailer?.id)} onTrailerSelect={handleTrailerSelect} />
          </div>
        </div>
      </div>
      <Footer/ >
    </div>
    </>
    
  );
};

export default MovieTrailersPage;