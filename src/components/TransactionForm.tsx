import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Transaction, TransactionFormData } from '@/types/transaction';
import { categories } from '@/lib/mockData';
import { AlertCircle, Plus, Edit, DollarSign, Calendar, FileText, Tag } from 'lucide-react';

const transactionSchema = z.object({
  amount: z.string().min(1, 'Amount is required').refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    'Amount must be a positive number'
  ),
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(1, 'Description is required').max(100, 'Description is too long'),
  type: z.enum(['income', 'expense'], { required_error: 'Type is required' }),
  category: z.string().min(1, 'Category is required')
});

interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => Promise<void>;
  onCancel?: () => void;
  initialData?: Transaction;
  isEditing?: boolean;
  compact?: boolean;
}

export function TransactionForm({ onSubmit, onCancel, initialData, isEditing = false, compact = false }: TransactionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData ? {
      amount: initialData.amount.toString(),
      date: initialData.date,
      description: initialData.description,
      type: initialData.type,
      category: initialData.category
    } : {
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      type: 'expense',
      category: ''
    }
  });

  const watchedType = form.watch('type');

  const handleSubmit = async (data: TransactionFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      await onSubmit(data);
      if (!isEditing) {
        form.reset();
      }
    } catch (error) {
      setSubmitError('Failed to save transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (compact) {
    return (
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 w-full">
        {submitError && (
          <Alert variant="destructive" className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-800">{submitError}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...form.register('amount')}
              className={`w-full ${form.formState.errors.amount ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'} transition-colors`}
            />
            {form.formState.errors.amount && (
              <p className="text-xs text-red-600">{form.formState.errors.amount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date
            </Label>
            <Input
              id="date"
              type="date"
              {...form.register('date')}
              className={`w-full ${form.formState.errors.date ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'} transition-colors`}
            />
            {form.formState.errors.date && (
              <p className="text-xs text-red-600">{form.formState.errors.date.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Description
            </Label>
            <Input
              id="description"
              placeholder="Enter description"
              {...form.register('description')}
              className={`w-full ${form.formState.errors.description ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'} transition-colors`}
            />
            {form.formState.errors.description && (
              <p className="text-xs text-red-600">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Type</Label>
            <Select 
              value={form.watch('type')} 
              onValueChange={(value) => form.setValue('type', value as 'income' | 'expense')}
            >
              <SelectTrigger className={`w-full ${form.formState.errors.type ? 'border-red-300' : 'border-gray-200'} transition-colors`}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">💰 Income</SelectItem>
                <SelectItem value="expense">💸 Expense</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.type && (
              <p className="text-xs text-red-600">{form.formState.errors.type.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Category
            </Label>
            <Select 
              value={form.watch('category')} 
              onValueChange={(value) => form.setValue('category', value)}
            >
              <SelectTrigger className={`w-full ${form.formState.errors.category ? 'border-red-300' : 'border-gray-200'} transition-colors`}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories[watchedType]?.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.category && (
              <p className="text-xs text-red-600">{form.formState.errors.category.message}</p>
            )}
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isSubmitting ? 'Adding...' : 'Add Transaction'}
        </Button>
      </form>
    );
  }

  return (
    <Card className="w-full max-w-2xl border-0 shadow-none">
      <CardContent className="p-6">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {submitError && (
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-800">{submitError}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...form.register('amount')}
                className={`h-12 ${form.formState.errors.amount ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'} transition-colors`}
              />
              {form.formState.errors.amount && (
                <p className="text-sm text-red-600">{form.formState.errors.amount.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                {...form.register('date')}
                className={`h-12 ${form.formState.errors.date ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'} transition-colors`}
              />
              {form.formState.errors.date && (
                <p className="text-sm text-red-600">{form.formState.errors.date.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Description
            </Label>
            <Input
              id="description"
              placeholder="Enter transaction description"
              {...form.register('description')}
              className={`h-12 ${form.formState.errors.description ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'} transition-colors`}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-600">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Type</Label>
              <Select 
                value={form.watch('type')} 
                onValueChange={(value) => form.setValue('type', value as 'income' | 'expense')}
              >
                <SelectTrigger className={`h-12 ${form.formState.errors.type ? 'border-red-300' : 'border-gray-200'} transition-colors`}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">💰 Income</SelectItem>
                  <SelectItem value="expense">💸 Expense</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.type && (
                <p className="text-sm text-red-600">{form.formState.errors.type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Category
              </Label>
              <Select 
                value={form.watch('category')} 
                onValueChange={(value) => form.setValue('category', value)}
              >
                <SelectTrigger className={`h-12 ${form.formState.errors.category ? 'border-red-300' : 'border-gray-200'} transition-colors`}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories[watchedType]?.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.category && (
                <p className="text-sm text-red-600">{form.formState.errors.category.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isSubmitting ? 'Saving...' : (isEditing ? 'Update Transaction' : 'Add Transaction')}
            </Button>
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="flex-1 h-12 border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}