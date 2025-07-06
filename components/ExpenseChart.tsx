'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getMonthlyExpenses } from '@/lib/utils';
import { Transaction } from '@/types/transaction';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';

interface ExpenseChartProps {
  transactions: Transaction[];
}

export function ExpenseChart({ transactions }: ExpenseChartProps) {
  const monthlyData = getMonthlyExpenses(transactions);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-4">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <p key={index} className="text-sm flex items-center gap-2" style={{ color: entry.color }}>
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
                {entry.name}: ${entry.value.toFixed(2)}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const totalIncome = monthlyData.reduce((sum, data) => sum + data.income, 0);
  const totalExpenses = monthlyData.reduce((sum, data) => sum + data.expenses, 0);
  const netAmount = totalIncome - totalExpenses;

  if (monthlyData.length === 0) {
    return (
      <Card className="w-full border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Monthly Financial Overview
          </CardTitle>
          <CardDescription>
            Track your income and expenses over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No data to display</h3>
            <p className="text-gray-600">Add some transactions to see your financial analytics</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Monthly Financial Overview
        </CardTitle>
        <CardDescription>
          Track your income and expenses over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
            <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">Total Income</span>
            </div>
            <div className="text-3xl font-bold text-green-800">
              ${totalIncome.toFixed(2)}
            </div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
            <div className="flex items-center justify-center gap-2 text-red-700 mb-2">
              <TrendingDown className="w-5 h-5" />
              <span className="font-semibold">Total Expenses</span>
            </div>
            <div className="text-3xl font-bold text-red-800">
              ${totalExpenses.toFixed(2)}
            </div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <div className="flex items-center justify-center gap-2 text-blue-700 mb-2">
              <DollarSign className="w-5 h-5" />
              <span className="font-semibold">Net Amount</span>
            </div>
            <div className={`text-3xl font-bold ${netAmount >= 0 ? 'text-green-800' : 'text-red-800'}`}>
              ${netAmount.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="h-96 bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={{ stroke: '#9CA3AF' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={{ stroke: '#9CA3AF' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="income" 
                fill="#10B981" 
                name="Income"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="expenses" 
                fill="#EF4444" 
                name="Expenses"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}