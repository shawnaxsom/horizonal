import React from "react";
import moment from "moment";

import calculateComfortIndex from "utils/calculate-comfort-index";

const DayNameHeader = ({
  day,
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
        background:
          "linear-gradient(to left top, rgb(51, 51, 51), rgb(52, 51, 53), rgb(54, 51, 55), rgb(56, 51, 56), rgb(59, 50, 56))",
        color: "#eed",
        padding: 4,
        borderRadius: "0.1em 0.1em 0 0",
        boxShadow: "0px -3px 50px rgba(255, 250, 240, 0.5)",
        fontSize: "0.9em",
        ...(comfortIndex > averageComfortIndex + 1
          ? { background: "#fff", color: "#444" }
          : {}),
      }}
    >
      {dayFilter
        ? `${moment.unix(day.time).format("h")}${moment
            .unix(day.time)
            .format("a")
            .substr(0, 1)}`
        : moment
            .unix(day.time)
            .format("ddd")
            .toUpperCase()}{" "}
      {Math.round(comfortIndex)}
    </div>
  );
};

export default DayNameHeader;
