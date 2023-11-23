import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'; // Import from react-router-dom
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import MovieReviewing from "./containers/MovieReview/MovieReviewing";

const App = () => {
  const movieId = 507089;

  return (
    <Router> {/* Wrap the content in a Router */}
      <div className="container-fluid p-0">
        <div className="row g-0">
          <MovieReviewing movieId={movieId} />
        
        </div>
      </div>
    </Router>
  );
};

export default App;
