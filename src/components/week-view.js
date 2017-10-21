import React, {Component} from "react";

import "rc-slider/assets/index.css";

import DayForecast from "components/day-forecast";
import Header from "components/header";
import Footer from "components/footer";

import getForecastData from "utils/get-forecast-data";

import {Column, Columns} from "bloomer";

import mockForecast from "mock-forecast.json";

const useMockForecast = false;

class WeekView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "Westfield, IN",
      dayFilter: null,
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

  componentWillMount() {
    if (!useMockForecast) {
      this.getForecast();
    }
  }

  render() {
    const data = getForecastData(this.state);

    return [
      <Columns className="App" style={{maxWidth: 1280, margin: 0, padding: 0}}>
        <Header
          address={this.state.address}
          getForecast={this.getForecast}
          hourFilter={this.state.hourFilter}
          isLoading={this.state.isLoading}
          setAddress={address => this.setState({address})}
          setDayFilter={dayFilter => this.setState({dayFilter})}
          setHourFilter={hourFilter => this.setState({hourFilter})}
        />

        <Column
          style={{
            display: "flex",
            width: "100vw",
            height: "calc(100vh - 125px)",
            maxHeight: 650,
            margin: "100px auto 0",
            overflowX: "scroll",
            padding: 0,
          }}
        >
          {this.state.forecast &&
            data.dailyData &&
            data.dailyData.map((day, key) =>
              <DayForecast
                key={key}
                day={day}
                daysFromToday={key}
                minimumHigh={data.minimumHigh}
                maximumHigh={data.maximumHigh}
                averageComfortIndex={data.averageComfortIndex}
                averageHigh={data.averageHigh}
                averagePop={data.averagePop}
                dayFilter={this.state.dayFilter}
                hourFilter={this.state.hourFilter}
                setDayFilter={dayFilter => this.setState({dayFilter})}
              />,
            )}
        </Column>
      </Columns>,
      <Footer />,
    ];
  }
}

export default WeekView;
