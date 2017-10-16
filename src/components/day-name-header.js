import React from "react";
import moment from "moment";

import calculateComfortIndex from "utils/calculate-comfort-index";

const DayNameHeader = ({
  day,
  dayOfWeek,
  averageComfortIndex,
  minimumHigh,
  maximumHigh,
  dayFilter,
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
      {dayFilter
        ? moment.unix(day.time).format("ha")
        : moment.unix(day.time).format("ddd").toUpperCase()}{" "}
      {Math.round(comfortIndex)}
    </div>
  );
};

export default DayNameHeader;
