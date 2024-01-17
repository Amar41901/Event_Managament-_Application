import React, { useState } from "react";
import Countdown from "./Countdown";

import axios from "axios";

function SearchEvent() {

  const [events, setEvents] = useState([]);

  const [searchData, setSearchData] = useState({
    title: "",

    // date:''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSearchData((prevData) => ({
      ...prevData,

      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:8080/api/event/search/${searchData.title}`
      );

      console.log("API response:", response.data);

      setEvents(response.data.data);

      alert("get event");

      // action.resetForm();

      // navigate("/login");
    } catch (err) {
      console.log(err);
    }

    console.log(searchData);
  };

  //  });

  return (
    <>
    <div className="search-event-container">
      <div className="amar">
      <h3>Search Events</h3>

      <form onSubmit={handleSearch} className="search-form">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={searchData.title}
            onChange={handleInputChange}
          />
        </label>
        <br></br>

        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      </div>
      </div>


      <div className="acard-container">
        {events.map((event, index) => (
          <div key={index} className="card">
            <img src={`http://localhost:8080/${event.image}`} alt="User" />
            <h3 className="card-title">{event.title}</h3>
            <p className="card-description">{event.description}</p>
            <p className="card-date">Date: {event.date}</p>
            <p className="card-time">Time: {event.time}</p>
            <p className="card-time">
              <Countdown event={event} />
            </p>
            <button className="book-button">Book Event</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchEvent;
