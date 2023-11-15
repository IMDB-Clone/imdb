const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_AUTH_KEY;

const fetchOptions = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchUpcomingMovies = async () => {
  let response = await fetch(
    `${API_BASE_URL}/movie/upcoming?language=en-US&page=1`,
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
    throw new Error("No upcoming movies found on the first page.");
  }
  const totalPages = data.total_pages;

  response = await fetch(
    `${API_BASE_URL}/movie/upcoming?language=en-US&page=${totalPages}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `HTTP error while fetching movies from the last page! status: ${response.status}`
    );
  }

  data = await response.json();

  if (!data.results || !Array.isArray(data.results)) {
    throw new Error("No upcoming movies found on the last page.");
  }

  const moviesToReturn =
    data.results.length >= 5 ? data.results.slice(-5) : data.results;

  return moviesToReturn.reverse();
};

export const fetchRecentlyAdded = async () => {
  let response = await fetch(
    `${API_BASE_URL}/movie/now_playing?language=en-US&page=1?`,
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
    throw new Error("No upcoming movies found on the first page.");
  }
  const totalPages = data.total_pages;

  response = await fetch(
    `${API_BASE_URL}/movie/now_playing?language=en-US&page=${totalPages}`,
    {
      method: "GET",
      ...fetchOptions,
    }
  );

  if (!response.ok) {
    throw new Error(
      `HTTP error while fetching movies from the last page! status: ${response.status}`
    );
  }

  data = await response.json();
  if (!data.results || !Array.isArray(data.results)) {
    throw new Error("No upcoming movies found on the last page.");
  }

  const moviesToReturn =
    data.results.length >= 5 ? data.results.slice(-5) : data.results;

  return moviesToReturn.reverse();
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
    console.log(movieDetails);
    return movieDetails;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
