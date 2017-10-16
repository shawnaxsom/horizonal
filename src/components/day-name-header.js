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
        background: "#555",
        color: "#fff",
        padding: 4,
        fontSize: "0.9em",
        ...(comfortIndex > averageComfortIndex + 1
          ? {background: "#fff", color: "#444"}
          : {}),
      }}
    >
      {dayOfWeek.substr(0, 3).toUpperCase()} {Math.round(comfortIndex)}
    </div>
  );
};

export default DayNameHeader;
