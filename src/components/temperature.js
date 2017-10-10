import React from "react";

import temperatureOf from "utils/temperature-of";

const Temperature = ({averageHigh, day}) =>
  <div
    style={
      temperatureOf(day) > averageHigh
        ? {background: "#ffcccc"}
        : {background: "#ccccff"}
    }
  >
    {Math.round(temperatureOf(day), 0)}
  </div>;

export default Temperature;
