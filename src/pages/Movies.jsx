import React, { useState, useEffect } from "react";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [screenings, setScreenings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    (async () => {
      const moviesResponse = await fetch('/api/movies');
      setMovies(await moviesResponse.json());

      const screeningsResponse = await fetch('/api/screenings');
      setScreenings(await screeningsResponse.json());
    })();
  }, []);

  useEffect(() => {
    const allCategories = movies.reduce((categories, movie) => {
      movie.description.categories.forEach(category => {
        if (!categories.includes(category)) {
          categories.push(category);
        }
      });
      return categories;
    }, []);

    setCategories(allCategories);
  }, [movies]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-EN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const groupedScreenings = screenings.reduce((acc, screening) => {
    const date = formatDate(screening.time);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(screening);
    return acc;
  }, {});

  return (
    <div>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      {Object.keys(groupedScreenings).map((date) => (
        <div key={date} className="date">
          <h2>{date}</h2>
          <div className="movie-cards">
            {groupedScreenings[date].map(({ id, time, movieId, auditoriumId }) => {
              const movie = movies.find(movie => movie.id === movieId);
              return (
                <div key={id} className="movie-card" onClick={() => console.log(movie, date)}>
                  <img src={`https://cinema-rest.nodehill.se${movie.description.posterImage}`} alt={movie.title} />
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>{`${Math.floor(movie.description.length / 60)}h ${movie.description.length % 60}min`}</p>
                    <p>{new Date(time).toLocaleTimeString('sv-SV').substring(0, 5)}</p>
                    <p>Auditorium {auditoriumId}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
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