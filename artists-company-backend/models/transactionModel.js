const db = require('../config/db');

const addTransaction = (transaction, callback) => {
  const { type, amount, description, date } = transaction;
  if (!type || !amount || !description || !date) {
    return callback(new Error('All fields are required'));
  }

  // Calculate the running balance
  let running_balance = 0;

  // Get the last running balance from the most recent transaction
  db.get('SELECT running_balance FROM transactions ORDER BY id DESC LIMIT 1', (err, row) => {
    if (err) {
      return callback(err);
    }

    running_balance = row ? row.running_balance : 0;

    if (type === 'Credit') {
      running_balance += parseFloat(amount);
    } else if (type === 'Debit') {
      running_balance -= parseFloat(amount);
    }

    const sql = `INSERT INTO transactions (type, amount, description, date, running_balance) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [type, amount, description, date, running_balance], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, this.lastID);
    });
  });
};

const getAllTransactions = (callback) => {
  const sql = 'SELECT * FROM transactions ORDER BY date DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};

const updateTransaction = (id, transaction, callback) => {
  const { type, amount, description, date } = transaction;
  if (!type || !amount || !description || !date) {
    return callback(new Error('All fields are required'));
  }

  // Calculate the new running balance
  let running_balance = 0;

  db.get('SELECT running_balance FROM transactions ORDER BY id DESC LIMIT 1', (err, row) => {
    if (err) {
      return callback(err);
    }

    running_balance = row ? row.running_balance : 0;

    if (type === 'Credit') {
      running_balance += parseFloat(amount);
    } else if (type === 'Debit') {
      running_balance -= parseFloat(amount);
    }

    const sql = `UPDATE transactions SET type = ?, amount = ?, description = ?, date = ?, running_balance = ? WHERE id = ?`;
    db.run(sql, [type, amount, description, date, running_balance, id], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
};

const deleteTransaction = (id, callback) => {
  const sql = `DELETE FROM transactions WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
};

module.exports = {
  addTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction
};
