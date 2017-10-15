import React from "react";

import calculateComfortIndex from "utils/calculate-comfort-index";

const DayNameHeader = ({
  day,
  dayOfWeek,
  averageComfortIndex,
  minimumHigh,
  maximumHigh,
  hourFilter,
}) => {
  const comfortIndex = calculateComfortIndex(day, minimumHigh, maximumHigh, hourFilter);

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
