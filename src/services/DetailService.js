// DetaileService.js

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_API_KEY; // Make sure this is correctly set in your .env file
const BEARER_TOKEN = process.env.REACT_APP_ACCESS_TOKEN; // Replace with actual token

const fetchOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}` // Make sure this token is valid
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const url = `${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(url, fetchOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error; // Re-throw to handle it in the calling function
  }
};

export const fetchMovieTrailers = async (movieId) => {
  try {
    const url = `${API_BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const videoData = await response.json();
    return videoData.results.find(video => video.type === 'Trailer');
  } catch (error) {
    console.error("Error fetching movie trailers:", error);
    throw error; // Re-throw to handle it in the calling function
  }
};

// DetailService.js

// ... (other imports and constants)

export const fetchWatchlistStatus = async (movieId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/account_states`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.watchlist;
  } catch (error) {
    console.error("Error fetching watchlist status:", error);
    throw error;
  }
};

export const updateWatchlist = async (movieId, newWatchlistStatus) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/account/20709913/watchlist`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieId,
        watchlist: newWatchlistStatus
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating watchlist:", error);
    throw error;
  }
};
// DetailService.js

// ... (other imports and constants)

export const fetchMovieCredits = async (movieId) => {
  try {
    const url = `${API_BASE_URL}/movie/${movieId}/credits?language=en-US`;
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      director: data.crew.find(person => person.job === 'Director')?.name || '',
      writers: data.crew.filter(person => person.department === 'Writing').map(writer => writer.name),
      stars: data.cast.slice(0, 3).map(star => star.name) // Top 3 billed actors
    };
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error; // Re-throw to handle it in the calling function
  }
};

// DetailService.js

// ... (other imports and constants)

export const fetchGenresAndOverview = async (movieId) => {
  try {
    const url = `${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      genres: data.genres,
      overview: data.overview
    };
  } catch (error) {
    console.error("Error fetching genres and overview:", error);
    throw error;
  }
};
// DetailService.js

// ... (other imports and constants)

export const fetchMovieData = async (movieId) => {
  try {
    const url = `${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      title: data.title,
      year: data.release_date ? new Date(data.release_date).getFullYear() : '',
      rating: data.vote_average,
      duration: data.runtime,
      imdbRating: data.vote_average,
      totalRatings: data.vote_count,
      yourRating: null, // Placeholder, to be dynamically updated based on user interaction
      popularity: data.popularity
    };
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
};

// DetailService.js


// DetailService.js////////////////////////////////////////////

// ... (other imports and constants)

export const fetchTotalReviews = async (movieId) => {
  try {
    const url = `${API_BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`;
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.total_results; // This will return the total number of reviews
  } catch (error) {
    console.error("Error fetching total reviews:", error);
    throw error;
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const fetchRatingStatus = async (movieId) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${BEARER_TOKEN}`
    }
  };

  const response = await fetch(`${API_BASE_URL}/movie/${movieId}/account_states?api_key=${API_KEY}`, options);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
};

export const updateRating = async (movieId, rating) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    body: JSON.stringify({ value: rating })
  };

  const response = await fetch(`${API_BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}`, options);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
};

export const removeRating = async (movieId) => {
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${BEARER_TOKEN}`
    }
  };

  const response = await fetch(`${API_BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}`, options);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
};

