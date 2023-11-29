import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetailPage from "./containers/MovieDetailsPage/MovieDetailPage";
import ActorDetails from "./components/movie cast/ActorDetails"; // Import ActorDetails component
import TermsAndConditions from './containers/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from './containers/PrivacyPolicy/PrivacyPolicy';
import HomePage from './containers/HomePage/HomePage';
import MovieTrailersPage from './containers/MovieTrailersPage/MovieTrailersPage';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/movie/:movieId" element={<MovieTrailersPage />} />
                {/* <Route path="/" element={<MovieDetailPage movieId={movieId} />} /> */}
                <Route path="/actor/:actorId" element={<ActorDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
