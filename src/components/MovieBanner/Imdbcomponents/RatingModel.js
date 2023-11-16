import React, { useState } from 'react';
import './RatingModal.css';
import RatingButton from './RatingButton';

const RatingModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false); // Track if the user has rated

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleRating = (rate) => {
    setRating(rate);
    setHasRated(true); // User has selected a rating
  };

  const submitRating = () => {
    // Handle the submission of the rating
    console.log(`Rating submitted: ${rating}`);
    closeModal(); // Optionally close the modal after submitting
  };

  const removeRating = () => {
    setRating(0);
    setHasRated(false); // User has cancelled their rating
  };

  return (
    <>
    <RatingButton onClick={openModal} rating={rating} hasRated={hasRated} />

      
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>&times;</button>
            <h3>Rate This</h3>
            <p>Attack on Titan</p>
            <div className="star-rating">
              {[...Array(10)].map((_, index) => (
                <span key={index} 
                      className={`star ${rating > index ? 'filled' : ''}`} 
                      onClick={() => handleRating(index + 1)}>
                  &#9733;
                </span>
              ))}
            </div>
            {hasRated ? (
              <button className="remove-rating" onClick={removeRating}>Remove Rating</button>
            ) : (
              <button className={`rate-submit-button ${rating > 0 ? 'gold' : ''}`} 
                      onClick={submitRating}>
                Rate
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RatingModal;
