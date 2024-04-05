import React from 'react';
import SummaryCard from '../components/SummaryCard';
import WeeklyExpensesChart from '../components/WeeklyExpensesChart';
import '../assets/css/Suppliers.css';

const Suppliers = () => {
  const monthlyExpenses = {
    title: 'Monthly Expenses',
    value: '$48,502',
    percentage: 5.39,
    increase: true 
  };

  const invoicedThisMonth = {
    title: 'Invoiced this month',
    value: '$32,502',
    percentage: 0.65,
    decrease: true
  };

  const invoicesPaid = {
    title: 'Invoices Paid',
    value: '$26,201',
    percentage: 55.09,
    increase: true
  };

  const weeklyExpensesChartData = {
    labels: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
    values: [1000, 3000, 4500, 7000, 7600, 6500, 3000]
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
    </div>
  );
};

export default Suppliers;

