import { useLocation } from "react-router-dom";

export default function Booking() {
  const location = useLocation();
  console.log('location', location)

  return (
    <div>
      <h2>Booking for Screening ID {location.state.screeningID} on {location.state.date}</h2>
      <h4>Movie id {location.state.movieID}, movietitle = {location.state.movieTitle} in auditorium {location.state.auditoriumId}</h4>
    </div>
  );
}