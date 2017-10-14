import React from "react";

const CloudCover = ({day}) => {
  let cloudCoverText;
  let boxStyle;
  if (day.cloudCover < 0.2) {
    cloudCoverText = <i style={{color: "black"}} className="wi wi-day-sunny" />;

    boxStyle = {
      borderTop: `${parseInt(
        Math.max(day.cloudCover * 120, 1),
        10,
      )}px solid #ffff00`,
      padding: 4,
      background: "#ffff00",
    };
  } else if (day.cloudCover < 0.7) {
    cloudCoverText = <i style={{color: "white"}} className="wi wi-cloud" />;
    boxStyle = {
      borderTop: `${parseInt(
        Math.max(day.cloudCover * 120, 1),
        10,
      )}px solid #555555`,
      padding: 4,
      background: "#555555",
    };
  } else {
    cloudCoverText = <i style={{color: "white"}} className="wi wi-cloud" />;
    boxStyle = {
      borderTop: `${parseInt(
        Math.max(day.cloudCover * 120, 1),
        10,
      )}px solid #000000`,
      padding: 4,
      background: "#000000",
    };
  }

  console.warn("ZZZZ cloud-cover.js", "boxStyle.borderTop", boxStyle.borderTop);

  return (
    <div
      style={{
        height: `${parseInt(1.0 * 150, 10) + 4 + 4 + 18}px`,
        background: "#fafafa",
      }}
    >
      <div style={boxStyle}>
        {cloudCoverText}
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
    </div>
  );
};

export default CloudCover;
