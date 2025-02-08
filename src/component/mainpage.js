import React, { useState, useEffect, useRef, useCallback  } from 'react';
import './css/main.css';
import { useNavigate,useLocation } from 'react-router-dom';
import Navbar from './nav';
import FileUpload from './imageup';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import PY from "./python.js";
import Webcam from 'react-webcam';
import { FaUpload } from 'react-icons/fa'; 
import image1 from "./imageforweb/chat-gpt.png"
import image2 from "./imageforweb/chk1.png"
import LandingPage from './landingpage.js';
const Mainapge = () => {

  
 
    const [messages, setMessages] = useState([]); // State to store chat messages
    const [inputValue, setInputValue] = useState(''); // State to handle text message input
    const [image, setImage] = useState(null); // State to handle image upload
    const [chatHistory, setChatHistory] = useState([]);
    const navigate = useNavigate(); 
    const location = useLocation();
    const [currentuserid, setCurrentuserid] = useState(location.state?.uuid);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [currentAccountName, setCurrentAccountName] = useState(location.state?.name);
    const [chatUUID, setChatuuid] = useState();
    const [selectedImage, setSelectedImage] = useState(null);
    const [userid, setuserid] = useState();
    const [base64ImageString, setBase64ImageString] = useState(null);
    const [allImage, setAllImage] = useState(null);
    const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup
    const [newChatName, setNewChatName] = useState(''); // State to store the name of the new chat
    const [chatNames, setChatNames] = useState([]);
    const [uploadResponse, setUploadResponse] = useState(null);
    const [captureResponse, setcaptureResponse] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
  const [webcamVisible, setWebcamVisible] = useState(false); // State to manage webcam visibility
  const webcamRef = useRef(null);
  const [showHtmlPopup, setShowHtmlPopup] = useState(false);
  const[chatshow ,setchatshow]=useState();
  useEffect(() => {
    if(!chatUUID){
      newchat();
      
    }
    // Fetch user ID when the component mounts
    fetchUserId();
    fetchChatNames();

    
  }, []); // Empty dependency array ensures this effect runs only once

  const fetchUserId = async () => {
    try {
      const userName = location.state?.name; // Assuming you're storing username in localStorage
      console.log('uusyuhsyhhj',currentAccountName);
      const userdata = location.state?.userdata || {};
      const userid = location.state?.uuid;
     console.log(userdata)
      console.log("user id in fetch function:",currentuserid);
      
      const response = await axios.post('http://localhost:5000/api/fetchUserId', { userid: currentuserid }); // Correctly send userid
      
      if (response.status === 200) {
        const userId = response.data.userId; // Adjusted to access userId instead of uuid
        // Now you have the userId, you can use it as needed
        setuserid(userId);
        console.log("fetch id", userId);
      } else {
        console.error('Failed to fetch userId. Status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching userId:', error);
    }
  };
  
  const bothbuuton = (e) => {
    e.preventDefault();
    submitImage();
    uploadimagepython();
  
   
   
  }
  
  
  
  
  const submitImage = async () => {
   
  
    const formData = new FormData();
    formData.append("image", image);
    formData.append('userUUID', userid); // Append user UUID
    console.log("userUUID",userid);
    formData.append('chatUUID', chatUUID); // Append new chat UUID
  console.log("chatUUID",chatUUID);
    const result = await axios.post(
      "http://localhost:5000/upload-image",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  };
  
  const uploadimagepythonwebcam = async () => {
  
    if (!imageSrc) return;
  
    try {
      // Convert base64 image to Blob
      const blob = await fetch(imageSrc).then(res => res.blob());
  
      const formData = new FormData();
      formData.append('image', blob, 'captured_image.jpg');
      formData.append('userUUID', userid); // Append user UUID
      formData.append('chatUUID', chatUUID); // Append new chat UUID
  
      const result = await axios.post(
        'http://localhost:80/upload-image',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
  
      setUploadResponse(result.data)
      console.log("upload python")
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const uploadimagepython = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("userUUID", userid);
    formData.append("chatUUID", chatUUID);
  
    try {
      const response = await axios.post(
        "http://localhost:80/detect_objects",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      // Add delay before handling the response
      //await new Promise(resolve => setTimeout(resolve, 2000)); // 2000ms delay
  
      // Handle response after delay
      console.log("Image upload response python:", response.data);
      setUploadResponse(response.data);
      await saveUploadResponse(response.data);
      return response.data; // Return data if needed
    } catch (error) {
      // Handle error
      console.error("Error uploading image:", error);
      throw error; // Throw error to be caught by Promise.catch() if needed
    }
  };
  
  
  
  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  
  const getImage = async () => {
    try {
      const userId = currentuserid // Get user ID from localStorage
      const chat1UUID = chatUUID; // Assuming you have chatUUID stored in your component state
  
      // Make a GET request to fetch images with user ID and chat ID
      const result = await axios.get(`http://localhost:5000/get-image?userId=${userId}&chatUUID=${chat1UUID}`);
      console.log("User ID:", userId);
      console.log("Chat UUID:", chatUUID);
      console.log("Response data:", result.data);
      setAllImage(result.data.data); // Assuming result.data.data contains the image data
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  
  
  
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  
  const fetchChatNames = async () => {
    
    console.log("user in chat", currentuserid);

    try {
        const response = await axios.get('http://localhost:5000/api/chat-response', {
          params:{ userId: currentuserid }});
        if (response.status === 200) {
          console.log("resonse from chat ",response.data);
            setChatNames(response.data);
        } else {
            console.error('Failed to fetch chat names. Status:', response.status);
        }
    } catch (error) {
        console.error('Error fetching chat names:', error);
    }
};

const handleNewChatSubmit = async (e) => {
  e.preventDefault();
  console.log("create chat id ", userid);
  console.log("create chat id ", chatUUID);
  console.log("create newChatName ", newChatName);
  try {
      // Send the chat name, chat UUID, and user ID to the backend
      const response = await axios.post('http://localhost:5000/api/chat', { chatName: newChatName, chatId: chatUUID, userId: userid });
      console.log('Chat saved successfully:', response.data.chatName); // Log the response data
      
setchatshow(response.data.chatName)
  } catch (error) {
      console.error('Error saving chat:', error);
  }
  setShowPopup(false);
};

const newchat = (e) => {
  // Check if the event object is defined
  console.log('Event object:', e);

  // Save the current chat to chat history
  console.log('Chat History:', chatHistory);
  console.log('Messages:', messages);
  setChatHistory([...chatHistory, ...messages]);

  // Generate a new chat UUID
  const newChatUUID = uuidv4();
  console.log('New Chat UUID:', newChatUUID);

  const userdata = location.state?.userdata || {};

  console.log('User ID:', userid);

  // Set the new chat UUID in the state
  setChatuuid(newChatUUID);
  console.log('Chat UUID in State:', newChatUUID);
  console.log('User ID in state:', userid);

  // Navigate to the main page with the new chat UUID and user data
  navigate('/main', { state: { chatUUID: newChatUUID, userid, userdata } });

  setAllImage(null);
 
  // Open the popup for adding the name of the new chat
  setShowPopup(true);
};
  

  const account = (e) => {
   
    const userdata = location.state?.userdata || {};
    const userId = currentuserid;
    const userName = currentAccountName

    // Access userdata or perform actions based on the state
    console.log('User:', userdata);
    console.log('name111',userName);
    console.log('UserId:', userId);
  
    // Example: Navigate to another route with userdata in state
    navigate('/accountdetails', { state: { userId, userName } });
  };
  

  
  // Function to handle image upload
  
 
  const saveUploadResponse = async (uploadResponse) => {
    console.log("Received upload response:", uploadResponse); // Log the received response
    try {
        await axios.post('http://localhost:5000/api/save-upload-response', {
            Code: uploadResponse,
            userUUID: userid,
            chatUUID: chatUUID
        });
    } catch (error) {
        console.error('Error saving upload response:', error);
    }
};

 
  const responseRef = useRef(null);

  const copyToClipboard = () => {
    if (responseRef.current) {
      navigator.clipboard.writeText(uploadResponse);
      alert('Response copied to clipboard!');
    }
  };

  const toggleHtmlPopup = () => {
    setShowHtmlPopup(!showHtmlPopup);
  };

  return (
    <div className='main'>

      <div className={`sidebox ${sidebarVisible ? 'show' : ''}`}>
        <div className="scrollable-container">
          <div className="newchat" >
<div className='logo11'>
  <h3>ℂ𝕆𝔻𝔾𝔼ℕ</h3>
  <img src={image1} alt="chat" className='logos' onClick={newchat} height={30} width={30}  title='New Chat'/>
  </div>
            <div style={{ color: 'white' }}> {/* Set the text color to white */}
            
            <ul>
                {chatNames.length > 0 ? (
                    chatNames.map((chat, index) => (
                        <li key={index}>{chat.chatName}</li>
                    ))
                ) : (
                    <li>No chats available</li>
                )}
            </ul>
        </div>
       
          </div>
        </div>
        <button className="accountdetails" onClick={account} title='ACCOUNT DETAILS'>
          {currentAccountName}
        </button>
      </div>
      <div className="chat-container">
      <div className='logo11'>
      <h3 color='white'>ℂ𝕆𝔻𝔾𝔼ℕ</h3>
      <div className='batn'  >
      <img src={image2} alt="cht" className='logos1' onClick={getImage} height={30} width={30} title='Check if the image is correct' />
      </div></div>
        <div className="chat-messages">
          
          
          <div>
            <div className="image-container">
              {showPopup && (
                <div className="popup">
                  <div className="popup-content">
                    <h2> New Chat</h2>
                    <input
                      type="text"
                      value={newChatName}
                      onChange={(e) => setNewChatName(e.target.value)}
                      placeholder="Enter Chat Name"
                    />
                    
                    <button  className="pbtn"onClick={handleNewChatSubmit} width="5px">Create Chat</button>
                  </div>
                </div>
              )}
              {allImage == null
                ? ""
                : allImage.map((data, index) => (
                  <img
                    key={index}
                    src={require(`../images/${data.image}`)}
                    alt={`Image ${index}`}
                    className="centered-image"
                  />
                ))}
             
              <div>
                {uploadResponse && (
                  <div className="response-container">
                    <p className="response-text" ref={responseRef}>code: {uploadResponse}</p>
                    <button className="copy-button" onClick={copyToClipboard}>Copy</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div class="centered-container">
  <form onSubmit={bothbuuton} class="file-upload-form">
    <div class="input-with-button">
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={onInputChange} 
       
      />
    </div>
      <button class="submitbutton" type="submit" title='SUBMIT'>
        <FaUpload />
      </button>
    </div>
  </form>
</div>

        <div className="button-row">
         
          <button className="compiler" onClick={toggleHtmlPopup} title='HTML Compiler'>Open HTML Compiler</button>
          
        </div>
        
        {showHtmlPopup && (
          <div className="popup">
            <div className="popup-content">
              <h2>HTML Compiler</h2>
              <div className="compiled-html">
                <iframe
                  srcDoc={uploadResponse}
                  title="Compiled HTML"
                  sandbox="allow-scripts"
                  width="100%"
                  height="300px"
                />
              </div>
              <button className="pbtn" onClick={toggleHtmlPopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mainapge;
