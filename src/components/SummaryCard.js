import React from 'react';
import { Card } from 'react-bootstrap';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
import '../assets/css/SummaryCard.css';

function SummaryCard({ title, value, percentage, increase, date }) {
  return (
    <Card className="summary-card">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="date">{date}</Card.Text>
        <Card.Text className="value">{value}</Card.Text>
        <Card.Text className={`percentage ${increase ? 'increase' : 'decrease'}`}>
          {increase ? <BsArrowUp /> : <BsArrowDown />} {percentage}%
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default SummaryCard;