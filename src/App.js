import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'; // Import from react-router-dom
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import MovieDetailPage from "./containers/MovieDetailsPage/MovieDetailPage";


const App = () => {
  const movieId = 507089;

  return (
    <Router> {/* Wrap the content in a Router */}
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-12">
            <MovieDetailPage movieId={movieId} />
          </div>
       
        
        </div>
      </div>
    </Router>
  );
};

export default App;
