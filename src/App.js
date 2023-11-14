import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TermsAndConditions from './containers/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from './containers/PrivacyPolicy/PrivacyPolicy';
import HomePage from './containers/HomePage/HomePage';

const App = () => {
    return (
        <Router>
            <Routes> {/* Wrap all Route components within Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                {/* ... other routes */}
            </Routes>
        </Router>
    );
};

export default App;
