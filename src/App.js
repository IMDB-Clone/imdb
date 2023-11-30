import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetailPage from "./containers/MovieDetailsPage/MovieDetailPage";
import ActorDetails from "./components/movie cast/ActorDetails"; // Import ActorDetails component
import MovieReviewing from "./containers/MovieReview/MovieReviewing"; // Import MovieReviewing component

const App = () => {
  const movieId = 507089; // This should probably be managed differently, not hardcoded
  const Session_ID = "3bd9c09aefa975af9fe61988927973e9ec1cd1fe"; // Session ID

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MovieDetailPage movieId={movieId} Session_ID={Session_ID}/>} />
          <Route path="/actor/:actorId" element={<ActorDetails />} />
          <Route path="/movie-reviewing/:movieId" element={<MovieReviewing  movieId={movieId} Session_ID={Session_ID}/>} />      
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
