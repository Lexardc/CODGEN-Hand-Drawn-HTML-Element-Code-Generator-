// models/File.js

const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  mimetype: String,
  size: Number,
  uploadDate: {
    type: Date,
    default: Date.now
  },
  userUUID: String, // Field to store user UUID
  chatUUID: String // Field to store chat UUID
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
