const calculateIndexValue = (value, max) =>
  100 * ((max - Math.min(Math.max(0, value), max)) / max);

export default calculateIndexValue;
