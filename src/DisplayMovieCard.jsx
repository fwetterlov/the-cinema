import { Link, useNavigate } from 'react-router-dom';

export default function DisplayMovieCard(props) {

  const navigate = useNavigate();
  let { screeningID, movieID, date, movie, time, auditoriumId } = props;

  function handleCardClick() {
    navigate("/selecttickets", { state: { screeningID: screeningID, movieID: movieID, movieTitle: movie.title, moviePoster: movie.description.posterImage, date: date, auditoriumId: auditoriumId } })
  }

  return (
    <div onClick={handleCardClick}>
      <Link key={`${movieID}-${date}`} to={{
        pathname: `/selecttickets`
      }} style={{ textDecoration: 'none', color: 'inherit' }} className="movie-card">
        <img src={`https://cinema-rest.nodehill.se${movie.description.posterImage}`} alt={movie.title} />
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{`${Math.floor(movie.description.length / 60)}h ${movie.description.length % 60}min`}</p>
          <p>{new Date(time).toLocaleTimeString('sv-SV').substring(0, 5)}</p>
          <p>Auditorium {auditoriumId}</p>
        </div>
      </Link>
    </div>
  );
}