import React, { useState, useEffect } from "react";
import {
  fetchRatingStatus,
  updateRating,
  removeRating,
} from "../../../services/DetailService"; // Adjust the path as necessary
import "./RatingModal.css";
import RatingButton from "./RatingButton";

const RatingModal = ({ movieTitle, movieId }) => {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRatingStatus(movieId);
        if (data.rated && data.rated.value) {
          setRating(data.rated.value);
          setHasRated(true);
        }
      } catch (error) {
        console.error("Failed to fetch rating status:", error);
      }
    };
    fetchData();
  }, [movieId]);

  const handleRating = async (rate) => {
    setIsLoading(true);
    try {
      await updateRating(movieId, rate);
      setRating(rate);
      setHasRated(true);
    } catch (error) {
      console.error("Failed to update rating:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitRating = async () => {
    setIsLoading(true);
    try {
      await updateRating(movieId, rating);
      console.log("Rating submitted");
      closeModal();
    } catch (error) {
      console.error("Failed to submit rating:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveRating = async () => {
    setIsLoading(true);
    try {
      await removeRating(movieId);
      setRating(0);
      setHasRated(false);
      console.log("Rating removed");
    } catch (error) {
      console.error("Failed to remove rating:", error);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="rating-modal-container">
      <RatingButton onClick={openModal} rating={rating} hasRated={hasRated} />
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal"
              onClick={closeModal}
              disabled={isLoading}
            >
              &times;
            </button>
            <h3>Rate This</h3>
            <p>{movieTitle}</p>
            <div className="star-rating">
              {[...Array(10)].map((_, index) => (
                <span
                  key={index}
                  className={`star ${rating > index ? "filled" : ""}`}
                  onClick={() => handleRating(index + 1)}
                  disabled={isLoading}
                >
                  &#9733;
                </span>
              ))}
            </div>
            {hasRated ? (
              <button
                className="remove-rating"
                onClick={handleRemoveRating}
                disabled={isLoading}
              >
                Remove Rating
              </button>
            ) : (
              <button
                className={`rate-submit-button ${rating > 0 ? "gold" : ""}`}
                onClick={submitRating}
                disabled={isLoading}
              >
                Rate
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingModal;
