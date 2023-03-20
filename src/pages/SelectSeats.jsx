import { useLocation } from "react-router-dom";
import DisplaySeats from '../DisplaySeats'

export default function SelectSeats() {

  const { state } = useLocation();
  const { screeningID, normalTickets, seniorTickets, childrenTickets, date, movieTitle, auditoriumId } = state;

  return (
    <DisplaySeats screeningID={screeningID} normalTickets={normalTickets} seniorTickets={seniorTickets} childrenTickets={childrenTickets} date={date} movieTitle={movieTitle} auditoriumId={auditoriumId} />
  );

}