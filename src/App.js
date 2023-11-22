import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import MovieDetailPage from "./containers/MovieDetailsPage/MovieDetailPage";



const App = () => {
  const movieId = 507089;

  return (
    <>
      <MovieDetailPage movieId={movieId} />
    </>
  );
};

export default App;
