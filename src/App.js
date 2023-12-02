import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TermsAndConditions from './containers/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from './containers/PrivacyPolicy/PrivacyPolicy';
import HomePage from './containers/HomePage/HomePage';
import ForgotPassword from './containers/ForgotPassword/ForgotPassword';
import LoginSignup from './components/LoginSignup/LoginSignup';
import UserProfile from './components/UserProfile/UserProfile';
import { UserProvider } from './services/usercontext';
import TMDBRedirectHandler from './components/TMDBRedirectHandler/TMDBRedirectHandler';
// import MovieDetailsPage from './containers/MoviesDetails/MoviesDetails';
// import MovieDetails from './containers/MovieDetails/MovieDetails';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Routes> {/* Wrap all Route components within Routes */}
                    <Route path="/" element={<LoginSignup />} />
                    <Route path="/tmdb-auth" element={<TMDBRedirectHandler />} />
                    <Route path="/forgot" element={<ForgotPassword />} />
                    <Route path="/user-profile" element={<UserProfile />} />
                    {/* other routes */}
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
