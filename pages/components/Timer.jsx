import { useState, useEffect } from "react";

function Countdown({ timezone, targetHour }) {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().toLocaleString("en-US", { timeZone: timezone });
      const nextTarget = getNextTarget(now);
      const timeToNextTarget = nextTarget - new Date(now);
      setTimeRemaining(timeToNextTarget);
    }, 1000);

    return () => clearInterval(timer);
  }, [timezone, targetHour]);

  const getNextTarget = (now) => {
    let targetDate = new Date(now);
    targetDate.setDate(targetDate.getDate() + ((2 - targetDate.getDay() + 7) % 7));
    targetDate.setHours(targetHour, 0, 0, 0);
    if (targetDate < now) {
      targetDate.setDate(targetDate.getDate() + 7);
    }
    return targetDate.getTime();
  };

  const formatTimeRemaining = (timeRemaining) => {
    const seconds = Math.floor((timeRemaining / 1000) % 60);
    const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };

  return (
    <div>
      <h3>Time remaining until next comic:</h3>
      <p>{formatTimeRemaining(timeRemaining)}</p>
    </div>
  );
}

export default Countdown;
