import React from 'react';
import Sidebar from '../components/Sidebar';
import SummaryBox from '../components/SummaryBox';
import RecentOrders from '../components/RecentOrders';
import MonthlySales from '../components/MonthlySales';
import MonthlySpend from '../components/MonthlySpend';
import PrepList from './PrepList';
import '../assets/styles/main.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <SummaryBox title="Monthly Expenses" value="$6,452" percentage="+5.39" />
        <SummaryBox title="Invoiced This Month" value="$42,324" percentage="-3.21" />
        <SummaryBox title="Food Cost" value="28%" percentage="+2.36" />
        <RecentOrders />
        <MonthlySales />
        <MonthlySpend />
      </div>
      <PrepList />
    </div>
  );
}

export default Dashboard;

