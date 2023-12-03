import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ReviewPopup.css";

const ReviewPopup = ({ isOpen, movie, onClose, Session_ID, uid, author}) => {
  const [reviewData, setReviewData] = useState({
    headline: '',
    content: '',
    rating: 0,
    spoiler: false,
    termsAgreed: false,
    createdAt: new Date().toISOString()
  });

  // Handle changes in form inputs
  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    setReviewData({
      ...reviewData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Construct the review object with current date
    const review = {
      author: author,
      ...reviewData,
      movieId: movie.id,
      sessionId: Session_ID,
      uid: uid
    };

    // Send the review to the server
    try {
      const response = await fetch('http://localhost:3001/api/save-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });

      if (response.ok) {
        onClose(); // Close the popup on successful submission
        window.location.reload(); // Reload the page
      } else {
        console.error('Error saving review');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="review-popup-container position-fixed top-0 right-0 h-100" style={{ width: "30%" }}>
      <div className="review-popup d-flex flex-column h-100 bg-white shadow">
        <button className="close align-self-end btn btn-sm btn-light" onClick={onClose}>×</button>
        <div className="px-4">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="img-fluid" />
          <h5 className="movie-info">{movie.title} ({movie?.release_date ? new Date(movie.release_date).getFullYear() : ''})</h5>
          <div className="star-rating">
            {[...Array(10)].map((_, i) => (
              <React.Fragment key={i}>
                <input
                  id={`star-${10 - i}`}
                  type="radio"
                  name="rating"
                  value={10 - i}
                  onChange={handleInputChange}
                  checked={reviewData.rating === `${10 - i}`}
                />
                <label htmlFor={`star-${10 - i}`} title={`${10 - i} stars`}>
                  <i className="fas fa-star"></i>
                </label>
              </React.Fragment>
            ))}
          </div>
          <form className="mt-3" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="headline"
                placeholder="Write a headline for your review here"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                name="content"
                rows="5"
                placeholder="Write your review here"
                onChange={handleInputChange}
                required
                minLength="6"
              ></textarea>
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="spoilerCheck"
                name="spoiler"
                onChange={handleInputChange}
                checked={reviewData.spoiler}
              />
              <label className="form-check-label" htmlFor="spoilerCheck">
                Does this review contain spoilers?
              </label>
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="termsCheck"
                name="termsAgreed"
                onChange={handleInputChange}
                checked={reviewData.termsAgreed}
                required
              />
              <label className="form-check-label" htmlFor="termsCheck">
                I agree to the Conditions of Use. The data I'm submitting is true and not copyrighted by a third party.
              </label>
            </div>
            <button type="submit" className="btn btn-primary submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
