import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './components/LoginSignup/LoginSignup';
import UserProfile from './components/UserProfile/UserProfile';
import ForgotPassword from './containers/ForgotPassword/ForgotPassword';
import TMDBRedirectHandler from './components/TMDBRedirectHandler/TMDBRedirectHandler';
import { UserProvider } from './services/usercontext';
// import NotFoundPage from './components/NotFoundPage'; // Assuming you have a NotFoundPage component

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginSignup />} />
                    <Route path="/tmdb-auth" element={<TMDBRedirectHandler />} />
                    <Route path="/user-profile" element={<UserProfile />} />
                    <Route path="/forgot" element={<ForgotPassword />} />
                    {/* ...other routes */}
                    {/* <Route path="*" element={<NotFoundPage />} /> Fallback route */}
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
