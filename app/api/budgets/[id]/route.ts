import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Budget from '@/lib/models/Budget';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { userId, category, amount } = body;
    const { id } = await params;

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

    const budget = await Budget.findOneAndUpdate(
      { _id: id, userId },
      {
        category: category.trim(),
        amount: parseFloat(amount)
      },
      { new: true, runValidators: true }
    );

    if (!budget) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }

    return NextResponse.json(budget);
  } catch (error) {
    console.error('Error updating budget:', error);
    return NextResponse.json({ error: 'Failed to update budget' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const { id } = await params;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const budget = await Budget.findOneAndDelete({ _id: id, userId });

    if (!budget) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    console.error('Error deleting budget:', error);
    return NextResponse.json({ error: 'Failed to delete budget' }, { status: 500 });
  }
}