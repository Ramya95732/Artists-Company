import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './TransactionTable.css'; // Create this CSS file for custom styles

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTransactions();
  }, []);

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="container">
      <h1>Office Transactions</h1>
      <button className="add-button" onClick={() => window.location.href = '/add-transaction'}>
        + Add Transaction
      </button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Running Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(txn => (
            <tr key={txn.id}>
              <td>{txn.date}</td>
              <td>{txn.description}</td>
              <td>{txn.type === 'Credit' ? txn.amount : '-'}</td>
              <td>{txn.type === 'Debit' ? txn.amount : '-'}</td>
              <td>{txn.running_balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
