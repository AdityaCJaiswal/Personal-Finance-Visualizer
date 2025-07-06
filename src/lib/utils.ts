import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Transaction, MonthlyExpense } from '@/types/transaction';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function getMonthlyExpenses(transactions: Transaction[]): MonthlyExpense[] {
  const monthlyData: Record<string, MonthlyExpense> = {};

  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthName = date.toLocaleString('default', { month: 'short', year: 'numeric' });

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthName,
        amount: 0,
        income: 0,
        expenses: 0
      };
    }

    if (transaction.type === 'income') {
      monthlyData[monthKey].income += transaction.amount;
    } else {
      monthlyData[monthKey].expenses += transaction.amount;
    }
  });

  // Calculate net amount (income - expenses)
  Object.values(monthlyData).forEach(data => {
    data.amount = data.income - data.expenses;
  });

  return Object.values(monthlyData).sort((a, b) => {
    const aDate = new Date(a.month);
    const bDate = new Date(b.month);
    return aDate.getTime() - bDate.getTime();
  });
}

export function getTotalBalance(transactions: Transaction[]): number {
  return transactions.reduce((total, transaction) => {
    return transaction.type === 'income' 
      ? total + transaction.amount 
      : total - transaction.amount;
  }, 0);
}

export function getCategoryBreakdown(transactions: Transaction[]): Array<{
  category: string;
  amount: number;
  count: number;
  percentage: number;
}> {
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
  
  if (totalExpenses === 0) return [];
  
  const categoryMap: Record<string, { amount: number; count: number }> = {};
  
  expenseTransactions.forEach(transaction => {
    if (!categoryMap[transaction.category]) {
      categoryMap[transaction.category] = { amount: 0, count: 0 };
    }
    categoryMap[transaction.category].amount += transaction.amount;
    categoryMap[transaction.category].count += 1;
  });
  
  return Object.entries(categoryMap)
    .map(([category, data]) => ({
      category,
      amount: data.amount,
      count: data.count,
      percentage: (data.amount / totalExpenses) * 100
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function getRecentTransactions(transactions: Transaction[], limit: number = 5): Transaction[] {
  return transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}