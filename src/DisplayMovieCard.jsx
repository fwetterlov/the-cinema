import { Link, useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';

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
      }} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card className="movie-card" >
          <Card.Img variant="top" src={`https://cinema-rest.nodehill.se${movie.description.posterImage}`} alt={movie.title} />
          <Card.Body className="movie-info">
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{`${Math.floor(movie.description.length / 60)}h ${movie.description.length % 60}min`}</Card.Text>
            <Card.Text>{new Date(time).toLocaleTimeString('sv-SV').substring(0, 5)}</Card.Text>
            <Card.Text>Auditorium {auditoriumId}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
}