import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/SignupForm.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './nav';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    uuid: uuidv4(),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [emailVerificationSuccess, setEmailVerificationSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'confirmPassword') {
      setPasswordsMatch(formData.password === value);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePassword = (password) => {
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
    return strongRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setPasswordError('Password must contain at least 8 characters, including uppercase, lowercase, and numbers.');
      return;
    }

    try {
      const signupResponse = await axios.post('http://localhost:5000/api/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        uuid: formData.uuid,
      });

      if (signupResponse.status === 201) {
        console.log('User registered successfully');

        const emailVerificationResponse = await axios.post('http://localhost:5000/api/sendVerificationEmail', {
          email: formData.email,
          uuid: formData.uuid,
        });

        if (emailVerificationResponse.status === 200) {
          console.log('Email verification sent successfully');
          setEmailVerificationSuccess(true);
           // Show popup message
          navigate('/signin');
        } else {
          console.error('Email verification failed');
        }
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        setShowPopup(true);
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
        console.error('Response Headers:', error.response.headers);
      }
    }
  };

  return (
    <div>
    <div className="signup-form-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Signup</h2>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={toggleShowPassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <div className="password-input">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={toggleShowConfirmPassword}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {!passwordsMatch && (
            <p className="error-message">Passwords do not match</p>
          )}
        </div>
        <button type="submit">Sign Up</button>

        {showPopup && ( // Render the popup message if showPopup is true
          <div className="popup">
            <p>Verification email sent. Please check your email to complete the signup process.</p>
          </div>
        )}

        <div className="already-have-account">
          <p>Already have an account? <Link to="/signin">Sign in</Link></p>
        </div>
      </form>
    </div></div>
  );
};

export default SignupForm;
