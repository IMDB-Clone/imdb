import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TermsAndConditions from './containers/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from './containers/PrivacyPolicy/PrivacyPolicy';
import HomePage from './containers/HomePage/HomePage';
// import MovieDetailsPage from './containers/MoviesDetails/MoviesDetails';
// import MovieDetails from './containers/MovieDetails/MovieDetails';

const App = () => {
    return (
        <Router>
            <Routes> {/* Wrap all Route components within Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />

                {/* <Route path="/movies/:id" element={<MovieDetailsPage />} /> */}
                {/* <Route path="/movie/:id" element={<MovieDetails />} /> */}
            </Routes>
        </Router>
    );
};

export default App;
