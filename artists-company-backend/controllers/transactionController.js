// controllers/transactionController.js
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

module.exports = {
  addTransaction,
  getAllTransactions
};
