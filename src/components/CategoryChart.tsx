import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { getCategoryBreakdown } from '@/lib/utils';
import { Transaction } from '@/types/transaction';
import { PieChart as PieChartIcon, Target } from 'lucide-react';

interface CategoryChartProps {
  transactions: Transaction[];
}

const COLORS = [
  '#3B82F6', // Blue
  '#EF4444', // Red
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#84CC16', // Lime
  '#F97316', // Orange
  '#6366F1', // Indigo
];

export function CategoryChart({ transactions }: CategoryChartProps) {
  const categoryData = getCategoryBreakdown(transactions);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-4">
          <p className="font-semibold text-gray-900 mb-2">{data.category}</p>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              Amount: <span className="font-semibold">${data.amount.toFixed(2)}</span>
            </p>
            <p className="text-sm text-gray-600">
              Transactions: <span className="font-semibold">{data.count}</span>
            </p>
            <p className="text-sm text-gray-600">
              Percentage: <span className="font-semibold">{data.percentage.toFixed(1)}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null; // Don't show labels for slices smaller than 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (categoryData.length === 0) {
    return (
      <Card className="w-full border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="w-5 h-5" />
            Category Breakdown
          </CardTitle>
          <CardDescription>
            Visualize your spending by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No expense data</h3>
            <p className="text-gray-600">Add some expense transactions to see category breakdown</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="w-5 h-5" />
          Category Breakdown
        </CardTitle>
        <CardDescription>
          Visualize your spending by category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96 bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={CustomLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="amount"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry) => (
                  <span style={{ color: entry.color, fontWeight: 'semibold' }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category Summary */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categoryData.slice(0, 4).map((category, index) => (
            <div key={category.category} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">{category.category}</p>
                <p className="text-xs text-gray-600">{category.count} transactions</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 text-sm">${category.amount.toFixed(2)}</p>
                <p className="text-xs text-gray-600">{category.percentage.toFixed(1)}%</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}