import React, { useState, useEffect } from "react";
import { fetchMovieCredits } from "../../services/DetailService"; // Adjust the path as necessary
import "./MovieCredits.css";

const MovieCredits = ({ movieId })=> {
  const [credits, setCredits] = useState({
    director: "",
    writers: [],
    stars: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const creditsData = await fetchMovieCredits(movieId);
        setCredits(creditsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="movie-credits">
      
      <p>
        <span className="b">Director </span>
        {credits.director}
      </p>

      <div className="line"></div>

      <p>
        {" "}
        <span className="b">Writer </span> {credits.writers.join(" · ")}
      </p>

      <div className="line"></div>

      <p>
        <span className="b">Stars </span> {credits.stars.join(" · ")}
      </p>

      <div className="line"></div>

      <a href="link_to_IMDbPro">See production info at IMDbPro</a>

    </div>
  );
};

export default MovieCredits;
