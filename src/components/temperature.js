import React from "react";

import temperatureOf from "utils/temperature-of";

const Temperature = ({averageHigh, day, hourFilter, style}) =>
  <div
    style={{
      ...(temperatureOf(day, hourFilter) > averageHigh
        ? {background: "#e46", color: "#fff"}
        : {background: "#9cd", color: "#342"}),
      zIndex: 1000,
      position: "relative",
      width: "100%",
      ...style,
    }}
  >
    {Math.round(temperatureOf(day, hourFilter), 0)}
  </div>;

export default Temperature;
