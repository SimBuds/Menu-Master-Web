import React from 'react';
import SummaryBox from '../components/SummaryBox';
import RecentOrders from '../components/RecentOrders';
import MonthlySales from '../components/MonthlySales';
import MonthlySpend from '../components/MonthlySpend';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  return (
    <div className="container">
      <div className="row">
        <SummaryBox title="Monthly Expenses" value="$6,452" percentage="+5.39" />
        <SummaryBox title="Invoiced This Month" value="$42,324" percentage="-3.21" />
        <SummaryBox title="Food Cost" value="28%" percentage="+2.36" />
      </div>
      <div className="row">
        <RecentOrders />
        <MonthlySales />
        <MonthlySpend />
      </div>
    </div>
  );
}

export default Dashboard;