const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const nodemailer = require('nodemailer');

const generateToken = (userId) => {
  // Generate a JWT token with the user's ID
  return jwt.sign({ userId }, 'HUS01', { expiresIn: '1h' });
};

const signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword, uuid } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, confirmpassword: hashedPassword, uuid });
    await newUser.save();

    // Generate a verification token
    const verificationToken = generateToken(newUser._id);

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


    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'User registered successfully. Verification email sent.' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Assuming the user object has a 'uuid' property
    const {name, uuid, ...userData } = user.toObject(); // Extracting user data excluding 'uuid'

    res.status(200).json({ message: 'Login successful', user: userData, uuid,name });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'huzaifachaudhary497@gmail.com',
    pass: 'avgf aulf sgxy tcdm',
  },
});

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000); // Generates a random four-digit number
}


async function sendOTP (req, res) 
 {
  const { email } = req.body;
  console.log('Received email:', email);
  console.log(email);
  const otp = generateOTP();

  const mailOptions = {
    from: 'huzaifachaudhary497@gmail.com',
    to: email,
    subject: 'Your OTP for Verification',
    text: `Your OTP is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
    res.status(200).json({ message: 'OTP sent successfully',otp });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};


module.exports = { signup, login ,sendOTP};
