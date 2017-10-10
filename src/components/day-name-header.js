import React from "react";

import temperatureOf from "utils/temperature-of";

const DayNameHeader = ({day, dayOfWeek, maximumHigh}) =>
  <div
    style={{
      border: "thin solid black",
      // ...(dayOfWeek === "Saturday" || dayOfWeek === "Sunday"
      //   ? {
      //       color: "white",
      //       background: "black",
      //     }
      //   : {
      //       color: "black",
      //       background: "white",
      //     }),
      ...(maximumHigh - temperatureOf(day) < 3
        ? {color: "black", background: "#ffcccc"}
        : {}),
      ...(maximumHigh - temperatureOf(day) > 10 ? {background: "#aaffff"} : {}),
    }}
  >
    {dayOfWeek}
  </div>;

export default DayNameHeader;
