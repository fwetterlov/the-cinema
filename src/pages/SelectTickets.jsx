import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, Form, Button, Container } from 'react-bootstrap';

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
    <Card className="ticket-card">
      <Card.Title as="h2">{movieTitle}</Card.Title>
      <Card.Body>
        <Card.Text>{date} in Auditorium {auditoriumId}</Card.Text>
        <Card.Title as="h3">Ticket Selection:</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="ticket-category">
            <Form.Label htmlFor="normalTickets">Normal:</Form.Label>
            <Form.Control
              type="number"
              id="normalTickets"
              name="normalTickets"
              value={normalTickets}
              onChange={handleNormalTicketsChange}
              max={10}
              min={0}
            />
          </Form.Group>
          <Form.Group className="ticket-category">
            <Form.Label htmlFor="seniorTickets">Senior:</Form.Label>
            <Form.Control
              type="number"
              id="seniorTickets"
              name="seniorTickets"
              value={seniorTickets}
              onChange={handleSeniorTicketsChange}
              max={10}
              min={0}
            />
          </Form.Group>
          <Form.Group className="ticket-category">
            <Form.Label htmlFor="childrenTickets">Children:</Form.Label>
            <Form.Control
              type="number"
              id="childrenTickets"
              name="childrenTickets"
              value={childrenTickets}
              onChange={handleChildrenTicketsChange}
              max={10}
              min={0}
            />
          </Form.Group>
          <Button variant="primary" type="submit">Confirm Tickets</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}