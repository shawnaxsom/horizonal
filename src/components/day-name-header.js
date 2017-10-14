import React from "react";

import temperatureOf from "utils/temperature-of";

const DayNameHeader = ({day, dayOfWeek, maximumHigh}) =>
  <div
    style={{
      border: "thin solid black",
      backgroundColor: "#aaa",
      color: "white",
      ...(maximumHigh - temperatureOf(day) < 3 ? {background: "#f53"} : {}),
      ...(maximumHigh - temperatureOf(day) > 10 ? {background: "#09f"} : {}),
    }}
  >
    {dayOfWeek}
  </div>;

export default DayNameHeader;
