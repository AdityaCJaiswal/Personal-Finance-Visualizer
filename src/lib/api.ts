import { Transaction, TransactionFormData } from '@/types/transaction';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get or create anonymous user ID
export function getAnonymousUserId(): string {
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

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const userId = getAnonymousUserId();

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

  async getTransactionStats(): Promise<{
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    transactionCount: number;
  }> {
    const userId = getAnonymousUserId();
    return this.request(`/transactions/stats?userId=${userId}`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);