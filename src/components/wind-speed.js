import React from "react";

const windSpeed = ({ day }) => (
  <div
    style={{
      borderBottom: "thin solid black",
      height: 28,
      ...(day.windSpeed > 7
        ? {
            backgroundColor: "#eaeae0",
          }
        : {
            backgroundColor: "#fafafa",
          }),
    }}
  >
    {day.windSpeed > 4 && [
      <i className="wi wi-strong-wind" style={{ color: "#ccc" }} />,
      <div style={{ display: "inline-block" }}>
        {Math.round(day.windSpeed)}
      </div>,
    ]}
  </div>
);

export default windSpeed;
