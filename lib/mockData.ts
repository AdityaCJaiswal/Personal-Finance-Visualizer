import { Transaction } from '@/types/transaction';

export const mockTransactions: Transaction[] = [
  {
    _id: '1',
    amount: 3500,
    date: '2024-01-15',
    description: 'Monthly Salary',
    type: 'income',
    category: 'Salary',
    userId: 'user1',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    _id: '2',
    amount: 1200,
    date: '2024-01-02',
    description: 'Apartment Rent',
    type: 'expense',
    category: 'Housing',
    userId: 'user1',
    createdAt: '2024-01-02T09:00:00Z',
    updatedAt: '2024-01-02T09:00:00Z'
  },
  {
    _id: '3',
    amount: 450,
    date: '2024-01-05',
    description: 'Grocery Shopping',
    type: 'expense',
    category: 'Food & Dining',
    userId: 'user1',
    createdAt: '2024-01-05T14:30:00Z',
    updatedAt: '2024-01-05T14:30:00Z'
  },
  {
    _id: '4',
    amount: 200,
    date: '2024-01-10',
    description: 'Freelance Project',
    type: 'income',
    category: 'Freelance',
    userId: 'user1',
    createdAt: '2024-01-10T16:00:00Z',
    updatedAt: '2024-01-10T16:00:00Z'
  },
  {
    _id: '5',
    amount: 80,
    date: '2024-01-12',
    description: 'Gas Station',
    type: 'expense',
    category: 'Transportation',
    userId: 'user1',
    createdAt: '2024-01-12T11:00:00Z',
    updatedAt: '2024-01-12T11:00:00Z'
  },
  {
    _id: '6',
    amount: 2800,
    date: '2024-02-15',
    description: 'Monthly Salary',
    type: 'income',
    category: 'Salary',
    userId: 'user1',
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z'
  },
  {
    _id: '7',
    amount: 1200,
    date: '2024-02-02',
    description: 'Apartment Rent',
    type: 'expense',
    category: 'Housing',
    userId: 'user1',
    createdAt: '2024-02-02T09:00:00Z',
    updatedAt: '2024-02-02T09:00:00Z'
  },
  {
    _id: '8',
    amount: 380,
    date: '2024-02-08',
    description: 'Grocery Shopping',
    type: 'expense',
    category: 'Food & Dining',
    userId: 'user1',
    createdAt: '2024-02-08T15:00:00Z',
    updatedAt: '2024-02-08T15:00:00Z'
  }
];

export const categories = {
  income: [
    'Salary',
    'Freelance', 
    'Investment',
    'Business',
    'Rental Income',
    'Dividends',
    'Bonus',
    'Gift',
    'Other Income'
  ],
  expense: [
    'Housing',
    'Food & Dining',
    'Transportation',
    'Entertainment',
    'Healthcare',
    'Shopping',
    'Utilities',
    'Insurance',
    'Education',
    'Travel',
    'Subscriptions',
    'Personal Care',
    'Gifts & Donations',
    'Other Expense'
  ]
};