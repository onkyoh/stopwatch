import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem("stopwatch_time");
    return savedTime ? parseInt(savedTime) : 0;
  });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        if (time % 10 === 0) {
          localStorage.setItem("stopwatch_time", time);
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, time]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    localStorage.setItem("stopwatch_time", 0);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        handleStartPause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleStartPause]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <main>
      <h1>{formatTime(time)}</h1>
      <div id="buttons">
        <button onClick={handleStartPause}>
          {isRunning ? (
            <svg viewBox="0 0 1024 1024" fill="currentColor">
              <path d="M304 176h80v672h-80zm408 0h-64c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8z" />
            </svg>
          ) : (
            <svg fill="none" viewBox="0 0 15 15">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.05 2.75a.55.55 0 10-1.1 0v9.5a.55.55 0 001.1 0v-9.5zm2.683-.442A.5.5 0 005 2.75v9.5a.5.5 0 00.733.442l9-4.75a.5.5 0 000-.884l-9-4.75zM6 11.42V3.579L13.429 7.5l-7.43 3.92z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        <button onClick={handleReset}>
          {" "}
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M10 2h4M12 14v-4M4 13a8 8 0 018-7 8 8 0 11-5.3 14L4 17.6" />
            <path d="M9 17H4v5" />
          </svg>
        </button>
      </div>
    </main>
  );
}

export default App;
