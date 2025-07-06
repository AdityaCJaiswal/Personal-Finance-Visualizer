import { useState } from 'react';
import { Transaction } from '@/types/transaction';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';
import { ExpenseChart } from './ExpenseChart';
import { CategoryChart } from './CategoryChart';
import { Navbar } from './Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTransactions } from '@/hooks/useTransactions';
import { formatCurrency, getTotalBalance, getCategoryBreakdown, getRecentTransactions } from '@/lib/utils';
import { Plus, Wallet, TrendingUp, TrendingDown, PieChart, ArrowUpRight, ArrowDownRight, Target, Calendar } from 'lucide-react';

export function Dashboard() {
  const { transactions, loading, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [activeView, setActiveView] = useState<'dashboard' | 'analytics'>('dashboard');

  const totalBalance = getTotalBalance(transactions);
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const categoryBreakdown = getCategoryBreakdown(transactions);
  const recentTransactions = getRecentTransactions(transactions, 5);
  const topExpenseCategory = categoryBreakdown.length > 0 ? categoryBreakdown[0] : null;

  const handleAddTransaction = async (data: any) => {
    await addTransaction(data);
    setShowForm(false);
  };

  const handleUpdateTransaction = async (data: any) => {
    if (editingTransaction) {
      await updateTransaction(editingTransaction._id, data);
      setEditingTransaction(null);
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDeleteTransaction = async (id: string) => {
    await deleteTransaction(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Navbar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {activeView === 'dashboard' ? 'Financial Dashboard' : 'Financial Analytics'}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {activeView === 'dashboard' ? ' Overview' : ' Insights'}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {activeView === 'dashboard' 
              ? 'Track your income and expenses with beautiful visualizations and insights'
              : 'Analyze your spending patterns and financial trends'
            }
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-7xl mx-auto">
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Total Balance</CardTitle>
              <Wallet className="h-5 w-5 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">
                {formatCurrency(totalBalance)}
              </div>
              <p className="text-xs text-blue-200 flex items-center">
                {totalBalance >= 0 ? (
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-1" />
                )}
                Current financial position
              </p>
            </CardContent>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Total Income</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">
                {formatCurrency(totalIncome)}
              </div>
              <p className="text-xs text-green-200 flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                All time earnings
              </p>
            </CardContent>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-100">Total Expenses</CardTitle>
              <TrendingDown className="h-5 w-5 text-red-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">
                {formatCurrency(totalExpenses)}
              </div>
              <p className="text-xs text-red-200 flex items-center">
                <ArrowDownRight className="w-3 h-3 mr-1" />
                All time spending
              </p>
            </CardContent>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Top Category</CardTitle>
              <Target className="h-5 w-5 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold mb-1">
                {topExpenseCategory?.category || 'No data'}
              </div>
              <p className="text-xs text-purple-200 flex items-center">
                <ArrowDownRight className="w-3 h-3 mr-1" />
                {topExpenseCategory ? formatCurrency(topExpenseCategory.amount) : 'Add transactions'}
              </p>
            </CardContent>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          </Card>
        </div>

        {/* Main Content */}
        {activeView === 'dashboard' ? (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 max-w-screen-xl mx-auto px-4">

            {/* Left Column - Transactions */}
            <div className="xl:col-span-8">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900">Transaction Management</CardTitle>
                      <p className="text-gray-600 mt-1">Manage your financial transactions</p>
                    </div>
                    <Button 
                      onClick={() => setShowForm(true)} 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Transaction
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <TransactionList
                    transactions={transactions}
                    onEdit={handleEditTransaction}
                    onDelete={handleDeleteTransaction}
                    loading={loading}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Quick Add Form */}
            <div className="xl:col-span-4">
              <div className="sticky top-24 space-y-6">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="border-b border-gray-100">
                    <CardTitle className="text-lg font-semibold text-gray-900">Quick Add</CardTitle>
                    <p className="text-sm text-gray-600">Add a new transaction quickly</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <TransactionForm
                      onSubmit={handleAddTransaction}
                      compact={true}
                    />
                  </CardContent>
                </Card>

                {/* Recent Transactions */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="border-b border-gray-100">
                    <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {recentTransactions.map((transaction) => (
                        <div key={transaction._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-sm text-gray-900 truncate">{transaction.description}</p>
                            <p className="text-xs text-gray-500">{transaction.category}</p>
                          </div>
                          <div className={`text-sm font-semibold ${
                            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </div>
                        </div>
                      ))}
                      {recentTransactions.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">No recent transactions</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          /* Analytics View */
          <div className="space-y-8 max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ExpenseChart transactions={transactions} />
              <CategoryChart transactions={transactions} />
            </div>
            
            {/* Category Breakdown */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm max-w-[1600px] mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Category Breakdown</CardTitle>
                <p className="text-gray-600">Detailed analysis of your spending by category</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryBreakdown.map((category, index) => (
                    <div key={category.category} className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{category.category}</h3>
                        <span className="text-sm text-gray-500">#{index + 1}</span>
                      </div>
                      <div className="text-2xl font-bold text-red-600 mb-1">
                        {formatCurrency(category.amount)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {category.count} transaction{category.count !== 1 ? 's' : ''}
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full"
                          style={{ width: `${(category.amount / totalExpenses) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  {categoryBreakdown.length === 0 && (
                    <div className="col-span-full text-center py-12">
                      <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No expense categories to display</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add Transaction Dialog */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-2xl border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">Add New Transaction</DialogTitle>
            </DialogHeader>
            <TransactionForm
              onSubmit={handleAddTransaction}
              onCancel={() => setShowForm(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Transaction Dialog */}
        <Dialog open={!!editingTransaction} onOpenChange={() => setEditingTransaction(null)}>
          <DialogContent className="max-w-2xl border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">Edit Transaction</DialogTitle>
            </DialogHeader>
            {editingTransaction && (
              <TransactionForm
                onSubmit={handleUpdateTransaction}
                onCancel={() => setEditingTransaction(null)}
                initialData={editingTransaction}
                isEditing={true}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}