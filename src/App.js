import React, {Component} from "react";

import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import groupBy from "lodash/groupBy";
import moment from "moment";

import DayForecast from "components/day-forecast";

import temperatureOf from "utils/temperature-of";

import "bulma/css/bulma.css";
import {Column, Columns, Field, Control, Input, Button} from "bloomer";

import "./App.css";
import "./css/weather-icons.min.css";
import mockForecast from "./mock-forecast.json";

const localTimeOffset = new Date().getTimezoneOffset() / 60;
// const localTimeOffset = 0;

const toLocalTime = hour => {
  if (hour === undefined || hour === null) {
    return hour;
  }

  return hour - localTimeOffset;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: mockForecast,
      address: "Westfield, IN",
    };
  }

  getForecast = async () => {
    this.setState({isLoading: true});
    // The fetch will get proxied to the proxy location in Package.json, avoiding CORS errors
    const response = await fetch(
      `${window.location.href}/dev/forecast?address=${encodeURI(
        this.state.address,
      )}`,
    );

    response.json().then(data => {
      this.setState({forecast: data, isLoading: false});
    });
  };

  render() {
    let dailyData = null;

    if (this.state.forecast) {
      if (!this.state.hourFilter) {
        dailyData = this.state.forecast.daily.data;
      } else {
        const hourlyData = this.state.forecast.hourly.data.map(hour => ({
          time: hour.time,
          ...hour,
        }));

        let hourlyByDay = Object.values(
          groupBy(hourlyData, hour => {
            const hourNumber = Math.floor(hour.time / (60 * 60));
            return Math.floor(toLocalTime(hourNumber) / 24);
          }),
        );

        hourlyByDay = hourlyByDay.map(day =>
          day.map(hour => {
            const d = new Date(0); // The 0 there is the key, which sets the date to the epoch
            d.setUTCSeconds(hour.time / 60 / 60 * 60 * 60);
            const dateNumber = d.getDate();
            const hourNumber = d.getHours();
            return {
              text: moment.unix(hour.time).toString(),
              dateNumber,
              hourNumber,
              ...hour,
            };
          }),
        );
        console.warn("ZZZZ App.js", "hourlyByDay", hourlyByDay);

        dailyData = hourlyByDay.map(day => {
          return day.filter(hour => {
            return (
              hour.hourNumber.toString() === this.state.hourFilter.toString()
            );
          });
        });

        // If current day is past the hour, it is probably undefined, get the high instead
        dailyData = dailyData.map(
          (day, index) =>
            day === undefined || day.length === 0
              ? [this.state.forecast.daily.data[index]]
              : day,
        );

        dailyData = dailyData.map(dayHours => dayHours[0]);

        console.warn("ZZZZ App.js", "dailyData", dailyData);

        dailyData = dailyData.filter(dayHours => dayHours);
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
      <Columns className="App" style={{margin: 0, padding: 0}}>
        <Column
          style={{
            position: "fixed",
            width: "100vw",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            flexWrap: "wrap",
            overflow: "visible",
            padding: 10,
            background: "#fff900",
            height: 100,
          }}
        >
          <Field hasAddons>
            <Control>
              <Input
                placeholder="Westfield, IN"
                value={this.state.address}
                onChange={event => this.setState({address: event.target.value})}
              />
            </Control>
            <Control>
              <Button
                isColor="info"
                isLoading={this.state.isLoading}
                render={props =>
                  <Column
                    onClick={this.getForecast}
                    style={{cursor: "pointer", padding: 0, margin: 0}}
                  >
                    <span {...props}>Forecast</span>
                  </Column>}
              />
            </Control>
          </Field>

          <div style={{width: "100%"}}>
            <Slider
              min={0}
              max={24}
              marks={{
                0: "ALL",
                4: "4",
                8: "8",
                10: "10",
                12: "12",
                14: "2",
                17: "5",
                19: "7",
                21: "9",
                24: "12",
              }}
              style={{height: 30, width: "unset", margin: "0 20px 20px"}}
              value={this.state.hourFilter}
              onChange={value => this.setState({hourFilter: value})}
            />
          </div>
        </Column>

        <Column
          style={{
            display: "flex",
            margin: "80px 0 0 0",
            overflow: "scroll",
            padding: 0,
            width: "100vw",
          }}
        >
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
        </Column>
      </Columns>
    );
  }
}

export default App;
