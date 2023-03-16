import { useParams, useLocation } from "react-router-dom";

export default function Booking() {
  const { movieID, date } = useParams();

  return (
    <div>
      <h2>Booking for Movie ID {movieID} on {date}</h2>
    </div>
  );
}