const sqlite3 = require('sqlite3').verbose();

const DB_SOURCE = "db.sqlite";

// Create a new database instance and open it
const db = new sqlite3.Database(DB_SOURCE, (err) => {
  if (err) {
    console.error("Error opening database: " + err.message);
  } else {
    console.log("Connected to the SQLite database.");
    // Create the transactions table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT CHECK(type IN ('Credit', 'Debit')) NOT NULL,
      amount REAL NOT NULL CHECK(amount >= 0),
      description TEXT,
      date TEXT NOT NULL,
      running_balance REAL NOT NULL
    )`, (err) => {
      if (err) {
        console.error("Error creating table: " + err.message);
      } else {
        console.log("Transactions table created or already exists.");
      }
    });
  }
});

module.exports = db;
