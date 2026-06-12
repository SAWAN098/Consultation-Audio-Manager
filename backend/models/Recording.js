const mongoose = require('mongoose');

const recordingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  clientName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  notes: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'Reviewed', 'Completed'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Recording', recordingSchema);
