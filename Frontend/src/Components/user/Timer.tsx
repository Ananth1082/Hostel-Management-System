import React, { useState, useEffect } from "react";

function Timer(props: { initialTime: { hours: number; minutes: number; seconds: number } ,setProgress: any}) {
  const initialTimeSecods = props.initialTime.hours * 3600 + props.initialTime.minutes * 60 + props.initialTime.seconds; 
  const [time, setTime] = useState(props.initialTime);
  const [isActive, setIsActive] = useState(true);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setTime(time);
    setIsActive(true);
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
      setIsActive(false);
    } else if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          let secondsLeft = prevTime.hours * 3600 + prevTime.minutes * 60 + prevTime.seconds;
          props.setProgress(100-(secondsLeft / initialTimeSecods)*100);
          if (secondsLeft === 0) {
            setIsActive(false);
            return { hours: 0, minutes: 0, seconds: 0 };
          }
          secondsLeft--;
          const hours = Math.floor(secondsLeft / 3600);
          secondsLeft %= 3600;
          const minutes = Math.floor(secondsLeft / 60);
          secondsLeft %= 60;

          return { hours, minutes, seconds: secondsLeft };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);
  useEffect(() => {
    reset();
  });
  return (
    <div>
      <div className="text-4xl">
        {`${time.hours.toString().padStart(2, "0")}:${time.minutes
          .toString()
          .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}
      </div>
      <div className="flex gap-4">
       
      </div>
    </div>
  );
}

export default Timer;
