import calculateIndexValue from "utils/calculate-index-value";
import temperatureOf from "utils/temperature-of";

const minimumComfortable = 70;
const maximumComfortable = 85;

const calculateComfortIndex = (day, minimumHigh, maximumHigh, hourFilter) => {
  const temp = temperatureOf(day, hourFilter);

  const distanceFromMiddleTemperature = Math.abs(
    temp - (minimumHigh + (maximumHigh - minimumHigh) / 2),
  );

  const indexDistanceBelowComfort = calculateIndexValue(
    minimumComfortable - temp,
    25,
  );
  const indexDistanceAboveComfort = calculateIndexValue(
    temp - maximumComfortable,
    25,
  );
  const indexComfort = Math.min(
    indexDistanceAboveComfort,
    indexDistanceBelowComfort,
  );

  // const index = indexDistanceAboveComfort;

  const index =
    0.3 * calculateIndexValue(day.precipProbability, 0.5) +
    0.3 * indexComfort +
    0.2 * calculateIndexValue(day.cloudCover, 0.5) +
    0.15 * calculateIndexValue(day.windSpeed, 15) +
    0.05 * calculateIndexValue(distanceFromMiddleTemperature, 10);

  // const index =
  //   // 0.4 * indexComfort +
  //   // 0.3 * calculateIndexValue(day.precipProbability, 1) +
  //   // 0.2 * calculateIndexValue(day.cloudCover, 1);
  // // 0.1 * calculateIndexValue(distanceFromMiddleTemperature, 10);

  return index;
};

export default calculateComfortIndex;
