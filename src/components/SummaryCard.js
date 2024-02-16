import React from 'react';
import { Card } from 'react-bootstrap';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
import '../assets/css/SummaryCard.css'; // Ensure the path is correct

function SummaryCard({ title, value, percentage, increase, date, highlight }) {
  return (
    <Card className={`summary-card h-100 ${highlight ? 'highlight' : ''}`}>
      <Card.Body>
        <Card.Title className="summary-card-title">{title}</Card.Title>
        <Card.Text className="summary-card-value">{value}</Card.Text>
        <Card.Text className={`summary-card-percentage ${increase ? 'increase' : 'decrease'}`}>
          {increase ? <BsArrowUp /> : <BsArrowDown />} {percentage}%
        </Card.Text>
        {date && <Card.Text className="summary-card-date">{date}</Card.Text>}
      </Card.Body>
    </Card>
  );
}

export default SummaryCard;