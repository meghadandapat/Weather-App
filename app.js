const express = require("express");
const https = require("https");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.listen(3000, function () {
  console.log("server started");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "32e0b925fc2a58b954c1f2bff00e70be";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey;

  https.get(url, function (response) {
    // console.log(response);
    response.on("data", function (data) {
      //   console.log(JSON.parse(data));
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      //There can be only one res.send but multiple res.write

      res.write("<h1>The weather is currently " + description + "</h1>");
      res.write(
        "<h3>The temperature in " + query + " is " + temp + " Kelvin</h3>"
      );
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});
