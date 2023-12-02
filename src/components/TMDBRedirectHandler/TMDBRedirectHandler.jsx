import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../services/usercontext';
import { createSessionId } from '../../services/session';

const TMDBRedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { updateUser } = useContext(UserContext); // Using the updated context

    console.log("is it me am i the problem");
    useEffect(() => {
        const handleTMDBSession = async () => {
            // Extract the authorized request token from the URL
            const queryParams = new URLSearchParams(location.search);
            const requestToken = queryParams.get('request_token');
            if (requestToken) {
                try {
                    const tmdbSessionId = await createSessionId(requestToken);
                    // Update user context with the TMDB session ID
                    updateUser({ tmdbSessionId });
                    navigate('/user-profile'); // Redirect to user profile or another page
                } catch (error) {
                    console.error("Error creating TMDB session:", error);
                    navigate('/'); // Redirect to login or error page
                }
            } else {
                navigate('/'); // Redirect to login or error page if token not found
            }
        };

        handleTMDBSession();
    }, [location, navigate, updateUser]);

    // Display a message or loader while processing
    return <div>Processing TMDB authentication...</div>;
};

export default TMDBRedirectHandler;
