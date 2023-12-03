const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_ACCESS_TOKEN;

const fetchOptions = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
export const fetchUpcomingMovies = async () => {
  const response = await fetch(
    `${API_BASE_URL}/movie/upcoming?language=en-US&page=1`,
    {
      method: "GET",
      ...fetchOptions,
    }
  );

  if (!response.ok) {
    throw new Error(
      `HTTP error while fetching movies! status: ${response.status}`
    );
  }

  const data = await response.json();

  if (
    !data.results ||
    !Array.isArray(data.results) ||
    data.results.length === 0
  ) {
    throw new Error("No upcoming movies found on the first page.");
  }

  // Return the first 5 movies from page 1
  return data.results.slice(0, 5);
};


export const fetchRecentlyAdded = async () => {
  let response = await fetch(
    `${API_BASE_URL}/movie/now_playing?language=en-US&page=1`,
    {
      method: "GET",
      ...fetchOptions,
    }
  );

  if (!response.ok) {
    throw new Error(
      `HTTP error while fetching total pages! status: ${response.status}`
    );
  }

  let data = await response.json();

  if (
    !data.results ||
    !Array.isArray(data.results) ||
    data.results.length === 0
  ) {
    throw new Error("No now playing movies found on the first page.");
  }

  // Ensure we only return 5 movies by slicing the results
  const startIndex = Math.max(0, data.results.length - 5);
  const moviesToReturn = data.results.slice(startIndex, startIndex + 5);

  console.log(moviesToReturn);

  return moviesToReturn;
};


export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/popular?language=en-US&page=1`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const fetchTopUSMovies = async () => {
  const url = `${API_BASE_URL}/movie/top_rated?language=en-US&page=1&region=US`;

  try {
    const response = await fetch(url, {
      method: "GET",
      ...fetchOptions,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data.results.slice(0, 5);
  } catch (error) {
    console.error("Error fetching top US box office movies:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  const url = `${API_BASE_URL}/movie/${movieId}?language=en-US`;

  try {
    const response = await fetch(url, {
      method: "GET",
      ...fetchOptions,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const movieDetails = await response.json();
    return movieDetails;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const fetchTrailers = async (movieId) => {
  const url = `${API_BASE_URL}/movie/${movieId}/videos?language=en-US`;
  try {
    const response = await fetch(url, {
      method: "GET",
      ...fetchOptions,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const movieTrailers = await response.json();
    console.log(movieTrailers);
    return movieTrailers;
  } catch (error) {
    console.error("Error fetching movie trailers:", error);
    throw error;
  }
};
