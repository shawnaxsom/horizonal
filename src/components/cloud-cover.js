import React from "react";

const CloudCover = ({day}) =>
  <div
    style={{
      height: `${parseInt(1.0 * 150, 10) + 4 + 4 + 18}px`,
      background: "#fafafa",
    }}
  >
    <div
      style={{
        borderTop: `${parseInt(
          Math.max(day.cloudCover * 120, 1),
          10,
        )}px solid ${day.cloudCover < 0.2 ? "#ffff00" : "#000000"}`,
        padding: 4,
        background: day.cloudCover < 0.2 ? "#ffff00" : "#000000",
      }}
    >
      {day.cloudCover < 0.2
        ? <i style={{color: "black"}} className="wi wi-day-sunny" />
        : <i style={{color: "white"}} className="wi wi-cloud" />}
      <div
        style={{
          display: "inline-block",
          marginLeft: 10,
          ...(day.cloudCover < 0.2 ? {color: "black"} : {color: "white"}),
        }}
      >
        {Math.round(day.cloudCover * 100, 0)}%
      </div>
    </div>
  </div>;

export default CloudCover;
