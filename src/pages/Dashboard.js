import React from 'react';
import SummaryBox from '../components/SummaryBox';
import RecentOrders from '../components/RecentOrders';
import MonthlySales from '../components/MonthlySales';
import MonthlySpend from '../components/MonthlySpend';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  return (
    <div className="container-fluid h-100 d-flex flex-column justify-content-center">
      <div className="row">
        <div className="col-md-4">
          <SummaryBox title="Monthly Expenses" value="$6,452" percentage="+5.39" />
        </div>
        <div className="col-md-4">
          <SummaryBox title="Invoiced This Month" value="$42,324" percentage="-3.21" />
        </div>
        <div className="col-md-4">
          <SummaryBox title="Food Cost" value="28%" percentage="+2.36" />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-4">
          <RecentOrders />
        </div>
        <div className="col-md-4">
          <MonthlySales />
        </div>
        <div className="col-md-4">
          <MonthlySpend />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;