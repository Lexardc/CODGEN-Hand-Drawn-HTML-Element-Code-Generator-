const mongoose = require('mongoose');

const uploadResponseSchema = new mongoose.Schema({
  Code: String,
  
  userUUID: String,
  chatUUID: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UploadResponse', uploadResponseSchema);
