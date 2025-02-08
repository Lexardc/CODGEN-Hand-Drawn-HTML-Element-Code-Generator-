import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/SigninForm.css';
import Navbar from './nav';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AccountDetails from './accountdetails';
const SigninForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const{name,uuid,...userdata}  = await response.json();
        // Using email as the userId
        
  console.log(uuid);
        console.log('userdata before navigation:', uuid,userdata);
        console.log('namewijshyde',name);
        navigate('/main', { state: { uuid, userdata,name } });
      } else {
        // Handle failed login
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle other types of errors
    }
  };
  

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div>
    <div className="signin-form-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2>Sign In</h2>
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
              onClick={toggleShowPassword}
              className="password-toggle-btn"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <button type="submit">Sign In</button>
      </form>
      <div className="forgot-password-link">
        <p>
          <Link to="/forgot-password" onClick={handleForgotPassword}>
            Forgot Password
          </Link>
        </p>
      </div>
      <div className="create-account-link">
        <p>
          Don't have an account? <Link to="/signup">Create Account</Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default SigninForm;
