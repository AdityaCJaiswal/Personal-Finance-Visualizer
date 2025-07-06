import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Transaction from '@/lib/models/Transaction';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const stats = await Transaction.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    const result = {
      totalIncome: 0,
      totalExpenses: 0,
      transactionCount: 0
    };

    stats.forEach(stat => {
      if (stat._id === 'income') {
        result.totalIncome = stat.total;
      } else if (stat._id === 'expense') {
        result.totalExpenses = stat.total;
      }
      result.transactionCount += stat.count;
    });

    const balance = result.totalIncome - result.totalExpenses;

    return NextResponse.json({ ...result, balance });
  } catch (error) {
    console.error('Error fetching transaction stats:', error);
    return NextResponse.json({ error: 'Failed to fetch transaction statistics' }, { status: 500 });
  }
}