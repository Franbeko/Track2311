const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  timestamp: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);