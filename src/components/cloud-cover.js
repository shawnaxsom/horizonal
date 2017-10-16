import React from "react";

const cloudCoverHeight = 72;

const CloudCover = ({day}) => {
  let cloudCoverText;
  let boxStyle;
  if (day.cloudCover < 0.2) {
    cloudCoverText = <i style={{color: "black"}} className="wi wi-day-sunny" />;

    boxStyle = {
      borderTop: `${parseInt(
        Math.max(day.cloudCover * cloudCoverHeight, 1),
        10,
      )}px solid #ffff00`,
      padding: 4,
      background: "#ffff00",
    };
  } else if (day.cloudCover < 0.55) {
    cloudCoverText = <i style={{color: "white"}} className="wi wi-cloud" />;
    boxStyle = {
      borderTop: `${parseInt(
        Math.max(day.cloudCover * cloudCoverHeight, 1),
        10,
      )}px solid #888`,
      padding: 4,
      background: "#888",
    };
  } else {
    cloudCoverText = <i style={{color: "white"}} className="wi wi-cloud" />;
    boxStyle = {
      borderTop: `${parseInt(
        Math.max(day.cloudCover * cloudCoverHeight, 1),
        10,
      )}px solid #444`,
      padding: 4,
      background: "#444",
    };
  }

  return (
    <div
      style={{
        height: `${parseInt(1.0 * (cloudCoverHeight + 30), 10) + 4 + 4 + 18}px`,
        background: "#fafafa",
      }}
    >
      <div
        style={{
          ...boxStyle,
          borderRadius: "0 0 0.3em 0.3em",
        }}
      >
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
