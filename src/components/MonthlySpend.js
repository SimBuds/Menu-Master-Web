import React from 'react';
import '../assets/css/MonthlySpend.css';

const MonthlySpendCard = ({ percentage }) => {
  const radius = 36; // Radius of the circle
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="monthly-spend-card">
      <h2>Monthly Spend</h2>
      <p>Nov 1 - 15, 2023</p>
      <div className="circle-progress-container">
        <svg
          className="circle-progress-bar"
          width="100"
          height="100"
          viewBox="0 0 100 100"
        >
          <circle
            className="circle-background"
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#eee"
            strokeWidth="10"
          />
          <circle
            className="circle-progress"
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#ff4500"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="percentage">{percentage}%</div>
      </div>
    </div>
  );
};

export default MonthlySpendCard;