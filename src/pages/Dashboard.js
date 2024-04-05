import React from 'react';
import SummaryCard from '../components/SummaryCard';
import RecentOrders from '../components/RecentOrders'; 
import MonthlySpend from '../components/MonthlySpend';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Dashboard.css';

function Dashboard() {
  const cards = [
    { title: 'Monthly Invoices', value: '$42,502', percentage: 22.39, increase: true },
    { title: 'Weekly Sales', value: '$12,502', percentage: 5.65, decrease: true },
    { title: 'Food Cost', value: '18%', percentage: 1.99, increase: true },
  ];

  const highestPercentageCard = cards.reduce((max, card) => card.percentage > max.percentage ? card : max, cards[0]);

  return (
    <div className="container-fluid">
      <h1 className="text-center my-4">Dashboard</h1>
      <div className="row justify-content-center">
        {/* Summary Cards */}
        {cards.map(card => (
          <div className="col-md-4 mb-4">
            <SummaryCard
              title={card.title}
              value={card.value}
              percentage={card.percentage}
              increase={card.increase}
              highlight={card === highestPercentageCard}
            />
          </div>
        ))}
      </div>
      <div className="row mt-5">
        {/* Recent Orders */}
        <div className="col-md-12">
        <RecentOrders limit={4} />
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        {/* Monthly Sales */}
        <div className="col-md-4">
        <MonthlySpend title="Monthly Sales" date="April, 2024" percentage="5" increase />
        </div>
        {/* Monthly Spend */}
        <div className="col-md-4">
          <MonthlySpend title="Monthly Spend" date="March 1 - 31, 2024" percentage={60} />
        </div>
        <div className="col-md-4">
          <MonthlySpend title="Monthly Outage" date="March 1 - 31, 2024" percentage={3} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;