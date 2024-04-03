import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const WeeklyExpensesChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Added to maintain aspect ratio according to the container's size
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Weekly Expenses',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Expenses',
        data: data.values,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height: '300px', width: '100%' }}> {/* Inline styling added to match the image */}
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default WeeklyExpensesChart;
