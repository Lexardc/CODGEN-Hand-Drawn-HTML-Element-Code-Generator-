import React, { useState, useEffect } from 'react';
import './css/AccountDetails.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './nav';

const AccountDetails = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  const userData = location.state?.userData || {
    name: '',
    email: '',
    // ...other user details
  };

  const navigate = useNavigate();

  const [user, setUser] = useState(userData);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const[name,setname]=useState(null)
  const[id,setid]=useState(null)
  const[data,setdata1]=useState(null)


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    try {
        const response = await axios.put(`http://localhost:5000/api/updateuser/${userId}`, {
            newName: user.name,
            newEmail: user.email,
        });

        if (response.status === 200) {
            console.log(response.data);
            setname(response.data.user.name);
 // Corrected function name to setName
            console.log(response.data.user.name); // Log the updated name
            console.log(response.data.user.uuid);
            setid(response.data.user.uuid)
            setdata1(response.data.user)
            setEditMode(false);
            // Pass response.data instead of user
            navigate('/main', { state: { userData: response.data.user, name: response.data.user.name ,uuid:response.data.user.uuid} });} else {
            // Handle other status codes or errors
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle API call errors
    }
};

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/getdata/${userId}`)
        .then((response) => {
          const userData = response.data;
          console.log('User data:', userData);

          if (userData && typeof userData === 'object') {
            setUser(userData);
            setIsLoading(false);
          } else {
            console.log('Invalid user data format:', userData);
            setError('Invalid user data format');
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError(error.message);
          setIsLoading(false);
        });
    }
  }, [userId]);

  const back = (e) => {
    e.preventDefault();
    
    console.log("hsgbd",name);
    
    console.log(id);
    navigate('/main',{ state: { id, data,name } });
  };

  return (
    
    <div className="full-page-container">
      <Navbar/>
      <div className="account-details-container">
    
        <h2>Account Details</h2>
        {editMode ? (
          <div className="user-info">
            
            <label>
              Username:
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </label>
            {/* More user information inputs */}
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div className="user-info">
            <p>
              <strong>Username:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {/* Display other user information */}
            <button onClick={toggleEditMode}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountDetails;
