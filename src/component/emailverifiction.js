import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = () => {
  const { uuid } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/verify/${uuid}`);

        if (response.status === 200) {
          console.log('Email verified successfully');
        } else {
          console.error('Email verification failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    verifyEmail();
  }, [uuid]);

  return (
    <div>
      <p>Verifying email...</p>
    </div>
  );
};

export default EmailVerification;
