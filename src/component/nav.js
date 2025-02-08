import React, { useState, useEffect } from 'react';
import './css/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import logo from "./imageforweb/logo.jpg";

const Navbar = ({ toggleSidebar, sidebarVisible }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme') || 'light';
    setIsDarkMode(savedMode === 'dark');
    document.documentElement.setAttribute('data-theme', savedMode);
  }, []);

  const toggleMode = () => {
    const newMode = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', newMode);
    localStorage.setItem('theme', newMode);
  };

  const toggleIconClass = sidebarVisible ? 'active' : '';

  return (
    <nav className="navbar">
    ℂ𝕆𝔻𝔾𝔼ℕ 


     
      <button className="theme-toggle" onClick={toggleMode}>
        {isDarkMode ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
      </button>
    </nav>
  );
};

export default Navbar;
