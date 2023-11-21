import React from "react";
import MovieBanner from "./components/MovieBanner/MovieBanner";
import MovieComponent from "./containers/MovieMedia/MovieComponent";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import GDMC from "./components/MovieGrene-description/GDMC";

const App = () => {
  // Removed unused variables

  return (
    <>
      <MovieBanner />
      <MovieComponent />
      <GDMC />
    </>
  );
};

export default App;
