const UploadResponse = require('../model/saveresponse');

exports.saveUploadResponse = async (req, res) => {
  try {
    const { Code, userUUID, chatUUID } = req.body;

    console.log("Received data from frontend:", { Code, userUUID, chatUUID });

    const newResponse = new UploadResponse({
      Code,
      userUUID,
      chatUUID
    });

    await newResponse.save();
    res.status(201).json({ message: 'Response saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the response' });
  }
};
