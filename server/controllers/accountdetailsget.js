const express = require('express');
const User = require('../model/User');

async function getData(req, res) {
  try {
    const userId = req.params.userId;
    console.log('Received UUID:', userId);

    // Find a user by their UUID field
    const user = await User.findOne({ uuid: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send the user data as a JSON response
    res.status(200).json({ name: user.name, email: user.email });
    console.log(user.name);
    console.log(user.email);
  } catch (error) {
    // Handle any internal server errors
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = getData;
