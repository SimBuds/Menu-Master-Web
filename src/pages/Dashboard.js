import React from 'react';
import SummaryCard from '../components/SummaryCard';
import RecentOrders from '../components/RecentOrders'; 
import MonthlySpend from '../components/MonthlySpend';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="summary-section">
        <SummaryCard title="Monthly Expenses" value="$6,452" percentage="5.39" increase />
        <SummaryCard title="Invoiced this month" value="$42,502" percentage="0.65" decrease />
        <SummaryCard title="Food Cost" value="18%" percentage="0.12" increase />
      </div>
      <div className="recent-orders-section">
        <RecentOrders />
      </div>
      <div className="sales-spend-section">
        <SummaryCard title="Monthly Sales" date="June 2021" value="$6,452" percentage="5.39" increase />
        <MonthlySpend percentage={55} />
        <MonthlySpend percentage={70} />
      </div>
    </div>
  );
}

export default Dashboard;