import React, { useState, useEffect } from 'react';
import { updateWatchlist, fetchWatchlistStatus, fetchTotalReviews } from '../../services/DetailService';
import './WatchlistButton.css';

const WatchlistButton = ({ mediaId ,Session_ID }) => {
  
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const watchlistStatus = await fetchWatchlistStatus(mediaId ,Session_ID);
        setIsInWatchlist(watchlistStatus);

        // Fetching total reviews count (assuming it returns the count of users who added it to watchlist)
        const totalReviews = await fetchTotalReviews(mediaId);
        setUserCount(totalReviews);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, [mediaId,Session_ID]);

  const handleWatchlistUpdate = async () => {
    try {
      const response = await updateWatchlist(mediaId, !isInWatchlist, Session_ID);
      if (response.success) {
        setIsInWatchlist(current => !current); // Flip the isInWatchlist state
      } else {
        console.error('Failed to update watchlist:', response.status_message);
      }
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  };

  const buttonLabel = isInWatchlist ? 'In Watchlist' : 'Add to Watchlist';
  const buttonIcon = isInWatchlist ? '✔' : '+';

  return (
    <button className={`watchlist-btn ${isInWatchlist ? 'in-watchlist' : ''}`} onClick={handleWatchlistUpdate}>
      <>
        <span className={`icon ${isInWatchlist ? 'tick-icon' : 'plus-icon'}`}>{buttonIcon}</span>
        <span>{buttonLabel}</span>
      </>
      <span className="user-count">Added by {userCount.toLocaleString()} users</span>
    </button>
  );
};

export default WatchlistButton;