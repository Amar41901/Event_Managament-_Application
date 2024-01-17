import React from 'react';
import userImage from '../images/user.jpg';
import starImage from '../images/star.png';
import homeImage from '../images/dashboard.png';
import contactImage from '../images/rewards.png';
import messageImage from '../images/messages.png';
import eventImage from '../images/events.png';
import memberImage from '../images/members.png';
import logoutImage from '../images/logout.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navigate = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8080/api/auth/logout', { withCredentials: true });
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const token = localStorage.getItem('token');
  const isLoggedIn = token !== null;

  return (
    <div className="aheader">
      <div className="side-nav">
          {isLoggedIn && (
            <>
        <div className="auser">
              <img src={userImage} className="user-img" alt="User" />
              <div>
                <h2>CodeInfinity</h2>
                <p>aep@codeinfinity.com</p>
              </div>
              <img src={starImage} className="star-img" alt="Star" />
        </div>
            </>
          )}
        <ul>
          <li>
            <img src={homeImage} alt="Dashboard" />
            <label htmlFor="link" type="text">
              <Link to="/">Home</Link>
            </label>
          </li>
          <li>
            <img src={homeImage} alt="Dashboard" />
            <label htmlFor="link" type="text">
              <Link to="/search">Search</Link>
            </label>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <img src={contactImage} alt="Rewards" />
                <Link to="/booked">Booked Events</Link>
              </li>
              <li>
                <img src={messageImage} alt="Messages" />
                <Link to="/myevents">My Events</Link>
              </li>
              <li>
                <img src={eventImage} alt="Projects" />
                <Link to="/hostevents">Host Events</Link>
              </li>
              <li>
                <img src={memberImage} alt="Members" />
                <Link to="/update">Edit Profile</Link>
              </li>
            </>
          )}
        </ul>

        <ul>
          {isLoggedIn && (
            <li>
              <img src={logoutImage} alt="Logout" />
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navigate;
