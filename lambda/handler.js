const DarkSky = require("forecast.io");

const googleMapsClient = require("@google/maps").createClient({
  key: process.env.GOOGLE_MAPS_SECRET_ACCESS_KEY,
});

const geocode = function(address, cb) {
  const query = {
    address,
  };

  googleMapsClient.geocode(query, cb);
};

const darksky = new DarkSky({
  APIKey: process.env.DARKSKY_SECRET_ACCESS_KEY,
});

module.exports.hello = function(event, context, callback) {
  geocode(event.queryStringParameters.address, function(err, response) {
    const results =
      response.json.results &&
      response.json.results.length > 0 &&
      response.json.results[0];

    if (!results || !results.geometry) {
      const response = {
        statusCode: 200,
        body: JSON.stringify({}),
      };
      callback(null, response);
    }
    const latitude = results.geometry.location.lat;
    const longitude = results.geometry.location.lng;
    const options = {
      exclude: "minutely,flags,alerts",
      extend: "hourly",
    };

    darksky.get(latitude, longitude, options, function(err, res, data) {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(data),
      });
    });
  });
};
