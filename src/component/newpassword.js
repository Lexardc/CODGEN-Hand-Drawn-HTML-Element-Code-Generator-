import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './css/NewPasswordForm.css'; // Your CSS file for styling
import { useNavigate } from 'react-router-dom';
import Navbar from './nav';
const NewPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordUpdated, setPasswordUpdated] = useState(false); // State to track password update
  const [updateError, setUpdateError] = useState(false); // State to track update error
const navigate=useNavigate();
const back = () => {
  navigate('/forgot-password');
};
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/resetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword }),
      });
  
      const data = await response.json(); // Parse response body as JSON
  
      if (response.status === 200) {
        // Password update success
        setPasswordUpdated(true);
        setUpdateError(false);
        console.log(data.message); // Log the response message
        navigate('/signin')

      } else {
        // Password update failed
        setPasswordUpdated(false);
        setUpdateError(true);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      // Error during fetch or network issue
      setPasswordUpdated(false);
      setUpdateError(true);
    }
  };
  
  return (
    <div>
     
    <div className="password-form-container">
      
      <h2> <div className='back1' onClick={back} > <FaArrowLeft /> </div>
        Create New Password</h2>
      <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="email">Please enter login Email</label>
    <input
      type="email"
      id="email"
      value={email}
      onChange={handleEmailChange}
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="password">Password:</label>
    <input
      type="password"
      id="password"
      value={password}
      onChange={handlePasswordChange}
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="confirm-password">Confirm Password:</label>
    <input
      type="password"
      id="confirm-password"
      value={confirmPassword}
      onChange={handleConfirmPasswordChange}
      required
    />
  </div>
  <button type="submit">Submit</button>
</form>

      {passwordUpdated && !updateError && (
        <p>Password has been updated successfully!</p>
      )}
      {updateError && (
        <p>Failed to update password. Please try again.</p>
      )}
    </div></div>
  );
};

export default NewPasswordForm;
