import React from "react";
import GenresMovieOverview from "./Grenes";
import MovieCredits from "./MovieCredits";
const GDMC = () => {
  return (
    <div className="GDC">
      <div className="col-sm ">
        <div className="row  cl1">
          <GenresMovieOverview />
        </div>
        <div className="row cl2">
          <MovieCredits />
        </div>
        </div>
        < div className="col-sm ">
          </div>
    </div>
  );
};
export default GDMC;
