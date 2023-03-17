import { useLocation } from "react-router-dom";
import DisplaySeats from '../DisplaySeats'

export default function SelectSeats() {

  const { state } = useLocation();
  const { screeningID, normalTickets, seniorTickets, childrenTickets } = state;
  const id = screeningID;
  console.log("normalTickets: " + normalTickets, "seniorTickets: " + seniorTickets, "childrenTickets: " + childrenTickets)

  return (
    <DisplaySeats key={id} screeningID={id} />
  );

}