const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  location: {
    type: String
  },
  education: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String,
    required: true
  },
  linkedin: {
    type: String
  },
  portfolio: {
    type: String
  },
  jobTitle: {
    type: String,
    required: true
  },
  jobLocation: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'rejected', 'accepted'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', applicationSchema);