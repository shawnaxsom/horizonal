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
      fontSize: "0.95em",
      height: `${day.precipProbability * 100}%`,
      minHeight: 24,
      color: "#00a",
      background: "#abf",
      borderRadius: "0.2em 0.2em 0 0",
      paddingTop: 2,
    }}
  >
    <i className="wi wi-rain" />
    <div style={{display: "inline-block", marginLeft: 10}}>
      {Math.round(day.precipProbability * 100, 0)}%
    </div>
  </div>;

export default Precipitation;
