// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const transactionsRouter = require('./routes/transactions');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Use the transactions router
app.use('/api/transactions', transactionsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
