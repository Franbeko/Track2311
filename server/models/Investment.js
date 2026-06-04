const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
    enum: ['Starter', 'Growth', 'Premium', 'Elite']
  },
  amount: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  roi: {
    type: Number,
    required: true
  },
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  returns: {
    type: Number,
    default: 0
  }
});

// Calculate end date and returns before saving
investmentSchema.pre('save', function(next) {
  if (!this.endDate) {
    this.endDate = new Date(this.startDate);
    this.endDate.setDate(this.endDate.getDate() + this.duration);
    this.returns = this.amount + (this.amount * this.roi / 100);
  }
  next();
});

module.exports = mongoose.model('Investment', investmentSchema);