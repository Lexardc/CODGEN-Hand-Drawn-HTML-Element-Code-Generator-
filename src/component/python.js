import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PY() {
  const [formData, setFormData] = useState({
    // Initialize form fields here
    name: '',
    email: '',
    message: ''
  });
  const [data, setData] = useState('');
  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:80/api/data');
      setData(response.data.message);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/Data', formData);
      console.log(response.data); // Log response from backend
    } catch (error) {
      console.error('Error sending data: ', error);
    }
  };

  return (
    <div>
     
      <h1>code</h1>
      <p>{data}</p>
    </div>
   
  );
}

export default PY;
