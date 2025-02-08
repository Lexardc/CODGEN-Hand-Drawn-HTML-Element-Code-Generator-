const User = require('../model/User'); // Import the User model

const fetchUserId = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the entire request body
    const { userid } = req.body; // Destructure userid from the request body
    console.log('Received userId:', userid); // Log the received userId

    if (!userid) {
      return res.status(400).json({ error: 'Missing userid in request body' });
    }

    // Query the database for the user with the provided UUID
    const user = await User.findOne({ uuid: userid });
    if (user) {
      // Send back the userId if user is found
      res.json({ userId: user.uuid });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching userId:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { fetchUserId };
