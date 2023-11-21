import React, { useState, useEffect } from 'react';
import './RatingButton.css'; // Importing the CSS for styling

const RatingButton = ({ onClick, movieId }) => {
  movieId = '507089'; // Replace with your movie ID
  const [hasRated, setHasRated] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2NiZGU3ZGZhMzQ0MDYwOTc1OWU3OGY3ZDU0YzYyMCIsInN1YiI6IjY1NTYyMDMwZDRmZTA0MDBjNDIyNmUxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.weQO7XQaWt2eD-QvOp6gvs6NIVf89X-KhIknSsaDlSs'
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/account_states`, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.rated?.value) { // Using optional chaining to safely access nested properties
          setHasRated(true);
          setRating(data.rated.value); // Set the rating value if the movie has been rated
        }
      })
      .catch(err => {
        console.error('Fetching rating failed:', err);
        setHasRated(false);
        setRating(0);
      });
  }, [movieId]); // Depend on movieId so that this runs whenever it changes

  return (
    <div className={`rating-button ${hasRated ? 'rated' : ''}`}>
      <button onClick={onClick}>
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
