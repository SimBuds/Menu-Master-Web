import React from 'react';
import SummaryCard from '../components/SummaryCard';
import RecentOrders from '../components/RecentOrders';
import WeeklyExpensesChart from '../components/WeeklyExpensesChart';
import 'bootstrap/dist/css/bootstrap.min.css';

const Suppliers = () => {
  // Assuming you have an API or some data source to get these values
  // Here they are hard-coded for demonstration purposes
  const monthlyExpenses = {
    title: 'Monthly Expenses',
    value: '$6,452',
    percentage: 5.39,
    increase: true // This indicates the percentage increased, so you might display this with a green arrow or similar indicator
  };

  const invoicedThisMonth = {
    title: 'Invoiced this month',
    value: '$42,502',
    percentage: 0.65,
    decrease: true // This indicates the percentage decreased, you might display this with a red arrow or similar indicator
  };

  const invoicesPaid = {
    title: 'Invoices Paid',
    value: '$16,201',
    percentage: 2.29,
    increase: true
  };

  // Recent orders data, could also be fetched from an API
  const recentOrdersData = [
    // Add your recent orders here
  ];

  // Weekly expenses chart data, now with filler data
  const weeklyExpensesChartData = {
    labels: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
    values: [35000, 31000, 42500, 37000, 26000, 28500, 39000]
  };

  return (
    <div className="container-fluid py-4">
      <h1 className="text-center mb-4">Suppliers Dashboard</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-md-4 mb-3">
          <SummaryCard 
            title={monthlyExpenses.title}
            value={monthlyExpenses.value}
            percentage={monthlyExpenses.percentage}
            increase={monthlyExpenses.increase}
          />
        </div>
        <div className="col-md-4 mb-3">
          <SummaryCard 
            title={invoicedThisMonth.title}
            value={invoicedThisMonth.value}
            percentage={invoicedThisMonth.percentage}
            decrease={invoicedThisMonth.decrease}
          />
        </div>
        <div className="col-md-4 mb-3">
          <SummaryCard 
            title={invoicesPaid.title}
            value={invoicesPaid.value}
            percentage={invoicesPaid.percentage}
            increase={invoicesPaid.increase}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-4">
          <WeeklyExpensesChart data={weeklyExpensesChartData} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <RecentOrders data={recentOrdersData} />
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
