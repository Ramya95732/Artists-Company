import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Home.css'; // Import the CSS file if you use it
import AddTransactionModal from '../components/Modals/AddTransactionModal';
import EditTransactionModal from '../components/Modals/EditTransactionModal';
import DeleteTransactionModal from '../components/Modals/DeleteTransactionModal';
import { Button } from 'react-bootstrap'; // Import Button from React Bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    description: '',
    date: ''
  });

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/transactions');
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const data = await response.json();
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

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (transaction) => {
    setFormData(transaction);
    setCurrentTransaction(transaction);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleShowDeleteModal = (transaction) => {
    setCurrentTransaction(transaction);
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleAddTransaction = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }
      fetchTransactions(); // Refresh the transaction list
      setFormData({ type: '', amount: '', description: '', date: '' }); // Clear form data
      handleCloseAddModal();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEditTransaction = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/transactions/${currentTransaction.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to edit transaction');
      }
      fetchTransactions(); // Refresh the transaction list
      setFormData({ type: '', amount: '', description: '', date: '' }); // Clear form data
      handleCloseEditModal();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteTransaction = async () => {
    if (currentTransaction) {
      try {
        const response = await fetch(`http://localhost:5000/api/transactions/${currentTransaction.id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete transaction');
        }
        fetchTransactions(); // Refresh the transaction list
      } catch (error) {
        alert(error.message);
      } finally {
        handleCloseDeleteModal();
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Office Transactions</h1>
        <Button style={{height:"40px"}} variant="primary" onClick={handleShowAddModal}>
          + Add Transaction
        </Button>
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
              {/* <th>Actions</th> */}
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
                {/* <td>
                  <Button
                    style={{ marginRight: "10px" }}
                    variant="warning"
                    onClick={() => handleShowEditModal(transaction)}
                    className="mr-2"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleShowDeleteModal(transaction)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <AddTransactionModal
        show={showAddModal}
        handleClose={handleCloseAddModal}
        handleSave={handleAddTransaction}
        formData={formData}
        handleFormChange={handleFormChange}
      />

      <EditTransactionModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        handleSave={handleEditTransaction}
        formData={formData}
        handleFormChange={handleFormChange}
      />

      <DeleteTransactionModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDeleteTransaction}
      />
    </div>
  );
};

export default Home;
