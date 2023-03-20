import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SelectTickets() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { screeningID, date, movieID, movieTitle, moviePoster, auditoriumId } = state;

  // state variables for ticket selection
  const [normalTickets, setNormalTickets] = useState(0);
  const [seniorTickets, setSeniorTickets] = useState(0);
  const [childrenTickets, setChildrenTickets] = useState(0);

  // handle ticket selection input changes
  const handleNormalTicketsChange = (event) => {
    setNormalTickets(Number(event.target.value));
  };

  const handleSeniorTicketsChange = (event) => {
    setSeniorTickets(Number(event.target.value));
  };

  const handleChildrenTicketsChange = (event) => {
    setChildrenTickets(Number(event.target.value));
  };

  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/selectseats", { state: { screeningID, normalTickets: normalTickets, seniorTickets: seniorTickets, childrenTickets: childrenTickets, date: date, movieTitle: movieTitle, auditoriumId: auditoriumId } })
  };

  return (
    <div className="ticket-card">
      <h2>{movieTitle}</h2>
      <img src={`https://cinema-rest.nodehill.se${moviePoster}`} alt={movieTitle} />
      <p>{date} in Auditorium {auditoriumId}</p>
      <h3>Ticket Selection:</h3>
      <form onSubmit={handleSubmit}>
        <div className="ticket-category">
          <label htmlFor="normalTickets">Normal:</label>
          <input
            type="number"
            id="normalTickets"
            name="normalTickets"
            value={normalTickets}
            onChange={handleNormalTicketsChange}
          />
        </div>
        <div className="ticket-category">
          <label htmlFor="seniorTickets">Senior:</label>
          <input
            type="number"
            id="seniorTickets"
            name="seniorTickets"
            value={seniorTickets}
            onChange={handleSeniorTicketsChange}
          />
        </div>
        <div className="ticket-category">
          <label htmlFor="childrenTickets">Children:</label>
          <input
            type="number"
            id="childrenTickets"
            name="childrenTickets"
            value={childrenTickets}
            onChange={handleChildrenTicketsChange}
          />
        </div>
        <button type="submit">Confirm Tickets</button>
      </form>
    </div>
  );
}