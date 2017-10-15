const temperatureOf = (data, hourFilter) => {
  if (!data) {
    return null;
  }

  if (hourFilter === 24) {
    return data.temperatureLow === undefined
      ? data.temperature
      : data.temperatureLow;
  }

  return data.temperatureHigh === undefined
    ? data.temperature
    : data.temperatureHigh;
};

export default temperatureOf;
