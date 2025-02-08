
import { Link } from 'react-router-dom';
import './component/css/home.css';
import './component/css/bubble.css';
import React, { useEffect } from 'react';
import Navbar from './component/nav';

const Home = () => {
  useEffect(() => {
    const createBubble = () => {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      bubble.style.top = `${Math.random() * 95}vh`; // Random top position
      bubble.style.left = `${Math.random() * 95}vw`; // Random left position
      bubble.style.right = `${Math.random() * 95}vw`;
      document.body.appendChild(bubble);
      setTimeout(() => {
        document.body.removeChild(bubble);
      }, 4000);
    };

    const intervalId = setInterval(createBubble, 500); // Adjust the interval timing

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div><Navbar/>
    <div className="home-container">
      
      <div className="bubble"></div>
      <div className="left-section">
        <h1>Welcome to Code generator</h1>
        <div className="buttons">
          <Link to="/signin">
            <button>Sign In</button>
          </Link>
          <div className='space'></div>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
      {/* Animated bubble */}
      
    </div></div>
  );
};

export default Home;
