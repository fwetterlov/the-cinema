import { Link } from 'react-router-dom';

export default function DisplayMovieCard(props) {

  let { id, date, movies, movie, time, auditoriumId } = props;

  return (
    <Link key={`${id}-${date}`} to={{
      pathname: `/booking/${id}/${date}`
    }} style={{ textDecoration: 'none', color: 'inherit' }} className="movie-card">
      <img src={`https://cinema-rest.nodehill.se${movie.description.posterImage}`} alt={movie.title} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{`${Math.floor(movie.description.length / 60)}h ${movie.description.length % 60}min`}</p>
        <p>{new Date(time).toLocaleTimeString('sv-SV').substring(0, 5)}</p>
        <p>Auditorium {auditoriumId}</p>
      </div>
    </Link>
  );
}