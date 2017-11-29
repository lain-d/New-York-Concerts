require("datejs");
require("marko/node-require").install();
require('marko/express');
var express = require("express");
var indexTemplate = require("./index.marko");
const config = require("./config").config;
var favicon = require("serve-favicon");
var path = require("path");
var http = require("http");
var app = express();
var port = process.env.PORT || 8080;
const ddd = {
  Id: 3064646,
  Date: Date.today(),
  Venue: {
    Id: 151240,
    Name: "Test's House",
    Address: "API Load Error",
    City: "New York",
    State: "New York",
    StateCode: "NY",
    Country: "US",
    CountryCode: "US",
    ZipCode: "10573",
    Url: "#",
    Latitude: 41.001397,
    Longitude: -73.6654978
  },
  Artists: [{ Id: 69, Name: "Jay" }],
  TicketUrl: "#"
};
const ddd2 = {
  Id: 3064646,
  Date: Date.today().add(1).days(),
  Venue: {
    Id: 151240,
    Name: "Aest's House",
    Address: "API Load Error",
    City: "New York",
    State: "New York",
    StateCode: "NY",
    Country: "US",
    CountryCode: "US",
    ZipCode: "10573",
    Url: "#",
    Latitude: 41.001397,
    Longitude: -73.6654978
  },
  Artists: [{ Id: 69, Name: "Xay" }],
  TicketUrl: "#"
};
const ddd3 = {
  Id: 3064646,
  Date: Date.today().add(3).days(),
  Venue: {
    Id: 151240,
    Name: "Txest's House",
    Address: "API Load Error",
    City: "New York",
    State: "New York",
    StateCode: "NY",
    Country: "US",
    CountryCode: "US",
    ZipCode: "10573",
    Url: "#",
    Latitude: 41.001397,
    Longitude: -73.6654978
  },
  Artists: [{ Id: 69, Name: "Bay" }],
  TicketUrl: "#"
};
var p = 0;
var redis = true;
var data = [];
var compression = require("compression");
if (config.redisURL) {
  var client = require("redis").createClient(config.redisURL);
  console.log("Server Starting Getting Cache From Redis");
  client.get("concertCache", function(err, reply) {
    data = JSON.parse(reply);
    client.quit();
  });
} else {
  console.log("no Redis attempting to get data from API");
  redis = false;
  getData(p);
}
app.use(compression());
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
function getData(page) {
  console.log("Getting Concert Info for page " + page);
  var api =
    "http://api.jambase.com/events?zipCode=" +
    config.zipCode +
    "&radius=" +
    config.radius +
    "&page=" +
    page +
    "&api_key=" +
    config.APIkey +
    "&o=json";
  http
    .get(api, function(res) {
      var body = "";
      res.on("data", function(chunk) {
        body += chunk;
      });
      res.on("end", function() {
        try {
          var result = JSON.parse(body);
          if (p === 0) {
            data = [];
          }
        } catch (e) {
          console.log("API Did not give results, probably hit API Limit :(");
          console.log(body);
          p = 50;
          var result = {};
          if (data.length < 1) {
            console.log("I've got no results, Filling Dummy Data for Testing");
            result.Events = [ddd, ddd2, ddd3, ddd2, ddd];
          } else {
            console.log("Displaying results for " + data.length + " events");
            result.Events = [];
          }
        }
        for (i = 0; i < result.Events.length; i++) {
          data.push(result.Events[i]);
        }
        p++;
        if (p <= 49) {
          getData(p);
        } else {
          p = 0;
          if (redis === true) {
              var client2 = require("redis").createClient(config.redisURL);
            client2.set("concertCache", JSON.stringify(data), function(){client2.quit();});
          }
        }
      });
    })
    .on("error", function(e) {
      console.log("Got an error: ", e);
    });
}
var ontime = require("ontime");
ontime(
  {
    cycle: ["12:00:00"]
  },
  function(ot) {
    console.log("Updating From API");
    getData(p);
    ot.done();
    return;
  }
);
var isProduction = process.env.NODE_ENV === 'production';
// Configure lasso to control how JS/CSS/etc. is delivered to the browser
require('lasso').configure({
    plugins: [
        'lasso-marko' // Allow Marko templates to be compiled and transported to the browser
    ],
    outputDir: __dirname + '/static', // Place all generated JS/CSS/etc. files into the "static" dir
    bundlingEnabled: isProduction, // Only enable bundling in production
    minify: isProduction, // Only minify JS and CSS code in production
    fingerprintsEnabled: isProduction, // Only add fingerprints to URLs in production
});
app.use(require('lasso/middleware').serveStatic());


app.get("/", function(req, res) {
  res.marko(indexTemplate, {
    events: data,
    city: config.cityName
  });
});
app.listen(port, function(){

console.log("server on port:" + port);
    if (process.send) {
        process.send('online');
}
});

