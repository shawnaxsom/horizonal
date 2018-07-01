import React from "react";

const Precipitation = ({ data, dayFilter, hourFilter }) => {
  const isHourly = !!dayFilter || !!hourFilter;

  const minFilter = isHourly ? 0.05 : 0.1;
  if (data.precipProbability < minFilter) {
    return null;
  }

  let height = data.precipProbability * 100;
  if (isHourly) {
    height = (height + (Math.log(height) / Math.log(100)) * 100) / 2;
  }

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        left: 0,
        right: 0,
        bottom: 0,
        fontSize: "0.95em",
        height: `${height}%`,
        minHeight: 24,
        color: "#00a",
        background: "#abf",
        ...(data.precipProbability > 0.15
          ? { background: "#bbf" }
          : { background: "#aae" }),
        ...(data.precipProbability > 0.3 ? { background: "#dbf" } : {}),
        borderRadius: "0.2em 0.2em 0 0",
        paddingTop: 2,
      }}
    >
      <i className="wi wi-rain" />
      <div style={{ display: "inline-block", marginLeft: 10 }}>
        {Math.round(data.precipProbability * 100, 0)}%
      </div>
    </div>
  );
};

export default Precipitation;
