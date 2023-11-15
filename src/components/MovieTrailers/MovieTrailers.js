import React, { useState, useEffect } from 'react';

const MovieTrailers = ({ movieId }) => {
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    const fetchTrailers = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.TMDB_AUTH_KEY}`
            }
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();
        setTrailers(json.results);
      } catch (err) {
        console.error('error:' + err);
      }
    };

    fetchTrailers();
  }, [movieId]);

  return (
    <div>
      {trailers.map(trailer => (
        <div key={trailer.id}>
          <h3>{trailer.name}</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={trailer.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default MovieTrailers;
