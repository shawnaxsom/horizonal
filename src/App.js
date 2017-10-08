import React, {Component} from "react";
import moment from "moment";

import "./App.css";
import "./css/weather-icons.min.css";
import mockForecast from "./mock-forecast.json";

const getDayName = daysFromToday =>
  moment().add(daysFromToday, "days").format("dddd");

const DayForecast = ({day, daysFromToday, maximumHigh, averageHigh}) => {
  const dayOfWeek = getDayName(daysFromToday);
  return (
    <div style={{width: `${1024 / 7}px`}}>
      <div
        style={{
          height: `${parseInt(1.0 * 90, 10)}px`,
          background: "#fafafa",
        }}
      >
        <div
          style={{
            borderTop: `${parseInt(
              Math.max(day.cloudCover * 90, 1),
              10,
            )}px solid ${day.cloudCover < 0.2 ? "#ffff00" : "#000000"}`,
            background: day.cloudCover < 0.2 ? "#ffff00" : "#000000",
          }}
        >
          {day.cloudCover < 0.2
            ? <i style={{color: "black"}} className="wi wi-day-sunny" />
            : <i style={{color: "white"}} className="wi wi-cloud" />}
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
          height: `${300 - (maximumHigh - day.temperatureHigh) * 7}px`,
          paddingTop: `${(maximumHigh - day.temperatureHigh) * 7}px`,
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
            day.temperatureHigh > averageHigh
              ? {background: "#ffcccc"}
              : {background: "#ccccff"}
          }
        >
          High: {day.temperatureHigh}
        </div>
        <div>
          Low: {day.temperatureLow}
        </div>
        {day.precipProbability > 0.2 &&
          <div
            style={{
              position: "absolute",
              width: "100%",
              borderLeft: 0,
              borderRight: 0,
              borderBottom: 0,
              borderTop: `${day.precipProbability * 120 - 10}px solid #ccccff`,
              bottom: 0,
              background: "#ccccff",
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
      address: "Indianapolis, IN",
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
    const dailyData = this.state.forecast
      ? this.state.forecast.daily.data
      : null;
    const averageHigh = !dailyData
      ? 0
      : dailyData.reduce((prev, data) => prev + data.temperatureHigh, 0) /
        dailyData.length;

    const maximumHigh = !dailyData
      ? 0
      : dailyData.reduce(
          (prev, data) => Math.max(prev, data.temperatureHigh),
          -999,
        );

    const averagePop = !dailyData
      ? 0
      : dailyData.reduce((prev, data) => prev + data.precipProbability, 0) /
        dailyData.length;

    return (
      <div className="App">
        <div style={{display: "flex", margin: 10}}>
          <div style={{marginLeft: 20, marginRight: 10}}>Address:</div>
          <input
            type="text"
            value={this.state.address}
            onChange={event => this.setState({address: event.target.value})}
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
            this.state.forecast.daily.data.map((day, daysFromToday) =>
              <DayForecast
                day={day}
                daysFromToday={daysFromToday}
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
