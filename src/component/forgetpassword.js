import { FaArrowLeft } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import './css/forgetpassword.css';
import FourDigitInput from './fourdigit'; // Update the import path if needed
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './nav';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    enteredCode: '',
  });

  const [fourDigitCode, setFourDigitCode] = useState('');
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (verified) {
      timer = setTimeout(() => {
        setVerified(false);
        setFourDigitCode('');
        console.log('OTP expired.');
      }, 50000); // 50 seconds in milliseconds
    }

    return () => clearTimeout(timer);
  }, [verified]);

  const sendVerificationCode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/send-otp', {
        email: formData.email,
      });
  
      if (response.status === 200) {
        const receivedCode = response.data.otp; // Store the received code in a variable
        console.log(receivedCode);
        setFourDigitCode(receivedCode); // Update the fourDigitCode state with the received code
        setVerified(true);
        console.log('Verification code sent successfully:', receivedCode); // Log the received code
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Verification check:', verified);
    console.log('Entered code:', formData.enteredCode);
    console.log('Stored code:', fourDigitCode);
  
    try {
      if (!verified || fourDigitCode.toString() !== formData.enteredCode.toString()) {
        throw new Error('Incorrect verification code or OTP expired.');
      }
  
      navigate('/newpassword');
    } catch (error) {
      console.error(error.message);
      setFormData({ ...formData, enteredCode: '' }); // Clear input for retry
    }
  };
  
  const back = () => {
    navigate('/signin');
  };

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handleEnteredCodeChange = (code) => {
    setFormData({ ...formData, enteredCode: code });
  };

  return (
    <div><Navbar/>
    <form className="forgot-password-container" onSubmit={handleSubmit}>
      <div className='back' onClick={back} > <FaArrowLeft /> </div>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleEmailChange}
      />
      <button onClick={sendVerificationCode}>Send Code</button>

      <FourDigitInput code={formData.enteredCode} setCode={handleEnteredCodeChange} />
      <button type="submit">Verify Code</button>
    </form>
    </div>
  );
};

export default ForgotPassword;
