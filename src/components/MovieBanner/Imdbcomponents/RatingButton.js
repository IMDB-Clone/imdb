import React from 'react';
import './RatingButton.css'; // Importing the CSS for styling

const RatingButton = ({ movieId, rating, hasRated, onClick }) => {
  return (
    <div className={`rating-button ${hasRated ? 'rated' : ''}`}>
      <button onClick={() => onClick(movieId)}> {/* Trigger the parent's onClick function */}
        <div className="row bt">
          <div className="col-md-4">
            <span className="star">&#9733;</span> {/* Star icon */}
          </div>
          <div className="col-md-8 rate">
            {hasRated ? `${rating}/10` : 'Rate'} {/* Display the rating like 5/10 if rated */}
          </div>
        </div>
      </button>
    </div>
  );
};

export default RatingButton;
