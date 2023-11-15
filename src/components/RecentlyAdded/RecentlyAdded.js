// MovieCarousel.js

import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchRecentlyAdded } from "../../services/movieService";

import "./RecentlyAdded.css";
import playButton1 from "../../assets/play-button1.png";
import playButton2 from "../../assets/play-button2.png";
import default_backdrop from "../../assets/default_backdrop.png";
import default_poster from "../../assets/default_poster.png";

const RecentlyAdded = () => {
  const [movies, setMovies] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const getRecentlyAddedMovies = async () => {
      try {
        const fetchedMovies = await fetchRecentlyAdded();
        setMovies(fetchedMovies);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    getRecentlyAddedMovies();
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Carousel className="carousel">
      {movies.map((movie) => (
        <Carousel.Item
          key={movie.id}
          style={{ height: "500px", position: "relative" }}
        >
          <div className="backdrop-container">
            <img
              className="backdrop-img"
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                  : default_backdrop
              }
              alt="Backdrop"
            />
          </div>
          <div className="carousel-poster-container">
            <img
              className="carousel-poster-img"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : default_poster
              }
              alt="Poster"
            />
          </div>
          <Carousel.Caption className="carousel-custom-caption">
            <a href={movie.trailer} target="_blank" rel="noopener noreferrer">
              <img
                src={isHovered ? playButton2 : playButton1}
                alt="Play Trailer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </a>
            <h3>{movie.title}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default RecentlyAdded;
