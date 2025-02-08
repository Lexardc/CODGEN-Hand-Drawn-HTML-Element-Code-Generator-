const fs = require('fs');
const path = require('path');

const sendMessage = (req, res) => {
  try {
    const uploadedImage = req.file;

    if (!uploadedImage) {
      return res.status(400).json({ error: 'No image file received.' });
    }

    // Log information about the received file
    console.log('Received Image:', uploadedImage.filename);
    console.log('Destination:', uploadedImage.destination);

    // Move the file to a different folder (e.g., 'uploads' folder)
    const newFilePath = path.join('uploads', uploadedImage.filename);
    fs.renameSync(uploadedImage.path, newFilePath);

    // Add your logic to handle the received image, such as saving the file path in a database
    // Example: saveImagePathInDatabase(newFilePath);

    // Return a response to the client
    return res.status(200).json({ message: 'Image received and saved successfully.' });
  } catch (error) {
    console.error('Error handling the image:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = sendMessage;
