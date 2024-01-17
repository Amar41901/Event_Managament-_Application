import React, { useState } from "react";

import axios from "axios";

const CreateEventForm = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    image: "",
  });

  const [selectedImage, setImage] = useState(null);

  const handleInputChange = (e) => {


    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    setEventData({ ...eventData, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
  };

  var usermail = "";

  usermail = localStorage.getItem("email");

  // console.log(usermail);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("location", eventData.location);
    formData.append("image", selectedImage);
    formData.append("email", usermail);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/event/add",
        formData
      );

      console.log("Event created:", response.data);

      alert("Event created");
    } catch (error) {
      console.error("Error creating event:", error);

      // Handle the error
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create Event</h2>

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
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
