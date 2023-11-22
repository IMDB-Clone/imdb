// PosterComponent.js
import React, { useState, useEffect } from "react";
import { fetchWatchlistStatus, updateWatchlist } from '../../services/DetailService'; // Adjust the path as necessary
import "./PosterComponent.css";
import ribbon from "../../assets/watchlist.png";
import ribbonActive from "../../assets/watchlisted.png";

function PosterComponent({ posterPath, movieId }) {
  const [ribbonImage, setRibbonImage] = useState(ribbon);
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const watchlisted = await fetchWatchlistStatus(movieId);
        setIsWatchlisted(watchlisted);
        setRibbonImage(watchlisted ? ribbonActive : ribbon);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStatus();
  }, [movieId]);

  const toggleRibbon = async () => {
    try {
      const newWatchlistStatus = !isWatchlisted;
      await updateWatchlist(movieId, newWatchlistStatus);
      setIsWatchlisted(newWatchlistStatus);
      setRibbonImage(newWatchlistStatus ? ribbonActive : ribbon);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="poster-component">
      <img
        src={`https://image.tmdb.org/t/p/original${posterPath}`}
        alt="Movie Poster"
      />
      <button className="ribbon-button" onClick={toggleRibbon}>
        <img src={ribbonImage} alt="Ribbon" />
      </button>
    </div>
  );
};

export default PosterComponent;
