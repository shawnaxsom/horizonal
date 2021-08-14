import groupBy from "lodash/groupBy";
import moment from "moment";

import calculateComfortIndex from "utils/calculate-comfort-index";
import temperatureOf from "utils/temperature-of";

const localTimeOffset = new Date().getTimezoneOffset() / 60;

const toLocalTime = hour => {
  if (hour === undefined || hour === null) {
    return hour;
  }

  return hour - localTimeOffset;
};

const parseForecastData = ({forecast, dayFilter, hourFilter}) => {
  let dailyData = null;

  let currentTemperature;

  if (forecast) {
    currentTemperature = forecast.currently.temperature;

    if (dayFilter || hourFilter) {
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

      if (dayFilter) {
        dailyData = hourlyByDay.filter(d => d[0].dateNumber === dayFilter)[0];
        dailyData = dailyData.filter(hour => {
          return hour.hourNumber > 5;
        });
      } else if (hourFilter) {
        dailyData = hourlyByDay.map(day => {
          return day.filter(hour => {
            return hour.hourNumber.toString() === hourFilter.toString();
          });
        });
      }

      // If current day is past the hour, it is probably undefined, get the high instead
      dailyData = dailyData.map(
        (day, index) =>
          day === undefined || day.length === 0
            ? [forecast.daily.data[index]]
            : day,
      );

      if (!dayFilter) {
        dailyData = dailyData.map(dayHours => dayHours[0]);
      }

      dailyData = dailyData.filter(dayHours => dayHours);
    } else {
      dailyData = forecast.daily.data;
    }
  }

  const averageHigh = !dailyData
    ? 0
    : dailyData.reduce(
        (prev, data) => prev + temperatureOf(data, hourFilter),
        0,
      ) / dailyData.length;

  const minimumHigh = !dailyData
    ? 0
    : dailyData.reduce(
        (prev, data) => Math.min(Math.min(prev, temperatureOf(data, hourFilter)), forecast.currently.temperature),
        999,
      );

  const maximumHigh = !dailyData
    ? 0
    : dailyData.reduce(
        (prev, data) => Math.max(prev, temperatureOf(data, hourFilter)),
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
          prev + calculateComfortIndex(data, minimumHigh, maximumHigh),
        0,
      ) / dailyData.length;

  return {
    currentTemperature,
    currently: forecast && forecast.currently,
    dailyData,
    averageHigh,
    minimumHigh,
    maximumHigh,
    averagePop,
    averageComfortIndex,
  };
};

export default parseForecastData;
