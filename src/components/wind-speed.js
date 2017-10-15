import React from "react";

const windSpeed = ({day}) =>
  <div style={{borderBottom: "thin solid black"}}>
    <i className="wi wi-strong-wind" style={{color: "#ccc"}} />
    {Math.round(day.windSpeed)}
  </div>;

export default windSpeed;
