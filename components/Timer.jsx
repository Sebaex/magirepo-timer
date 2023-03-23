import { useState, useEffect } from "react";

function Countdown({ timezone, targetHour }) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const moment = require('moment-timezone');
  const [jpLaunchTime, setJpLaunchTime] = useState()
  const [localLaunchTime, setLocalLaunchTime] = useState()

  useEffect(() => {
    const timer = setInterval(() => {
      const now = moment().tz(timezone);
      const nextTarget = getNextTarget(now);
      const timeToNextTarget = nextTarget - now.valueOf();
      setTimeRemaining(timeToNextTarget);
    }, 1000);

    return () => clearInterval(timer);
  }, [timezone, targetHour]);

  const getNextTarget = (now) => {
    let targetDate = moment(now)
      .add((2 - moment(now).day() + 7) % 7, 'days')
      .set('hour', targetHour)
      .set('minute', 0)
      .set('second', 0)
    setJpLaunchTime(targetDate.format("DD/MM HH:mm UTC Z"))
    setLocalLaunchTime(targetDate.local().format("DD/MM HH:mm UTC Z"))
    if (targetDate < now) {
      targetDate.add(7, 'days');
    }
    return targetDate.toDate();
  };

  const formatTimeRemaining = (timeRemaining) => {
    const secondsCount = Math.floor((timeRemaining / 1000) % 60);
    const minutesCount = Math.floor((timeRemaining / 1000 / 60) % 60);
    const hoursCount = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const daysCount = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    if(timeRemaining == 0){
      return "Now"
    }

    const timeValues = [
      { value: daysCount, singular: 'day', plural: 'days' },
      { value: hoursCount, singular: 'hour', plural: 'hours' },
      { value: minutesCount, singular: 'minute', plural: 'minutes' },
      { value: secondsCount, singular: 'second', plural: 'seconds' },
    ];
    
    const timeStrings = timeValues
      .filter(({ value }) => value !== 0)
      .map(({ value, singular, plural }) => {
        const timeString = value === 1 ? singular : plural;
        return `${value} ${timeString}`;
      });
    
    return timeStrings.join(', ');
  };

  return (
    <div className="mb-5">
      <h1>Time remaining until next comic:</h1>
      <span className="h3">{formatTimeRemaining(timeRemaining)}</span>
      <h2 className="mt-4">New comic available at:</h2>
      <div className="col h4">Japan: {jpLaunchTime}</div>
      <div className="col h4">Your local time: {localLaunchTime}</div>
    </div>
  );
}

export default Countdown;
