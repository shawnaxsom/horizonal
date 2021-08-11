import withLocalStorageUnits from "./with-local-storage-units";

const temperatureOf = (data, hourFilter) => {
  if (!data) {
    return null;
  }

  let temp;

  if (hourFilter === 24) {
    temp = data.temperatureLow === undefined
      ? data.temperature
      : data.temperatureLow;
  } else {
    temp = data.temperatureHigh === undefined
      ? data.temperature
      : data.temperatureHigh;
  }

  return withLocalStorageUnits(temp);
};

export default temperatureOf;
