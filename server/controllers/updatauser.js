const express = require('express');
const User = require('../model/User');

async function updateUser(req, res) {
  try {
    const { userId } = req.params;
    const { newName, newEmail } = req.body;

    // Check if the user exists
    const existingUser = await User.findOne({ uuid: userId });

    if (!existingUser) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user data if new name or new email is provided
    if (newName) {
      existingUser.name = newName;
    }
    if (newEmail) {
      existingUser.email = newEmail;
    }

    // Save changes to the database
    const updatedUser = await existingUser.save();

    console.log('User updated successfully:', updatedUser);
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = updateUser;
