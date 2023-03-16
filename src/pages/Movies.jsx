import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [screenings, setScreenings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    (async () => {
      const moviesResponse = await fetch('/api/movies');
      setMovies(await moviesResponse.json());

      const screeningsResponse = await fetch('/api/screenings');
      setScreenings(await screeningsResponse.json());
    })();
  }, []);

  const uniqueCategories = getUniqueCategories(movies);
  const filteredMovies = movies.filter((movie) => {
    return (selectedCategory === '' || movie.description.categories.includes(selectedCategory))
  });

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleMovieCardClick(movie, date) {
    setSelectedScreening({ movie, date });
  }

  function getUniqueCategories(movies) {
    const categories = [];

    movies.forEach((movie) => {
      movie.description.categories.forEach((category) => {
        if (!categories.includes(category)) {
          categories.push(category);
        }
      });
    });

    return categories;
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString('en-EN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function groupScreeningsByDate(screenings) {
    const groupedScreenings = screenings.reduce((acc, screening) => {
      const date = formatDate(screening.time);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(screening);
      return acc;
    }, {});
    return groupedScreenings;
  }

  const groupedScreenings = groupScreeningsByDate(screenings);

  return (
    <div>
      <label htmlFor="category-select">Select a category: </label>
      <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {uniqueCategories.map((category) => {
          return <option key={category} value={category}>{category}</option>;
        })}
      </select>
      {Object.keys(groupedScreenings).map((date) => {
        const screeningsForDate = groupedScreenings[date].filter(({ movieId }) => {
          const movie = movies.find(movie => movie.id === movieId);
          return filteredMovies.includes(movie);
        });

        if (screeningsForDate.length === 0) {
          return null;
        }

        return (
          <div key={date} className="date">
            <h2>{date}</h2>
            <div className="movie-cards">
              {screeningsForDate.map(({ id, time, movieId, auditoriumId }) => {
                const movie = movies.find(movie => movie.id === movieId);
                return (
                  <Link to={`/booking/${id}/${date}`} style={{ textDecoration: 'none', color: 'inherit' }} className="movie-card" onClick={() => handleMovieCardClick(movie, date)}>
                    <img src={`https://cinema-rest.nodehill.se${movie.description.posterImage}`} alt={movie.title} />
                    <div className="movie-info">
                      <h3>{movie.title}</h3>
                      <p>{`${Math.floor(movie.description.length / 60)}h ${movie.description.length % 60}min`}</p>
                      <p>{new Date(time).toLocaleTimeString('sv-SV').substring(0, 5)}</p>
                      <p>Auditorium {auditoriumId}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/*
<div className="card-container">
      {movies.map(movie => (
        <div key={movie.id} className="card">
          <img src={`https://cinema-rest.nodehill.se${movie.description.posterImage}`} alt={movie.title} />
          <div className="card-body">
            <h2 className="card-title">{movie.title}</h2>
            <p className="card-text">{movie.description.categories.join(', ')}</p>
          </div>
        </div>
      ))}
    </div>*/