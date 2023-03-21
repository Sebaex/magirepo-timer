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
    const secondsCount = Math.floor((timeRemaining / 1000) % 60);
    const minutesCount = Math.floor((timeRemaining / 1000 / 60) % 60);
    const hoursCount = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const daysCount = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    const seconds = secondsCount === 1 ? `${secondsCount} second` : `${secondsCount} seconds` 
    const minutes = minutesCount === 1 ? `${minutesCount} minute` : `${minutesCount} minutes` 
    const hours = hoursCount === 1 ? `${hoursCount} hour` : `${hoursCount} hours` 
    const days = daysCount === 1 ? `${daysCount} day` : `${daysCount} days` 

    if (daysCount > 0) {
      return `${days}, ${hours}, ${minutes}, ${seconds}`;
    }
    else {
      return `${hours}, ${minutes}, ${seconds}`;
    }
  };

  return (
    <div className="mb-5">
      <h1>Time remaining until next comic:</h1>
      <span className="h3">{formatTimeRemaining(timeRemaining)}</span>
    </div>
  );
}

export default Countdown;
