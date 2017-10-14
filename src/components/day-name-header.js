import React from "react";

import temperatureOf from "utils/temperature-of";

const DayNameHeader = ({day, dayOfWeek, maximumHigh}) =>
  <div
    style={{
      border: "thin solid black",
      borderRadius: "0.3em 0 0 0",
      background: "#aaa",
      color: "white",
      padding: 4,
      ...(maximumHigh - temperatureOf(day) < 3 ? {background: "#f53"} : {}),
      ...(maximumHigh - temperatureOf(day) > 10 ? {background: "#09f"} : {}),
    }}
  >
    {dayOfWeek}
  </div>;

export default DayNameHeader;
