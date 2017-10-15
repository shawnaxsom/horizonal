import React from "react";

import calculateComfortIndex from "utils/calculate-comfort-index";

const DayNameHeader = ({
  day,
  dayOfWeek,
  averageComfortIndex,
  minimumHigh,
  maximumHigh,
}) => {
  const comfortIndex = calculateComfortIndex(day, minimumHigh, maximumHigh);

  console.warn(
    "ZZZZ day-name-header.js",
    "aCI",
    "calculateComfortIndex(day, minimumHigh, maximumHigh)",
    averageComfortIndex,
    dayOfWeek,
    comfortIndex,
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
        ...(comfortIndex > averageComfortIndex + 1
          ? {background: "#fff", color: "#000"}
          : {}),
      }}
    >
      {dayOfWeek} {Math.round(comfortIndex)}
    </div>
  );
};

export default DayNameHeader;
