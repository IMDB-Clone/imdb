import React from "react";
import MovieBanner from "./components/MovieBanner/MovieBanner";
import MovieComponent from "./containers/MovieMedia/MovieComponent";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import GDMC from "./components/MovieGrene-description/GDMC";
import ReviewCounter from "./components/MovieGrene-description/ReviewCounter";
import WatchlistButton from "./components/MovieGrene-description/WatchlistButton";

const App = () => {
  const movieId = 507089;

  return (
    <>
      <MovieBanner movieId= {movieId} />
      <MovieComponent />
      <GDMC />
      <ReviewCounter />
      <WatchlistButton mediaId={movieId} />

    </>
  );
};

export default App;
