import { useLocation } from "react-router-dom";

export default function Receipt() {

  const { state } = useLocation();
  const { selectedRow, selectedSeats, screeningID, normalTickets, seniorTickets, childrenTickets, date, movieTitle, auditoriumId } = state;

  function generateBookingNumber() {
    let no = '';
    while (no.length < 3) {
      no += 'ABCDEFGHIJKLMNOPQRSTUVWZXYZ'[Math.floor(Math.random() * 26)];
    }
    while (no.length < 6) {
      no += Math.floor(Math.random() * 10);
    }
    return no;
  }

  const bookingNumber = generateBookingNumber();

  return (
    <div className="receipt">
      <h1>Thank you for your purchase!</h1>
      <div className="receipt-info">
        <div className="movie-details">
          <h2>{movieTitle}</h2>
          <p>Date: {date}</p>
          <p>Auditorium: {auditoriumId}</p>
          <p>Row: {selectedRow}</p>
          <p>Selected seats: {selectedSeats.join(", ")}</p>
        </div>
        <div className="ticket-info">
          <h2>Ticket information:</h2>
          <ul>
            <li>Normal tickets: {normalTickets}</li>
            <li>Senior tickets: {seniorTickets}</li>
            <li>Children tickets: {childrenTickets}</li>
          </ul>
          <h3>Total cost: {normalTickets * 85 + seniorTickets * 75 + childrenTickets * 65} SEK</h3>
          <p>Booking number: {bookingNumber}</p>
        </div>
      </div>
    </div>
  );
}