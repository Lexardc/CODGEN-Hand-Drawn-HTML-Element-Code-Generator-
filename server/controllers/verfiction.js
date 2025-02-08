
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
  