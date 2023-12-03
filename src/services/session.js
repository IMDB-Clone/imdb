const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_AUTH_KEY;

const fetchOptions = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const redirectToTMDBForToken = async () => {
  try {
    const tokenResponse = await fetch(
      `${API_BASE_URL}/authentication/token/new`,
      {
        method: "GET",
        ...fetchOptions,
      }
    );

    if (!tokenResponse.ok) {
      throw new Error("Failed to fetch TMDB token");
    }

    const tokenData = await tokenResponse.json();
    const requestToken = tokenData.request_token;

    window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/tmdb-redirect`;
  } catch (error) {
    console.error("Error fetching TMDB token:", error);
    // Handle error (show message to user, etc.)
  }
};

export const createTMDBSession = async (requestToken) => {
    const sessionResponse = await fetch(`${API_BASE_URL}/authentication/session/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
      },
      body: JSON.stringify({ request_token: requestToken }),
    });
  
    if (!sessionResponse.ok) {
      throw new Error("Failed to create TMDB session");
    }
  
    const sessionData = await sessionResponse.json();
    return sessionData.session_id;
  };

// // This function might be part of a different component or logic, depending on your routing setup
// export const handleTMDBTokenApproval = async (approvedToken) => {
//   try {
//     const sessionResponse = await axios.post(
//       "https://api.themoviedb.org/3/authentication/session/new",
//       {
//         request_token: approvedToken,
//         Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTH_KEY}`,
//       }
//     );

//     const tmdbSessionId = sessionResponse.data.session_id;
//     console.log("GENERATE SESSION ID: " + tmdbSessionId);

//     // Store the session ID in your context or state for future use
//     // setUser or a similar function to update your context or state
//     setUser({
//       ...user, // existing user details
//       tmdbSessionId: tmdbSessionId,
//     });

//     console.log("USER AFTER SESSION ID: " + user);
//     // Redirect to the home or a relevant page
//     navigate("/home");
//   } catch (error) {
//     // Handle errors
//     console.error("Error creating TMDB session", error);
//   }
// };

// // The URL handling logic to extract the approved token
// // This might be in a useEffect in your component that handles the redirect
// useEffect(() => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const approvedToken = urlParams.get("request_token");
//   if (approvedToken) {
//     handleTMDBTokenApproval(approvedToken);
//   }
// }, []);
