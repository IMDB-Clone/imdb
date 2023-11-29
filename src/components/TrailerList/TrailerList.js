// TrailerList.js
import React from "react";
import "./TrailerList.css"; // Import your custom CSS if needed

const TrailerList = ({ trailers, onTrailerSelect }) => {
  return (
    <div className="other-trailers">
      <h3 className="mb-3 title">More Trailers</h3>
      <div className="row">
        {trailers.map((trailer) => (
          <div
            key={trailer.id}
            className="col-sm-6 col-md-4 col-lg-3 mb-3"
            onClick={() => onTrailerSelect(trailer)}
          >
            <div className="card">
              <img
                className="card-img-top"
                src={`https://img.youtube.com/vi/${trailer.key}/0.jpg`}
                alt={trailer.name}
              />
              <div className="card-body">
                <p className="card-text">{trailer.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailerList;
