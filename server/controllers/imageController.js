const path = require('path');

// Function to fetch the image file
exports.getImage = (req, res) => {
  const { userId, chatUUID } = req.params;
  console.log('User ID:', userId);
  console.log('Chat UUID:', chatUUID);

  // Assuming the images are stored in the 'uploads' directory
  const imagePath = path.join(__dirname, '../uploads', userId, `${chatUUID}.png`);

  // Send the image file as a response
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error('Error sending image:', err);
      res.status(404).send('Image not found');
    }
  });
};
