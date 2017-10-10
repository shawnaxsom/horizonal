const temperatureOf = data => {
  if (!data) {
    return null;
  }
  return data.temperatureHigh === undefined
    ? data.temperature
    : data.temperatureHigh;
};

export default temperatureOf;
