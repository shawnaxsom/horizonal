import React from "react";

import temperatureOf from "utils/temperature-of";

const DayNameHeader = ({day, dayOfWeek, minimumHigh, maximumHigh}) => {
  const distanceFromMiddleTemperature = Math.abs(
    temperatureOf(day) - (minimumHigh + (maximumHigh - minimumHigh) / 2),
  );

  console.warn(
    "ZZZZ day-name-header.js",
    "distanceFromMiddleTemperature",
    distanceFromMiddleTemperature,
    minimumHigh,
    maximumHigh,
  );

  return (
    <div
      style={{
        border: "thin solid black",
        borderRadius: "0.3em 0.3em 0 0",
        background: "#000",
        color: "#fff",
        padding: 4,
        // ...(maximumHigh - temperatureOf(day) < 3 ? {background: "#f53"} : {}),
        // ...(maximumHigh - temperatureOf(day) > 10 ? {background: "#09f"} : {}),
        ...(distanceFromMiddleTemperature < 6 &&
        day.cloudCover < 0.2 &&
        day.precipProbability < 0.2
          ? {background: "#fff", color: "#000"}
          : {}),
      }}
    >
      {dayOfWeek}
    </div>
  );
};

export default DayNameHeader;
