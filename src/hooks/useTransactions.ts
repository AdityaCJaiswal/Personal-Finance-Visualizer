import { useState, useEffect } from 'react';
import { Transaction, TransactionFormData } from '@/types/transaction';
import { apiClient } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiClient.getTransactions();
        setTransactions(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load transactions';
        setError(errorMessage);
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const addTransaction = async (formData: TransactionFormData): Promise<void> => {
    try {
      const newTransaction = await apiClient.createTransaction(formData);
      setTransactions(prev => [newTransaction, ...prev]);
      
      toast({
        title: 'Success',
        description: 'Transaction added successfully',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add transaction';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const updateTransaction = async (id: string, formData: TransactionFormData): Promise<void> => {
    try {
      const updatedTransaction = await apiClient.updateTransaction(id, formData);
      setTransactions(prev => prev.map(t => t._id === id ? updatedTransaction : t));
      
      toast({
        title: 'Success',
        description: 'Transaction updated successfully',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update transaction';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const deleteTransaction = async (id: string): Promise<void> => {
    try {
      await apiClient.deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t._id !== id));
      
      toast({
        title: 'Success',
        description: 'Transaction deleted successfully',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete transaction';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  return {
    transactions,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction
  };
}