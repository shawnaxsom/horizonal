import React from "react";

const CloudCover = ({day, style}) => {
  let cloudCoverText;
  let boxStyle;

  if (day.cloudCover < 0.2) {
    cloudCoverText = <i style={{color: "black"}} className="wi wi-day-sunny" />;
    boxStyle = {
      background: "#ff8",
    };
  } else if (day.cloudCover < 0.55) {
    cloudCoverText = <i style={{color: "white"}} className="wi wi-cloud" />;
    boxStyle = {
      background: "#888",
    };
  } else {
    cloudCoverText = <i style={{color: "white"}} className="wi wi-cloud" />;
    boxStyle = {
      background: "#444",
    };
  }

  return (
    <div style={{...style}}>
      <div
        style={{
          height: "100%",
          background: "#fafafa",
        }}
      >
        <div
          style={{
            ...boxStyle,
            borderRadius: "0 0 0.25em 0.25em",
            height: `${day.cloudCover * 100}%`,
            minHeight: 24,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              paddingBottom: 2,
            }}
          >
            {cloudCoverText}
            <div
              style={{
                display: "inline-block",
                marginLeft: 10,
                ...(day.cloudCover > 0.2 ? {color: "#ffc"} : {color: "#444"}),
                ...(day.cloudCover > 0.55 ? {color: "#ffa"} : {}),
              }}
            >
              {Math.round(day.cloudCover * 100, 0)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudCover;
