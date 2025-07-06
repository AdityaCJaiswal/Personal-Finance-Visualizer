import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

// Ensure one budget per category per user
budgetSchema.index({ userId: 1, category: 1 }, { unique: true });

export default mongoose.models.Budget || mongoose.model('Budget', budgetSchema);