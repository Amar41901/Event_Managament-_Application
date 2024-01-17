import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Countdown from "./Countdown";

function UserEvents() {
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    // Get the user's email from localStorage
    const userEmail = localStorage.getItem("email");

    const fetchUserEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/event/user/${userEmail}`);
        setUserEvents(response.data.data);
      } catch (error) {
        console.error("Error fetching user events:", error);
      }
    };

    fetchUserEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8080/api/event/eventdelete/${eventId}`);
      alert("Are You Sure !! the slected event get deleted.. ");
      setUserEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="card-container">
    {userEvents.map((event, index) => (
      <div key={index} className="card">
        <img src={`http://localhost:8080/${event.image}`} alt="User" />
        <h3 className="card-title">{event.title}</h3>
        <p className="card-description">{event.description}</p>
        <p className="card-date">Date: {event.date}</p>
        <p className="card-time">Time: {event.time}</p>
        <p className="card-time"><Countdown event={event} /></p>
        <Link to={`/eventupdate/${event.id}`}>
        <button className="book-button edit-button">Edit Event</button>
        </Link>
        <button className="delete-button edit-button" onClick={() => handleDelete(event.id)}>Delete Event</button>
      </div>
    ))}
  </div>
  );
}

export default UserEvents;
