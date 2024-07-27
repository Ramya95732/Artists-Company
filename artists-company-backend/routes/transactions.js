const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Existing routes
router.post('/', transactionController.addTransaction);
router.get('/', transactionController.getAllTransactions);

// Add the PUT route
router.put('/:id', transactionController.updateTransaction); // Ensure this is present

// Add the DELETE route
router.delete('/:id', transactionController.deleteTransaction); // Ensure this is present

module.exports = router;
