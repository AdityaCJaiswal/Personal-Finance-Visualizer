import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Budget from '@/lib/models/Budget';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const budgets = await Budget.find({ userId }).sort({ createdAt: -1 });
    
    return NextResponse.json(budgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return NextResponse.json({ error: 'Failed to fetch budgets' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { userId, category, amount } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Validation
    if (!category || category.trim().length === 0) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }
    
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Amount must be a positive number' }, { status: 400 });
    }

    const budget = new Budget({
      userId,
      category: category.trim(),
      amount: parseFloat(amount)
    });

    const savedBudget = await budget.save();
    return NextResponse.json(savedBudget, { status: 201 });
  } catch (error) {
    console.error('Error creating budget:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Budget for this category already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create budget' }, { status: 500 });
  }
}