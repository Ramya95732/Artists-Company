// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Home.css'; // Import the CSS file if you use it

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/transactions');
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const data = await response.json();
      // Sort transactions by ID in descending order
      data.sort((a, b) => b.id - a.id);
      setTransactions(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h1>Office Transactions</h1>
        <Link to="/add-transaction">
          <button className="btn btn-primary">+ Add Transaction</button>
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered">
          <thead className="bg-light">
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Running Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td className="description-column">{transaction.description}</td>
                <td>{transaction.type === 'Debit' ? transaction.amount : ''}</td>
                <td>{transaction.type === 'Credit' ? transaction.amount : ''}</td>
                <td>{transaction.running_balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
