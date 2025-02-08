// controllers/chatController.js

const Chat = require('../model/chat');

// Controller to handle POST request for creating a new chat
exports.createChat = async (req, res) => {
    try {
        const { chatName, chatId, userId } = req.body;

        // Check if required fields are missing
        if (!chatName || !chatId || !userId) {
            return res.status(400).json({ error: 'Chat name, chat ID, and user ID are required.' });
        }

        const newChat = new Chat({ chatName, chatId, userId });
        const savedChat = await newChat.save();
        res.json(savedChat);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Controller to handle GET request for fetching chat response
exports.getChatResponse = async (req, res) => {
    const userId = req.query.userId; // Ensure query parameter is userId (case-sensitive)
    console.log("chats found with id ",userId);
    // Check if userId is provided
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required.' });
    }

    console.log("chats found with id ",userId);
    
    try {
        const chats = await Chat.find({ userId: userId });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
