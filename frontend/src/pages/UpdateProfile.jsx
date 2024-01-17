import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img from '../images/default-avatar.png';
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const UpdateCredentials = () => {
  const profileImage = localStorage.getItem('image');
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file
  const navigate = useNavigate();
  const [userData, setUserData] = useState({}); // State to hold user data

  useEffect(() => {
    // Fetch user data when component mounts
    const database = axios.get("http://localhost:8080/api/users/userdata", { withCredentials: true })
      .then(response => {
        setUserData(response.data);
        setNewUsername(response.data.username);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("newUsername", newUsername);
    formData.append("newPassword", newPassword);
    formData.append("profileImage", selectedFile); // Add the selected image to the form data

    try {
      const response = await axios.post("http://localhost:8080/api/post/update", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data);
      setUserData({ ...userData, username: newUsername }); 
      localStorage.clear()
      toast.success("Kindly Login Again!!!");
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      console.error("Error updating credentials:", error);
    }
  };


  return (
    <div className="updateProfile">
      <div className="profile">
        <h2>Update Profile</h2>
        <div className="profileImg">
        <img src={`http://localhost:8080/uploads/${profileImage}`} alt=""/>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="update-box">
            <label htmlFor="new-username">New Username:</label>
            <input
              type="text"
              id="new-username"
              placeholder="New Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />
          </div>
          <div className="update-box">
            <label htmlFor="new-password">New Password:</label>
            <input
              type="password"
              id="new-password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="update-box">
            <input type="file" id="file" onChange={handleFileChange} />
          </div>
          <button type="submit">Update</button>
        </form>
        <p className="message">{message}</p>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default UpdateCredentials;
