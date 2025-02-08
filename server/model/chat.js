// models/Chat.js

const mongoose = require('mongoose');

// Define a schema for chat
const chatSchema = new mongoose.Schema({
    chatName: {
        type: String,
        required: true
    },
    chatId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
  
});

// Create a model based on the schema
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
