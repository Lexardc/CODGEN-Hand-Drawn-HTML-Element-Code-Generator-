// controllers/fileController.js

// Import the File model
const File = require('../model/file');

// Multer configuration for storing files
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Rename file to prevent duplicates
  }
});

const upload = multer({ storage: storage }).single('file');

// Controller function for handling file uploads
const uploadFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(400).json({ error: 'Error uploading file' });
    }
    // If file is successfully uploaded, req.file contains file details
    if (req.file) {
      // Log file details
      console.log('File received:', req.file);
      
      // Extract user UUID and chat UUID from the request body
      const { userUUID, chatUUID } = req.body;

      // Save file details along with user UUID and chat UUID to MongoDB
      try {
        const newFile = new File({
          filename: req.file.filename,
          mimetype: req.file.mimetype,
          size: req.file.size,
          userUUID,
          chatUUID
        });
        await newFile.save();
        console.log('File details saved to MongoDB:', newFile);

        // Send the image URL in the response
        res.status(200).json({ message: 'File uploaded successfully', imageUrl: `/uploads/${req.file.filename}`, userUUID,
        chatUUID });
      } catch (error) {
        console.error('Error saving file details to MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      res.status(400).json({ error: 'No file uploaded' });
    }
  });
};


module.exports = {
  uploadFile,
  
};
