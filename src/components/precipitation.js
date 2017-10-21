import React from "react";

const Precipitation = ({day}) =>
  day.precipProbability > 0.1 &&
  <div
    style={{
      position: "absolute",
      width: "100%",
      left: 0,
      right: 0,
      bottom: 0,
      height: `${day.precipProbability * 100}%`,
      minHeight: 24,
      background: "#bef",
    }}
  >
    <i className="wi wi-rain" />
    <div style={{display: "inline-block", marginLeft: 10}}>
      {Math.round(day.precipProbability * 100, 0)}%
    </div>
  </div>;

export default Precipitation;
