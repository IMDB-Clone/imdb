import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ReviewPopup.css"; // Make sure to create this CSS file for additional styling

const ReviewPopup = ({ isOpen, movie, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="review-popup-container position-fixed top-0 right-0 h-100"
      style={{ width: "25%" }}
    >
      <div className="review-popup d-flex flex-column h-100 bg-white shadow">
        <button
          className="close align-self-end btn btn-sm btn-light"
          onClick={onClose}
        >
          ×
        </button>
        <div className="px-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="img-fluid"
          />
          <h5 className="movie-info">{movie.title} (2000)</h5>
          <div className="star-rating">
            <div className="star-rating">
              <input id="star-10" type="radio" name="rating" value="10" />
              <label htmlFor="star-10" title="10 stars">
                <i className="fas fa-star"></i>
              </label>
              <input id="star-9" type="radio" name="rating" value="9" />
              <label htmlFor="star-9" title="9 stars">
                <i className="fas fa-star"></i>
              </label>
              <input id="star-8" type="radio" name="rating" value="8" />
              <label htmlFor="star-8" title="8 stars">
                <i className="fas fa-star"></i>
              </label>
              <input id="star-7" type="radio" name="rating" value="7" />
              <label htmlFor="star-7" title="7 stars">
                <i className="fas fa-star"></i>
              </label>
              <input id="star-6" type="radio" name="rating" value="6" />
              <label htmlFor="star-6" title="6 stars">
                <i className="fas fa-star"></i>
              </label>
              <input id="star-5" type="radio" name="rating" value="5" />
              <label htmlFor="star-5" title="5 stars">
                <i className="fas fa-star"></i>
              </label>
              <input id="star-4" type="radio" name="rating" value="4" />
              <label htmlFor="star-4" title="4 stars">
                <i className="fas fa-star"></i>
              </label>
              <input id="star-3" type="radio" name="rating" value="3" />
              <label htmlFor="star-3" title="3 stars">
                <i className="fas fa-star"></i>
              </label>
              <input id="star-2" type="radio" name="rating" value="2" />
              <label htmlFor="star-2" title="2 stars">
                <i className="fas fa-star"></i>
              </label>
              <input id="star-1" type="radio" name="rating" value="1" />
              <label htmlFor="star-1" title="1 star">
                <i className="fas fa-star"></i>
              </label>
            </div>
          </div>
          <form className="mt-3">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Write a headline for your review here"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                rows="5"
                placeholder="Write your review here"
                required
                minLength="600"
              ></textarea>
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="spoilerCheck"
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
                required
              />
              <label className="form-check-label" htmlFor="termsCheck">
                I agree to the Conditions of Use. The data I'm submitting is
                true and not copyrighted by a third party.
              </label>
            </div>
            <button type="submit" className="btn btn-primary submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
