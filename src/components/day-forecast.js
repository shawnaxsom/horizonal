import React from "react";

import moment from "moment";

import CloudCover from "components/cloud-cover";
import DayNameHeader from "components/day-name-header";
import Precipitation from "components/precipitation";
import Temperature from "components/temperature";
import WindSpeed from "components/wind-speed";

import temperatureOf from "utils/temperature-of";

const getDayName = daysFromToday =>
  moment()
    .add(daysFromToday, "days")
    .format("dddd");

const DayForecast = ({
  day,
  daysFromToday,
  isNow,
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
  const percentDistanceFromHigh = (maximumHigh - temperature) / range;
  const temperatureHeight = 12;

  const dayPanelStyle = {
    position: "relative",
    padding: 1,
    height: "calc(70% - 29px - 28px)",
    ...(day.precipProbability < 0.15 && day.cloudCover < 0.15
      ? { background: "#ffffcc" }
      : { background: "#ffffff" }),
    ...(day.cloudCover > 0.5 ? { background: "#f4f8f7" } : {}),
    ...(day.precipProbability > 0.5
      ? { background: "rgba(242, 248, 255)" }
      : {}),
    ...(!dayFilter && dayOfWeek === "Saturday"
      ? { borderLeft: "1px solid rgb(109, 119, 120)" }
      : {}),
    ...(!dayFilter && dayOfWeek === "Sunday"
      ? {
          borderRight: "1px solid rgb(109, 119, 120)",
        }
      : {}),
    ...(!dayFilter && (dayOfWeek === "Saturday" || dayOfWeek === "Sunday")
      ? {
          borderBottom: "1px dashed #ccc",
        }
      : { borderBottom: "1px solid rgb(209, 219, 220)" }),
    ...(isNow
      ? {
          zIndex:2222,
          padding: 4
        }
      : {}),
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
          : setDayFilter(moment.unix(day.time).date())
      }
    >
      <CloudCover style={{ height: "30%" }} day={day} />

      <DayNameHeader
        day={day}
        dayOfWeek={dayOfWeek}
        averageComfortIndex={averageComfortIndex}
        minimumHigh={minimumHigh}
        maximumHigh={maximumHigh}
        dayFilter={dayFilter}
        hourFilter={hourFilter}
        isNow={isNow}
      />
      <div style={dayPanelStyle}>
        <div style={{ position: "relative", height: "50%" }}>
          <Temperature
            style={{
              position: "absolute",
              top: `calc(${percentDistanceFromHigh *
                100}% - ${percentDistanceFromHigh *
                (temperatureHeight * 2)}px)`,
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
          <Precipitation
            data={day}
            dayFilter={dayFilter}
            hourFilter={hourFilter}
          />
        </div>
      </div>
      <WindSpeed day={day} />
    </div>
  );
};

export default DayForecast;
