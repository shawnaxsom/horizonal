import React, {Component} from "react";

import "rc-slider/assets/index.css";
import groupBy from "lodash/groupBy";
import moment from "moment";

import DayForecast from "components/day-forecast";
import Header from "components/header";
import Footer from "components/footer";

import calculateComfortIndex from "utils/calculate-comfort-index";
import temperatureOf from "utils/temperature-of";

import {Column, Columns} from "bloomer";

import mockForecast from "mock-forecast.json";

const useMockForecast = true;

const localTimeOffset = new Date().getTimezoneOffset() / 60;

const toLocalTime = hour => {
  if (hour === undefined || hour === null) {
    return hour;
  }

  return hour - localTimeOffset;
};

const getDailyData = ({forecast, hourFilter}) => {
  let dailyData = null;

  if (forecast) {
    if (!hourFilter) {
      dailyData = forecast.daily.data;
    } else {
      const hourlyData = forecast.hourly.data.map(hour => ({
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

      dailyData = hourlyByDay.map(day => {
        return day.filter(hour => {
          return hour.hourNumber.toString() === hourFilter.toString();
        });
      });

      // If current day is past the hour, it is probably undefined, get the high instead
      dailyData = dailyData.map(
        (day, index) =>
          day === undefined || day.length === 0
            ? [forecast.daily.data[index]]
            : day,
      );

      dailyData = dailyData.map(dayHours => dayHours[0]);

      dailyData = dailyData.filter(dayHours => dayHours);
    }
  }

  return dailyData;
};

class WeekView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "Westfield, IN",
      hourFilter: null,
      forecast: useMockForecast ? mockForecast : null,
    };
  }

  getForecast = async () => {
    this.setState({isLoading: true});
    // The fetch will get proxied to the proxy location in Package.json, avoiding CORS errors
    const response = await fetch(
      `https://xtzt76pisd.execute-api.us-east-1.amazonaws.com/dev/forecast?address=${encodeURI(
        this.state.address,
      )}`,
    );

    response.json().then(data => {
      this.setState({forecast: data, isLoading: false});
    });
  };

  render() {
    const dailyData = getDailyData(this.state);

    const averageHigh = !dailyData
      ? 0
      : dailyData.reduce((prev, data) => prev + temperatureOf(data), 0) /
        dailyData.length;

    const minimumHigh = !dailyData
      ? 0
      : dailyData.reduce(
          (prev, data) => Math.min(prev, temperatureOf(data)),
          999,
        );

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

    const averageComfortIndex = !dailyData
      ? 0
      : dailyData.reduce(
          (prev, data) =>
            prev +
            calculateComfortIndex(
              data,
              minimumHigh,
              maximumHigh,
            ),
          0,
        ) / dailyData.length;

    console.warn(
      "ZZZZ week-view.js",
      "averageComfortIndex",
      averageComfortIndex,
    );

    return [
      <Columns className="App" style={{margin: 0, padding: 0}}>
        <Header
          address={this.state.address}
          getForecast={this.getForecast}
          hourFilter={this.state.hourFilter}
          isLoading={this.state.isLoading}
          setAddress={address => this.setState({address})}
          setHourFilter={hourFilter => this.setState({hourFilter})}
        />

        <Column
          style={{
            display: "flex",
            width: "100vw",
            height: "calc(100%-100px)",
            margin: "100px auto auto auto",
            overflow: "scroll",
            padding: 0,
          }}
        >
          {this.state.forecast &&
            dailyData &&
            dailyData.map((day, key) =>
              <DayForecast
                key={key}
                day={day}
                daysFromToday={key}
                minimumHigh={minimumHigh}
                maximumHigh={maximumHigh}
                averageComfortIndex={averageComfortIndex}
                averageHigh={averageHigh}
                averagePop={averagePop}
              />,
            )}
        </Column>
      </Columns>,
      <Footer />,
    ];
  }
}

export default WeekView;
