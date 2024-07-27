const transactionModel = require('../models/transactionModel');

const addTransaction = (req, res) => {
  const transaction = req.body;
  transactionModel.addTransaction(transaction, (err, id) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).send({ id });
    }
  });
};

const getAllTransactions = (req, res) => {
  transactionModel.getAllTransactions((err, transactions) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).json(transactions);
    }
  });
};

const updateTransaction = (req, res) => {
  const { id } = req.params;
  const transaction = req.body;
  transactionModel.updateTransaction(id, transaction, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send({ message: 'Transaction updated successfully' });
    }
  });
};

const deleteTransaction = (req, res) => {
  const { id } = req.params;
  transactionModel.deleteTransaction(id, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send({ message: 'Transaction deleted successfully' });
    }
  });
};

module.exports = {
  addTransaction,
  getAllTransactions,
  updateTransaction, // Ensure this is exported
  deleteTransaction  // Ensure this is exported
};
