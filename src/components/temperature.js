import React from "react";

import temperatureOf from "utils/temperature-of";

const Temperature = ({averageHigh, day, hourFilter}) =>
  <div
    style={
      temperatureOf(day, hourFilter) > averageHigh
        ? {background: "#e20", color: "#fff"}
        : {background: "#57f", color: "#fff"}
    }
  >
    {Math.round(temperatureOf(day, hourFilter), 0)}
  </div>;

export default Temperature;
