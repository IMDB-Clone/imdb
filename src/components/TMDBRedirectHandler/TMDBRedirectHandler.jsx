// TMDBRedirectHandler.jsx

import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../services/usercontext";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { createTMDBSession } from "../../services/session";

const TMDBRedirectHandler = () => {
  const navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);
  const [handledRedirect, setHandledRedirect] = useState(false);

  useEffect(() => {
    // const redirectHandled = localStorage.getItem("tmdbRedirectHandled");

    const handleTMDBTokenApproval = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const approvedToken = urlParams.get("request_token");

      if (approvedToken) {
        try {
          const tmdbSessionId = await createTMDBSession(approvedToken);
          console.log(tmdbSessionId);

          setUser((user) => ({ ...user, tmdbSessionId }));
          console.log(user);

          // Update user in Firestore
          const db = getFirestore();
          const userRef = doc(db, "Users", user.uid); // Make sure user.uid is available in your context
          await updateDoc(userRef, { tmdbSessionId });

          localStorage.setItem("tmdbRedirectHandled", "true");
          setHandledRedirect(true);

          navigate("/home");
        } catch (error) {
          console.error("Error creating TMDB session", error);
          navigate("/home"); // Redirect to login on error
        }
      } else {
        navigate("/home"); // Redirect to login if no token is found
      }
    };

    handleTMDBTokenApproval();
  }, [navigate, setUser, handledRedirect, user]);

  return <div>Loading...</div>;
};

export default TMDBRedirectHandler;
