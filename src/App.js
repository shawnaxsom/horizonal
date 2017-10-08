import React, {Component} from "react";
import moment from "moment";

import "./App.css";

import "rc-slider/assets/index.css";
import Slider from "rc-slider";

import "./css/weather-icons.min.css";
import mockForecast from "./mock-forecast.json";

import groupBy from "lodash/groupBy";

const getDayName = daysFromToday =>
  moment().add(daysFromToday, "days").format("dddd");

const localTimeOffset = new Date().getTimezoneOffset() / 60;

const within24Hours = hour => {
  if (hour > 24) {
    return hour % 24;
  } else if (hour < 0) {
    return hour + 24;
  }

  return hour;
};

const fromLocalTime = hour => {
  if (hour === undefined || hour === null) {
    return hour;
  }

  return hour + localTimeOffset;
};

const toLocalTime = hour => {
  if (hour === undefined || hour === null) {
    return hour;
  }

  return hour - localTimeOffset;
};

const temperatureOf = data => {
  if (!data) {
    return null;
  }
  return data.temperatureHigh === undefined
    ? data.temperature
    : data.temperatureHigh;
};

const DayForecast = ({day, daysFromToday, maximumHigh, averageHigh}) => {
  const dayOfWeek = getDayName(daysFromToday);
  return (
    <div style={{flexGrow: 1}}>
      <div
        style={{
          height: `${parseInt(1.0 * 150, 10)}px`,
          background: "#fafafa",
        }}
      >
        <div
          style={{
            borderTop: `${parseInt(
              Math.max(day.cloudCover * 150, 1),
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
      </div>
      <div
        style={{
          border: "thin solid black",
          ...(dayOfWeek === "Saturday" || dayOfWeek === "Sunday"
            ? {
                color: "white",
                background: "black",
              }
            : {
                color: "black",
                background: "white",
              }),
        }}
      >
        {dayOfWeek}
      </div>
      <div
        style={{
          position: "relative",
          padding: 0,
          height: `${300 - (maximumHigh - temperatureOf(day)) * 7}px`,
          paddingTop: `${(maximumHigh - temperatureOf(day)) * 7}px`,
          ...(dayOfWeek === "Saturday" || dayOfWeek === "Sunday"
            ? {background: "#fafafa"}
            : {}),
          ...(dayOfWeek === "Saturday"
            ? {borderLeft: "thin solid #cccccc"}
            : {}),
          ...(dayOfWeek === "Sunday"
            ? {borderRight: "thin solid #cccccc"}
            : {}),
        }}
      >
        <div
          style={
            temperatureOf(day) > averageHigh
              ? {background: "#ffcccc"}
              : {background: "#ccccff"}
          }
        >
          {Math.round(temperatureOf(day), 0)}
        </div>
        {day.precipProbability > 0.2 &&
          <div
            style={{
              position: "absolute",
              width: "100%",
              borderLeft: 0,
              borderRight: 0,
              borderBottom: 0,
              borderTop: `${day.precipProbability * 120 - 10}px solid #aaccff`,
              bottom: 0,
              background: "#aaccff",
            }}
          >
            <i className="wi wi-rain" />
            <div style={{display: "inline-block", marginLeft: 10}}>
              {Math.round(day.precipProbability * 100, 0)}%
            </div>
          </div>}
      </div>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: mockForecast,
      address: "Westfield, IN",
    };
  }

  getForecast = () => {
    fetch(
      `https://xtzt76pisd.execute-api.us-east-1.amazonaws.com/dev/forecast?address=${encodeURI(
        this.state.address,
      )}`,
    ).then(response =>
      response.json().then(data => {
        this.setState({forecast: data});
      }),
    );
  };

  render() {
    let dailyData = null;

    if (this.state.forecast) {
      if (!this.state.hourFilter) {
        console.warn("ZZZZ App.js", "Using dailies");
        dailyData = this.state.forecast.daily.data;
      } else {
        console.warn(
          "ZZZZ App.js",
          "this.state.hourFilter",
          this.state.hourFilter,
        );
        const hourlyData = this.state.forecast.hourly.data.map(hour => ({
          time: toLocalTime(hour.time),
          ...hour,
        }));

        const hourlyByDay = Object.values(
          groupBy(hourlyData, hour => {
            return Math.floor(hour.time / (60 * 60 * 24));
          }),
        );

        console.warn("ZZZZ App.js", "hourlyByDay", hourlyByDay[3]);

        dailyData = hourlyByDay.map(day => {
          return day.filter(hour => {
            var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
            d.setUTCSeconds(fromLocalTime(hour.time / 60 / 60) * 60 * 60);
            return d.getHours().toString() === this.state.hourFilter.toString();
          });
        });

        // Issue is before this
        console.warn("ZZZZ App.js", "dailyData 1", dailyData[3][0]);

        // If current day is past the hour, it is probably undefined, get the high instead
        dailyData = dailyData.map(
          (day, index) =>
            day === undefined || day.length === 0
              ? [this.state.forecast.daily.data[index]]
              : day,
        );

        dailyData = dailyData.map(dayHours => dayHours[0]);

        console.warn("ZZZZ App.js", "dailyData 2", dailyData[3]);
        console.warn("ZZZZ App.js", "dailyDataTime", dailyData[3].time);
      }
    }

    const averageHigh = !dailyData
      ? 0
      : dailyData.reduce((prev, data) => prev + temperatureOf(data), 0) /
        dailyData.length;

    const maximumHigh = !dailyData
      ? 0
      : dailyData.reduce(
          (prev, data) => Math.max(prev, temperatureOf(data)),
          -999,
        );

    const averagePop = !dailyData
      ? 0
      : dailyData.reduce((prev, data) => prev + data.precipProbability, 0) /
        dailyData.length;

    return (
      <div className="App">
        <div style={{display: "flex", padding: 10, background: "#fff900"}}>
          <div style={{marginLeft: 20, marginRight: 10}}>Address:</div>
          <input
            type="text"
            value={this.state.address}
            onChange={event => this.setState({address: event.target.value})}
          />

          <Slider
            min={0}
            max={24}
            marks={{
              0: "ALL",
              4: "4 am",
              8: "8 am",
              10: "10 am",
              12: "NOON",
              14: "2 pm",
              17: "5 pm",
              19: "7 pm",
              21: "9 pm",
              24: "12 pm",
            }}
            style={{margin: "0 20px"}}
            value={this.state.hourFilter}
            onChange={value => this.setState({hourFilter: value})}
          />

          <button
            onClick={this.getForecast}
            style={{marginLeft: 20, marginRight: 10}}
          >
            Get Forecast
          </button>
        </div>

        <div style={{display: "flex"}}>
          {this.state.forecast &&
            dailyData.map((day, key) =>
              <DayForecast
                key={key}
                day={day}
                daysFromToday={key}
                maximumHigh={maximumHigh}
                averageHigh={averageHigh}
                averagePop={averagePop}
              />,
            )}
        </div>
      </div>
    );
  }
}

export default App;
