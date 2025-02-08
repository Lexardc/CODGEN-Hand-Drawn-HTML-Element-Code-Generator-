const jwt = require('jsonwebtoken');
const User = require('../model/User');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'huzaifachaudhary497@gmail.com',
    pass: 'avgf aulf sgxy tcdm',
  },
});

const generateToken = (userId) => {
  // Generate a JWT token with the user's ID
  return jwt.sign({ userId }, 'HUS01', { expiresIn: '1h' });
};

const sendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Generate a verification token
  const verificationToken = generateToken(user._id);

  // Update user's token in the database
  user.verificationToken = verificationToken;
  await user.save();

  // Send verification email with a link
  const verificationLink = `http://localhost:5000/api/verify-email/${verificationToken}`;
  const mailOptions = {
    from: 'huzaifachaudhary497@gmail.com',
    to: email,
    subject: 'Verify Your Email',
    html: `
      <p>Please click the following button to verify your email:</p>
      <a href="${verificationLink}" style="padding: 10px 20px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
    `,
  };
  

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
    res.status(200).json({ message: 'Verification email sent successfully' });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ message: 'Failed to send verification email' });
  }
};

const verifyEmail = async (req, res) => {
  const token = req.params.token;

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, 'HUS01');

    // Update user's status to "verified" or set a flag in your user schema
    const user = await User.findByIdAndUpdate(decodedToken.userId, { isVerified: true }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.redirect('http://localhost:3000/signin'); // Redirect to your login page after successful verification
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { sendVerificationEmail, verifyEmail };
