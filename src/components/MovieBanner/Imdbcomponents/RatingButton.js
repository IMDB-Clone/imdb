// File: RatingButton.js
import React from "react";
import "./RatingButton.css"; // Importing the CSS for styling

const RatingButton = ({ onClick, rating, hasRated }) => {
  return (
    <div className={`rating-button ${hasRated ? 'rated' : ''}`}>
      <button onClick={onClick}>
        <div className="row bt">
          <div className="col-md-4">
            <span className="star">&#9733;</span> {/* Star icon */}
          </div>
          <div className="col-md-4 rate">
            {hasRated ? `${rating}/10` : 'Rate'} {/* Display the rating like 10/10 if rated */}
          </div>
        </div>
      </button>
    </div>
  );
};

export default RatingButton;
