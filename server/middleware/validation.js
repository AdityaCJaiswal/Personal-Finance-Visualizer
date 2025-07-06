import { body } from 'express-validator';

export const validateTransaction = [
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be a positive number'),
  
  body('date')
    .isISO8601()
    .withMessage('Date must be in valid ISO format'),
  
  body('description')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Description must be between 1 and 100 characters'),
  
  body('type')
    .isIn(['income', 'expense'])
    .withMessage('Type must be either income or expense'),
  
  body('category')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Category is required'),
  
  body('userId')
    .isLength({ min: 1 })
    .withMessage('User ID is required')
];