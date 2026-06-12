const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  count: { type: Number, default: 0 }
});

// Ensure one entry per user per day
ActivitySchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Activity', ActivitySchema);
