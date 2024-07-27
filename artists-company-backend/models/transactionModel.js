const db = require('../config/db');

// Function to get the latest running balance
const getLatestRunningBalance = (callback) => {
  db.get("SELECT running_balance FROM transactions ORDER BY date DESC, id DESC LIMIT 1", [], (err, row) => {
    if (err) {
      callback(err, null);
    } else {
      const lastRunningBalance = row ? row.running_balance : 0;
      callback(null, lastRunningBalance);
    }
  });
};

// Add a new transaction and update the running balance
const addTransaction = (transaction, callback) => {
  const { type, amount, description, date } = transaction;

  // Get the latest running balance
  getLatestRunningBalance((err, lastRunningBalance) => {
    if (err) {
      return callback(err, null);
    }

    let running_balance;
    if (type === "Debit") {
      running_balance = lastRunningBalance - amount;
    } else if (type === "Credit") {
      running_balance = lastRunningBalance + amount;
    } else {
      return callback(new Error("Invalid transaction type"), null);
    }

    db.run(`INSERT INTO transactions (type, amount, description, date, running_balance) VALUES (?, ?, ?, ?, ?)`,
      [type, amount, description, date, running_balance],
      function (err) {
        callback(err, this.lastID);
      });
  });
};

// Fetch all transactions
const getAllTransactions = (callback) => {
  db.all("SELECT * FROM transactions ORDER BY date DESC, id DESC", [], (err, rows) => {
    callback(err, rows);
  });
};

module.exports = {
  addTransaction,
  getAllTransactions
};
