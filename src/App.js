import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetailPage from "./containers/MovieDetailsPage/MovieDetailPage";
import ActorDetails from "./components/movie cast/ActorDetails"; // Import ActorDetails component
import TermsAndConditions from './containers/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from './containers/PrivacyPolicy/PrivacyPolicy';
import HomePage from './containers/HomePage/HomePage';
import MovieTrailersPage from './containers/MovieTrailersPage/MovieTrailersPage';
import MovieReviewing from './containers/MovieReview/MovieReviewing'; 
import LoginSignup from './components/LoginSignup/LoginSignup';
import ForgotPassword  from './containers/ForgotPassword/ForgotPassword';
import { UserProvider } from './services/usercontext';
import UserProfile from './components/UserProfile/UserProfile';
import TMDBRedirectHandler from './components/TMDBRedirectHandler/TMDBRedirectHandler';

const App = () => {
    return (
        <UserProvider>
            
             <Router>
            <Routes>
                <Route path="/" element={<LoginSignup />} />
                <Route path="/tmdb-redirect" element={<TMDBRedirectHandler />} />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/movie-trailers/:movieId" element={<MovieTrailersPage />} />
                <Route path="/actor/:actorId" element={<ActorDetails />} />
                <Route path="/movie-details/:movieId" element={<MovieDetailPage />} />
                <Route path="/movie-reviewing/:movieId" element={<MovieReviewing />} />    
        
            </Routes>
        </Router>
        </UserProvider>
       
    );
};

export default App;
