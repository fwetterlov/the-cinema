import { useEffect } from 'react';
import { useStates } from './utilities/states';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SelectSeats(props) {

  let { screeningID, normalTickets, seniorTickets, childrenTickets, date, movieTitle, auditoriumId } = props;
  const totalTickets = normalTickets + seniorTickets + childrenTickets;
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedRow, setSelectedRow] = useState('');

  const s = useStates({
    screening: null,
    movie: null,
    seats: []
  });

  const handleConfirmSeats = (event) => {
    event.preventDefault();
    navigate("/receipt", {
      state: {
        selectedRow: selectedRow,
        selectedSeats: selectedSeats,
        screeningID: screeningID,
        normalTickets: normalTickets,
        seniorTickets: seniorTickets,
        childrenTickets: childrenTickets,
        date: date,
        movieTitle: movieTitle,
        auditoriumId: auditoriumId
      }
    })
  };

  useEffect(() => {
    (async () => {

      let screening = (await (await fetch(`/api/occupied_seats?screeningId=${screeningID}`)).json())[0];

      // Convert the string of occupied seats into an array of numbers
      screening.occupiedSeats = screening.occupiedSeats.split(', ').map(x => +x);

      // Set the state variable
      s.screening = screening;

      // Get the movie (with poster image, length of movie etc)
      s.movie = (await (await fetch(`/api/movies?title=${screening.movie}`)).json())[0];

      // Get the aditorium id from the auditorium name
      let auditoriumId = ['Stora Salongen', 'Lilla Salongen']
        .indexOf(s.screening.auditorium) + 1;

      // Get the seats
      let seats = await (await fetch(
        `/api/seats/?auditoriumId=${auditoriumId}&sort=seatNumber`)).json();

      // Convert the data structure from an array of objects
      // to an array (rows) of arrays (seats in rows) of objects
      let rows = [];
      let row;
      let latestRow;

      for (let seat of seats) {
        // Add a new property: Is the seat occupied? (true/false)
        seat.occupied = screening.occupiedSeats.includes(seat.seatNumber);
        // Arrange seats into rows
        if (latestRow !== seat.rowNumber) {
          row = [];
          rows.push(row);
        }
        row.push(seat);
        latestRow = seat.rowNumber
      }

      // Set the state variable
      s.seats = rows;
    })();
  }, []);


  function toggleSeatSelection(seat) {

    console.log(selectedSeats.length)
    // do nothing if occupied
    if (seat.occupied) {
      console.log("1")
      return;
    }
    if (selectedSeats.length > 1 && !(selectedSeats.includes(parseInt(seat.seatNumber) + 1) || selectedSeats.includes(parseInt(seat.seatNumber) - 1))) {
      console.log("2")
      return;
    }
    if (!seat.selected && selectedSeats.length === totalTickets) {
      console.log("3")
      return;
    }

    setSelectedRow(seat.rowNumber);

    setSelectedSeats(prevSeats => {
      const index = prevSeats.indexOf(seat.seatNumber);

      if (index > -1 && !seat.selected) {
        return prevSeats.filter(num => num !== seat.seatNumber);
      }

      if (index === -1 && seat.selected) {
        return [...prevSeats, seat.seatNumber];
      }

      return prevSeats;
    });

    // update seat selection state
    seat.selected = !seat.selected;
  }

  // output the seats
  return (
    s.seats.length === 0 ? null : <div className="screening-and-seats">
      <h1>{s.screening.movie}</h1>
      <h2>{new Intl.DateTimeFormat('en-EN', {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(s.screening.screeningTime))}</h2>
      <img
        className="poster-screen"
        src={'https://cinema-rest.nodehill.se' + s.movie.description.posterImage} />
      <div className="seats">
        {s.seats.map(row => <><div className="row">
          {row.map((seat) => <div
            key={seat.seatNumber}
            className={
              (seat.selected ? 'selected' : '')
              + (seat.occupied ? ' occupied' : '')
            }
            onClick={() => toggleSeatSelection(seat)}>{seat.seatNumber}
          </div>)}
        </div><br /></>)}
      </div>
      <button type="submit" onClick={handleConfirmSeats}>Confirm Seats</button>
    </div>
  );
}