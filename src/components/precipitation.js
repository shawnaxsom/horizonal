import React from "react";

const Precipitation = ({day}) =>
  day.precipProbability > 0.1 &&
  <div
    style={{
      position: "absolute",
      width: "100%",
      borderLeft: 0,
      borderRight: 0,
      borderBottom: 0,
      borderTop: `${day.precipProbability * 120 - 10}px solid #bef`,
      bottom: 0,
      background: "#bef",
    }}
  >
    <i className="wi wi-rain" />
    <div style={{display: "inline-block", marginLeft: 10}}>
      {Math.round(day.precipProbability * 100, 0)}%
    </div>
  </div>;

export default Precipitation;
