// authRouter.js

const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');


 // resetpassword.js (Backend)

 async function resetpassword(req, res) {
  const { email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Retrieve the user from the database based on the email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password with the hashed password
    user.password = hashedPassword;
    user.confirmpassword=hashedPassword;

    await user.save(); // Save the updated user data to the database

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = resetpassword;
