'use client';

import { useState, useEffect } from 'react';
import { Budget, BudgetFormData } from '@/types/transaction';
import { apiClient } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export function useBudgets() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadBudgets = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiClient.getBudgets();
        setBudgets(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load budgets';
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

    loadBudgets();
  }, []);

  const addBudget = async (formData: BudgetFormData): Promise<void> => {
    try {
      const newBudget = await apiClient.createBudget(formData);
      setBudgets(prev => [newBudget, ...prev]);
      
      toast({
        title: 'Success',
        description: 'Budget added successfully',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add budget';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const updateBudget = async (id: string, formData: BudgetFormData): Promise<void> => {
    try {
      const updatedBudget = await apiClient.updateBudget(id, formData);
      setBudgets(prev => prev.map(b => b._id === id ? updatedBudget : b));
      
      toast({
        title: 'Success',
        description: 'Budget updated successfully',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update budget';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const deleteBudget = async (id: string): Promise<void> => {
    try {
      await apiClient.deleteBudget(id);
      setBudgets(prev => prev.filter(b => b._id !== id));
      
      toast({
        title: 'Success',
        description: 'Budget deleted successfully',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete budget';
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
    budgets,
    loading,
    error,
    addBudget,
    updateBudget,
    deleteBudget
  };
}