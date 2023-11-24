import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetailPage from "./containers/MovieDetailsPage/MovieDetailPage";
import ActorDetails from "./components/movie cast/ActorDetails"; // Import ActorDetails component

const App = () => {
  const movieId = 507089;

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MovieDetailPage movieId={movieId} />} />
          <Route path="/actor/:actorId" element={<ActorDetails />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
