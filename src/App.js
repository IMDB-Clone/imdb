import React from 'react';
import MovieBanner from './components/MovieBanner/MovieBanner';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import MovieMedia from './components/MovieMedia/MovieMedia';



const App = () => {
    const posterUrl = "path-to-your-poster.jpg";
    const trailerUrl = "path-to-your-trailer.mp4";
    const title = "David Fincher";
    return (
        <>
            <MovieBanner />
            <div className="container">
      <MovieMedia posterUrl={posterUrl} trailerUrl={trailerUrl} title={title} />
    </div>
        </> 
    );
};

export default App;
