import React from "react";

const CloudCover = ({ day, style }) => {
  let cloudCoverText;
  let boxStyle;

  if (day.cloudCover < 0.2) {
    cloudCoverText = (
      <i style={{ color: "#cca" }} className="wi wi-day-sunny" />
    );
    boxStyle = {
      background: "linear-gradient(to top, #ffd, #ff7, #ff5)",
    };
  } else if (day.cloudCover < 0.55) {
    cloudCoverText = (
      <i
        style={{ color: "white", mixBlendMode: "soft-light" }}
        className="wi wi-cloud"
      />
    );
    boxStyle = {
      background:
        "linear-gradient(to left top, #555555, #565557, #595557, #5b5557, #5e5555)",
    };
  } else {
    cloudCoverText = (
      <i
        style={{ color: "white", mixBlendMode: "soft-light" }}
        className="wi wi-cloud"
      />
    );
    boxStyle = {
      background:
        "linear-gradient(to left top, #333333, #343335, #363337, #383338, #3b3238)",
    };
  }

  return (
    <div style={{ ...style }}>
      <div
        style={{
          height: "100%",
          background: "#fafafa",
        }}
      >
        <div
          style={{
            ...boxStyle,
            borderRadius: "0 0 0.3em 0.3em",
            height: `${day.cloudCover * 100}%`,
            minHeight: 24,
            position: "relative",
            boxShadow: "inset 0px 2px 4px rgba(255, 155, 155, 0.05)",
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
                ...(day.cloudCover > 0.2
                  ? { color: "#ffc" }
                  : { color: "#774" }),
                ...(day.cloudCover > 0.55 ? { color: "#ffa" } : {}),
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
