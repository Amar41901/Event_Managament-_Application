// import { useEffect, useState } from "react";
// import React from "react";
// import axios from "axios";
// import Countdown from "./Countdown";


// function Mainpage() {
//   const [events, setEvents] = useState([]);

//   const getAllEvent = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8080/api/event/events"
//       );
//       setEvents(response.data.data);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };

//   useEffect(() => {
//     getAllEvent();
//   }, []);

//   return (
//     <div className="card-container">
//       {events.map((event, index) => (
//         <div key={index} className="card">
//           <img src={`http://localhost:8080/${event.image}`} alt="User" />
//           <h3 className="card-title">{event.title}</h3>
//           <p className="card-description">{event.description}</p>
//           <p className="card-date">Date: {event.date}</p>
//           <p className="card-time">Time: {event.time}</p>
//           <p className="card-time">
//             <Countdown event={event} />
//           </p>
//           <button className="book-button">Book Event</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Mainpage;




import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Countdown from "./Countdown";

function Mainpage() {
  const [events, setEvents] = useState([]);
  const handleBookEvent = async (eventId) => {
    try {
      const userEmail = localStorage.getItem("email"); // Get user email from localStorage
      const response = await axios.post(
        `http://localhost:8080/api/event/book/${eventId}`,
        { userEmail : userEmail },
        {
          withCredentials:true
        }
      );
      console.log(response.data.message); // Display success message
      alert("Event Booked Successfully");
      getAllEvent(); // Refresh the event list after booking
    } catch (error) {
      console.error("Error booking event:", error);
    }
  };

  const getAllEvent = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/event/events"
      );
      setEvents(response.data.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    getAllEvent();
  }, []);

  return (
<div className="card-container">
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
<button className="book-button" onClick={() => handleBookEvent(event.id)}>
            Book Event
</button>
</div>
      ))}
</div>
  );
}

 

export default Mainpage;