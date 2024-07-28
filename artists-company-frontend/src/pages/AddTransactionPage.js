import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './AddTransaction.css'; // Import CSS file if it exists

const AddTransactionPage = () => {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!type) errors.type = 'Transaction type is required.';
    if (!amount || amount <= 0) errors.amount = 'Amount must be a positive number.';
    if (!description) errors.description = 'Description is required.';
    if (!date) errors.date = 'Date is required.';
    return errors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'amount') {
      if (value > 0) {
        setErrors((prevErrors) => ({ ...prevErrors, amount: '' }));
      }
      setAmount(value);
    } else if (id === 'type') {
      setType(value);
    } else if (id === 'description') {
      setDescription(value);
    } else if (id === 'date') {
      setDate(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({}); // Clear errors if validation passes

    try {
      const response = await fetch('https://artists-company-4.onrender.com/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          amount,
          description,
          date,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }

      navigate('/');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">New Transaction</h1>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
            <div className="mb-3">
              <label htmlFor="type" className="form-label">Transaction Type:</label>
              <select
                id="type"
                className={`form-select ${errors.type ? 'is-invalid' : ''}`}
                value={type}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
              </select>
              {errors.type && <div className="invalid-feedback">{errors.type}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount:</label>
              <input
                id="amount"
                type="number"
                className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                value={amount}
                onChange={handleChange}
              />
              {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description:</label>
              <textarea
                id="description"
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                value={description}
                onChange={handleChange}
                rows="4"
              />
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Date:</label>
              <input
                id="date"
                type="date"
                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                value={date}
                onChange={handleChange}
              />
              {errors.date && <div className="invalid-feedback">{errors.date}</div>}
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionPage;
