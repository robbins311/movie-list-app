import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIstLoading] = useState(false);
  const [error, setError] = useState(null);
  async function fetchMovieHandler() {
    setIstLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      //error handling > catch구문으로 보내짐
      if (!response.ok) {
        throw new Error("SomeThing went wrong!");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
    setIstLoading(false);
  }

  let content = <o>Found no movies</o>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading ...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
