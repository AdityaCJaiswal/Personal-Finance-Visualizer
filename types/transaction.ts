export interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
  type: 'income' | 'expense';
  category: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TransactionFormData {
  amount: string;
  date: string;
  description: string;
  type: 'income' | 'expense';
  category: string;
}

export interface MonthlyExpense {
  month: string;
  amount: number;
  income: number;
  expenses: number;
}

export interface Budget {
  _id: string;
  category: string;
  amount: number;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BudgetFormData {
  category: string;
  amount: string;
}