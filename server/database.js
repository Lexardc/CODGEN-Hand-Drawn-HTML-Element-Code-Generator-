const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/fyp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Importing Mongoose model for ImageDetails
const ImageDetails = require("./model/ImageDetails");

// Routes
app.use('/api', authRoutes);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../src/images/"); // Adjust destination folder as per your setup
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

// POST endpoint for uploading image
app.post("/upload-image", upload.single("image"), async (req, res) => {
  // Logging uploaded file details
  console.log(req.file);
  
  // Construct image URL
  const imageName = req.file.filename;
  const { userUUID, chatUUID } = req.body;
  const imageUrl = `http://localhost:5000/uploads/${imageName}`;
console.log("image name",imageName);
console.log("image url",imageUrl);
console.log("user id",userUUID);
console.log("chat id ",chatUUID);
  try {
    // Create a new instance of ImageDetails model
    const imageDetails = new ImageDetails({ image: imageName, imageUrl: imageUrl, userUUID:userUUID,
      chatUUID:chatUUID });
    
    // Save image details to MongoDB
    await imageDetails.save();
    
    console.log("Image details saved:", imageDetails);
    res.json({ status: "ok" });
  } catch (error) {
    console.error("Error saving image details:", error);
    res.status(500).json({ error: "Failed to save image details" });
  }
});


// GET endpoint for retrieving all images
app.get("/get-image", async (req, res) => {
  try {
    const userId = req.query.userId; // Get user ID from query parameters
    const chatUUID = req.query.chatUUID; // Get chat UUID from query parameters

    // Check if userId and chatUUID are provided
    if (!userId || !chatUUID) {
      return res.status(400).json({ error: "userId and chatUUID are required" });
    }

    // Fetch image details based on user ID and chat UUID from MongoDB
    const filteredImages = await ImageDetails.find({ userUUID:userId, chatUUID });

    // Check if any images are found
    if (filteredImages.length === 0) {
      return res.status(404).json({ error: "No images found for the provided userId and chatUUID" });
    }

    res.json({ status: "ok", data: filteredImages });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});
app.get("/get-all-chats", async (req, res) => {
  try {
    const userId = req.query.userId; // Get user ID from query parameters
  
console.log("useer id in get image in 1",userId);
    // Check if userId and chatUUID are provided
    if (!userId ) {
      return res.status(400).json({ error: "userId and chatUUID are required" });
    }

    // Fetch image details based on user ID and chat UUID from MongoDB
    const filteredImages = await ImageDetails.find({ userUUID:userId });

    // Check if any images are found
    if (filteredImages.length === 0) {
      return res.status(404).json({ error: "No images found for the provided userId and chatUUID" });
    }

    res.json({ status: "ok", data: filteredImages });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});
console.log("MongoDB connection status:", mongoose.connection.readyState);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
