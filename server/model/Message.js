// messageModel.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: String,
  image: {
    data: Buffer,
    contentType: String
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
