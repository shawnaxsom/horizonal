const DarkSky = require("forecast.io");

const latitude = 40.042815;
const longitude = -86.127489;

const options = {
  APIKey: process.env.DARKSKY_SECRET_ACCESS_KEY,
};
const darksky = new DarkSky(options);

module.exports.hello = (event, context, callback) => {
  console.warn("ZZZZ handler.js", "event", event);
  console.warn("ZZZZ handler.js", "context", context);
  darksky.get(latitude, longitude, function(err, res, data) {
    console.warn("ZZZZ handler.js", "err", err);
    console.warn("ZZZZ handler.js", "res", res);
    console.warn("ZZZZ handler.js", "data", data);
    // const response = {
    //   // statusCode: 200,
    //   // json: JSON.stringify(err),
    //   // json: {foo: "bar"},
    //   // body: JSON.stringify({
    //   //   message: data,
    //   // }),
    // };

    // callback(null, response);
    // callback(null, data);
    const response = {
      statusCode: 200,
      body: JSON.stringify(data),
    };

    callback(null, response);
  });

  // const response = {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     message: "Go Serverless v1.0! Your function executed successfully!",
  //     input: event,
  //   }),
  // };

  // callback(null, response);

  // // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
