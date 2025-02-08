import React from 'react';
import './css/fourdigit.css'; // Update the CSS import path if needed

const FourDigitInput = ({ code = ['', '', '', ''], setCode }) => {
  const handleDigitChange = (e, digitPosition) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/\D/g, '').slice(0, 1);

    // Ensure code is always an array with 4 elements
    const updatedCode = [...code];
    updatedCode[digitPosition - 1] = sanitizedValue;

    setCode(updatedCode.join(''));

    // Focus next input after typing a digit
    if (value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  return (
    <div className='box'>
      <input
        type="text"
        maxLength="1"
        value={code[0]}
        onChange={(e) => handleDigitChange(e, 1)}
      />
      <input
        type="text"
        maxLength="1"
        value={code[1]}
        onChange={(e) => handleDigitChange(e, 2)}
      />
      <input
        type="text"
        maxLength="1"
        value={code[2]}
        onChange={(e) => handleDigitChange(e, 3)}
      />
      <input
        type="text"
        maxLength="1"
        value={code[3]}
        onChange={(e) => handleDigitChange(e, 4)}
      />
    </div>
  );
};

export default FourDigitInput;
