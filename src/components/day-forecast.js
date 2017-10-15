import React from "react";

import moment from "moment";

import CloudCover from "components/cloud-cover";
import DayNameHeader from "components/day-name-header";
import Precipitation from "components/precipitation";
import Temperature from "components/temperature";
import WindSpeed from "components/wind-speed";

import temperatureOf from "utils/temperature-of";

const getDayName = daysFromToday =>
  moment().add(daysFromToday, "days").format("dddd");

const DayForecast = ({
  day,
  daysFromToday,
  minimumHigh,
  maximumHigh,
  averageComfortIndex,
  averageHigh,
  hourFilter,
}) => {
  const dayOfWeek = getDayName(daysFromToday);
  const dayPanelStyle = {
    position: "relative",
    padding: 0,
    height: "300px",
    paddingTop: `${(maximumHigh - temperatureOf(day, hourFilter)) * 7}px`,
    ...(day.precipProbability < 0.15 && day.cloudCover < 0.15
      ? {background: "#ffffcc"}
      : {}),
    ...(day.cloudCover > 0.5 ? {background: "#f0f0f0"} : {}),
    ...(day.precipProbability > 0.5 ? {background: "#daeaff"} : {}),
    ...(dayOfWeek === "Saturday" ? {borderLeft: "2px solid #555"} : {}),
    ...(dayOfWeek === "Sunday"
      ? {
          borderRight: "2px solid #555",
        }
      : {}),
    ...(dayOfWeek === "Saturday" || dayOfWeek === "Sunday"
      ? {
          borderBottom: "2px dashed #ccc",
        }
      : {borderBottom: "2px solid #555"}),
  };

  return (
    <div style={{flexGrow: 1}}>
      <CloudCover day={day} />

      <DayNameHeader
        day={day}
        dayOfWeek={dayOfWeek}
        averageComfortIndex={averageComfortIndex}
        minimumHigh={minimumHigh}
        maximumHigh={maximumHigh}
        hourFilter={hourFilter}
      />
      <div style={dayPanelStyle}>
        <Temperature
          averageHigh={averageHigh}
          day={day}
          hourFilter={hourFilter}
        />
        <Precipitation day={day} />
      </div>
      <WindSpeed day={day} />
    </div>
  );
};

export default DayForecast;
