import React from 'react';

function SummaryBox({ title, value, percentage }) {
  return (
    <div className="summary-box">
      <h2>{title}</h2>
      <p>{value}</p>
      <span>{percentage}%</span>
    </div>
  );
}

export default SummaryBox;