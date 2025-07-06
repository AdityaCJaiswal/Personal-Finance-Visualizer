import express from 'express';
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionStats
} from '../controllers/transactionController.js';
import { validateTransaction } from '../middleware/validation.js';

const router = express.Router();

// GET /api/transactions - Get all transactions for a user
router.get('/', getTransactions);

// POST /api/transactions - Create a new transaction
router.post('/', validateTransaction, createTransaction);

// PUT /api/transactions/:id - Update a transaction
router.put('/:id', validateTransaction, updateTransaction);

// DELETE /api/transactions/:id - Delete a transaction
router.delete('/:id', deleteTransaction);

// GET /api/transactions/stats - Get transaction statistics
router.get('/stats', getTransactionStats);

export default router;