import { Transaction, TransactionFormData, Budget, BudgetFormData } from '@/types/transaction';

// Get or create anonymous user ID
export function getAnonymousUserId(): string {
  if (typeof window === 'undefined') return '';
  
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('userId', userId);
  }
  return userId;
}

// API client with error handling
class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = '/api';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Transaction methods
  async getTransactions(): Promise<Transaction[]> {
    const userId = getAnonymousUserId();
    return this.request<Transaction[]>(`/transactions?userId=${userId}`);
  }

  async createTransaction(data: TransactionFormData): Promise<Transaction> {
    const userId = getAnonymousUserId();
    return this.request<Transaction>('/transactions', {
      method: 'POST',
      body: JSON.stringify({ ...data, userId }),
    });
  }

  async updateTransaction(id: string, data: TransactionFormData): Promise<Transaction> {
    const userId = getAnonymousUserId();
    return this.request<Transaction>(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...data, userId }),
    });
  }

  async deleteTransaction(id: string): Promise<void> {
    const userId = getAnonymousUserId();
    return this.request<void>(`/transactions/${id}?userId=${userId}`, {
      method: 'DELETE',
    });
  }

  // Budget methods
  async getBudgets(): Promise<Budget[]> {
    const userId = getAnonymousUserId();
    return this.request<Budget[]>(`/budgets?userId=${userId}`);
  }

  async createBudget(data: BudgetFormData): Promise<Budget> {
    const userId = getAnonymousUserId();
    return this.request<Budget>('/budgets', {
      method: 'POST',
      body: JSON.stringify({ ...data, userId }),
    });
  }

  async updateBudget(id: string, data: BudgetFormData): Promise<Budget> {
    const userId = getAnonymousUserId();
    return this.request<Budget>(`/budgets/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...data, userId }),
    });
  }

  async deleteBudget(id: string): Promise<void> {
    const userId = getAnonymousUserId();
    return this.request<void>(`/budgets/${id}?userId=${userId}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();