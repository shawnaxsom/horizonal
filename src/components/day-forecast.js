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
  dayFilter,
  hourFilter,
  setDayFilter,
}) => {
  const range = maximumHigh - minimumHigh;
  const temperature = temperatureOf(day, hourFilter);
  const dayOfWeek = getDayName(daysFromToday);

  const dayPanelStyle = {
    position: "relative",
    padding: 0,
    height: "calc(70% - 29px - 28px)",
    ...(day.precipProbability < 0.15 && day.cloudCover < 0.15
      ? {background: "#ffffcc"}
      : {background: "#ffffff"}),
    ...(day.cloudCover > 0.5 ? {background: "#f0f0f0"} : {}),
    ...(day.precipProbability > 0.5 ? {background: "#daeaff"} : {}),
    ...(!dayFilter && dayOfWeek === "Saturday"
      ? {borderLeft: "2px solid #555"}
      : {}),
    ...(!dayFilter && dayOfWeek === "Sunday"
      ? {
          borderRight: "2px solid #555",
        }
      : {}),
    ...(!dayFilter && (dayOfWeek === "Saturday" || dayOfWeek === "Sunday")
      ? {
          borderBottom: "2px dashed #ccc",
        }
      : {borderBottom: "2px solid #555"}),
  };

  return (
    <div
      style={{
        flexGrow: 1,
        minWidth: 70,
        overflow: "hidden",
        cursor: "pointer",
        height: "100%",
      }}
      onClick={() =>
        dayFilter
          ? setDayFilter(null)
          : setDayFilter(moment.unix(day.time).date())}
    >
      <CloudCover style={{height: "30%"}} day={day} />

      <DayNameHeader
        day={day}
        dayOfWeek={dayOfWeek}
        averageComfortIndex={averageComfortIndex}
        minimumHigh={minimumHigh}
        maximumHigh={maximumHigh}
        dayFilter={dayFilter}
        hourFilter={hourFilter}
      />
      <div style={dayPanelStyle}>
        <div style={{position: "relative", height: "50%"}}>
          <Temperature
            style={{
              position: "absolute",
              top: `${(maximumHigh - temperature) / range * 100}%`,
            }}
            averageHigh={averageHigh}
            day={day}
            hourFilter={hourFilter}
          />
        </div>

        <div
          style={{
            position: "relative",
            height: "50%",
          }}
        >
          <Precipitation day={day} />
        </div>
      </div>
      <WindSpeed day={day} />
    </div>
  );
};

export default DayForecast;
