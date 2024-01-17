import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEventForm = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    setUserEmail(localStorage.getItem("email"));
    fetchEventData(eventId);
  }, [eventId]);

  const fetchEventData = async (eventId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/event/user/${eventId}`);
      console.log(response)
      const eventData = response.data.data;
      setEventData(eventData);
      console.log("Fetched event data:", eventData);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("location", eventData.location);
    formData.append("image", selectedImage);
    formData.append("email", userEmail);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/event/update/${eventId}`,
        formData
      );

      console.log("Event updated:", response.data);
      alert("Event updated");
      setTimeout(() => {
        navigate('/myevents');
      }, 3000);
      
    } catch (error) {
      console.error("Error updating event:", error);
      // Handle the error
    }
  };

  return (
    <div className="create-event-container">
      <h2>Update Event</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Date:
          <input
            type="date"
            name="date"
            placeholder="YYYY-MM-DD"
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            value={eventData.date}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Time:
          <input
            type="time"
            name="time"
            value={eventData.time}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleInputChange}
            required
          />
        </label>

        <label className="fileselection">
          Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>

        <button type="submit" className="create-button">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateEventForm;
