import React, { useState, useEffect } from "react";

function Countdown({ event }) {
  const calculateCountdown = (eventDate) => {
    const currentTime = new Date();

    const eventTime = new Date(eventDate);

    return Math.max(eventTime - currentTime, 0);
  };

  const [countdown, setCountdown] = useState(calculateCountdown(event.date));

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdown = calculateCountdown(event.date);

      setCountdown(newCountdown);

      if (newCountdown <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [event]);

  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return <p>Countdown: {formatTime(countdown)}</p>;
}

export default Countdown;
