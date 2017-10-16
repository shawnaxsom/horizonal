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
  const comfortIndex = calculateComfortIndex(
    day,
    minimumHigh,
    maximumHigh,
    hourFilter,
  );

  return (
    <div
      style={{
        border: "thin solid black",
        borderRadius: "0.3em 0.3em 0 0",
        background: "#000",
        color: "#fff",
        padding: 4,
        fontSize: "0.9em",
        ...(comfortIndex > averageComfortIndex + 1
          ? {background: "#fff", color: "#000"}
          : {}),
      }}
    >
      {dayOfWeek.substr(0, 3).toUpperCase()} {Math.round(comfortIndex)}
    </div>
  );
};

export default DayNameHeader;
