import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01
  },
  date: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  type: {
    type: String,
    required: true,
    enum: ['income', 'expense']
  },
  category: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Index for efficient queries by userId and date
transactionSchema.index({ userId: 1, createdAt: -1 });
transactionSchema.index({ userId: 1, date: -1 });

export default mongoose.model('Transaction', transactionSchema);