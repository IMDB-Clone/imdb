import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../services/usercontext';
import { createSessionId } from '../../services/session';

const TMDBRedirectHandler = () => {
    const { updateUser } = useContext(UserContext);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizedToken = urlParams.get('request_token');

        if (authorizedToken) {
          createSessionId(authorizedToken)
            .then(sessionId => {
              updateUser({ sessionId });
              console.log("Yay session ID! "+sessionId);
              
            })
            .catch(error => {
              console.error("Error creating session:", error);
              console.log("oh no :(");
            });
        }
      }, [updateUser]);

    return <div>Processing TMDB authentication...</div>;
};

export default TMDBRedirectHandler;
