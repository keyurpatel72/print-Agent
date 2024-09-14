const mongoose = require('mongoose');

const printJobSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     required: true
    },
  documentUrl: { 
    type: String,
     required: true
    },
  status: {
     type: String,
      enum: ['pending', 'printing', 'completed', 'failed'], 
      default: 'pending'
     },
  createdAt: {
     type: Date,
      default: Date.now
     },
});

module.exports = mongoose.model('PrintJob', printJobSchema);