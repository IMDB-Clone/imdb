const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_AUTH_KEY;

const fetchOptions = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// Function to create a new request token
export const createRequestToken = async () => {
  const url = `${API_BASE_URL}/authentication/token/new`;
  const response = await fetch(url, { ...fetchOptions, method: "GET" });

  if (!response.ok) {
    throw new Error(
      `HTTP error while creating request token! status: ${response.status}`
    );
  }

  const data = await response.json();
  console.log("generated request token: " + data.request_token);
  return data.request_token;
};

// Function to create a new session ID with an authorized request token
export const createSessionId = async (authorizedRequestToken) => {
console.log("trying to create session id...");
  const url = `${API_BASE_URL}/authentication/session/new`;
  const options = {
    ...fetchOptions,
    method: "POST",
    headers: {
      ...fetchOptions.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ request_token: authorizedRequestToken }),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `HTTP error while creating session ID! status: ${response.status}`
    );
  }


  const data = await response.json();
  console.log("endpoint's created session id: "+ data.session_id);
  return data.session_id;
};
