import React, { useState } from 'react';
import { Link } from "react-router-dom";
const Topbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const username = localStorage.getItem('username'); 
  const email = localStorage.getItem('email'); 
  const profileImage = localStorage.getItem('image')

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="topbar">
      <nav className="eynavbar">
        <div className="eylogo"></div>
        {!username ? (
          <Link to="/login">
          <button className="login-button">Login</button>
          </Link>
        ) : (
          <div className="eyprofile" onClick={toggleDropdown}>
            <img src={`http://localhost:8080/uploads/${profileImage}`} alt="Profile" className="profile-pic" />
            {dropdownVisible && (
              <div className="eydropdown">
                <div className="eyusername"><p><b>Username:</b>{username}</p></div>
                <div className="eyemail"><p><b>Email:</b>{email}</p></div>
                <Link to='/update'>
                <button className="edit-profile-button">Edit Profile</button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Topbar;
