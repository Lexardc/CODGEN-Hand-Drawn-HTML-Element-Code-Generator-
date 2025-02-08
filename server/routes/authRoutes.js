// Import required modules
const express = require('express');
const router = express.Router();

const imageController = require('../controllers/imageController');
const chatController = require('../controllers/chatRoutes');
// Import controllers
const {
  signup,
  login,
  sendOTP
} = require('../controllers/authController');
const resetpassword = require('../controllers/resetpassword');
const getData = require('../controllers/accountdetailsget');
const updateUser = require('../controllers/updatauser');
const sendMessage = require('../controllers/message');
const {
  sendVerificationEmail,
  verifyEmail
} = require('../controllers/emailVerificationController');

// Configure Multer for file uploads

const fileController = require('../controllers/fileController');
const userController = require('../controllers/usercontroller');
const uploadResponseController = require('../controllers/uploadres');



// Authentication Routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/send-otp', sendOTP);
router.post('/resetpassword', resetpassword);

// Email Verification Routes
router.post('/send-verification-email', sendVerificationEmail);
router.get('/verify-email/:token', verifyEmail);

// File Upload and Message Sending Route
router.post('/upload', fileController.uploadFile);

// User Data Routes
router.get('/getdata/:userId', getData);
router.put('/updateuser/:userId', updateUser);





// Define route for fetching image
router.get('/:userId/:chatUUID', imageController.getImage);


router.post('/chat', chatController.createChat);

// GET endpoint to fetch chat response
router.get('/chat-response', chatController.getChatResponse);
router.post('/save-upload-response', uploadResponseController.saveUploadResponse);
// Define your API routes
router.post('/fetchUserId', userController.fetchUserId);

const {saveImageToMongoDB} = require('../model/image'); // Import the function to save image to MongoDB

// POST route to handle saving an image
router.post('/saveimage', async (req, res) => {
  try {
    const { base64ImageString } = req.body; // Assuming the base64 image string is sent in the request body
console.log(base64ImageString);
    // Call the function to save the image to MongoDB
    const savedImage = await saveImageToMongoDB(base64ImageString);

    // Respond with a success message or the saved image document
    res.status(200).json({ message: 'Image saved successfully', savedImage });
  } catch (error) {
    console.error('Error saving image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Export the router
module.exports = router;
