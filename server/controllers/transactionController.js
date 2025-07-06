import { validationResult } from 'express-validator';
import Transaction from '../models/Transaction.js';

// Get all transactions for a user
export const getTransactions = async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const transactions = await Transaction.find({ userId })
      .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

// Create a new transaction
export const createTransaction = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, amount, date, description, type, category } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const transaction = new Transaction({
      userId,
      amount: parseFloat(amount),
      date,
      description,
      type,
      category
    });

    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
};

// Update a transaction
export const updateTransaction = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { userId, amount, date, description, type, category } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, userId }, // Ensure user can only update their own transactions
      {
        amount: parseFloat(amount),
        date,
        description,
        type,
        category
      },
      { new: true, runValidators: true }
    );

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ error: 'Failed to update transaction' });
  }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const transaction = await Transaction.findOneAndDelete({ _id: id, userId });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
};

// Get transaction statistics for a user
export const getTransactionStats = async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const stats = await Transaction.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    const result = {
      totalIncome: 0,
      totalExpenses: 0,
      transactionCount: 0
    };

    stats.forEach(stat => {
      if (stat._id === 'income') {
        result.totalIncome = stat.total;
      } else if (stat._id === 'expense') {
        result.totalExpenses = stat.total;
      }
      result.transactionCount += stat.count;
    });

    result.balance = result.totalIncome - result.totalExpenses;

    res.json(result);
  } catch (error) {
    console.error('Error fetching transaction stats:', error);
    res.status(500).json({ error: 'Failed to fetch transaction statistics' });
  }
};