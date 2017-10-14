import React from "react";

import temperatureOf from "utils/temperature-of";

const Temperature = ({averageHigh, day}) =>
  <div
    style={
      temperatureOf(day) > averageHigh
        ? {background: "#e20", color: "#fff"}
        : {background: "#57f", color: "#fff"}
    }
  >
    {Math.round(temperatureOf(day), 0)}
  </div>;

export default Temperature;
