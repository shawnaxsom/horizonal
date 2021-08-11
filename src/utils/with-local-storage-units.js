export default (temp) => {
  const units = localStorage.getItem('units');
  if (units && units.toLowerCase() === "celsius") {
    temp = (temp - 32) * (5/9);
  }

  return temp;
}
