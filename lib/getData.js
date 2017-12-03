//This module gets the data from the Jambase API, after it gets all the pages it can (up to 50) invokes a callback with the data.
require("datejs");
const config = require("../config").config;
var favicon = require("serve-favicon");
var path = require("path");
var http = require("http");
//Dummy Data for testing if API doesn't respond.
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
    Url: "",
    Latitude: 41.001397,
    Longitude: -73.6654978
  },
  Artists: [{ Id: 69, Name: "Jay" }],
  TicketUrl: ""
};

//The Function
exports.getData = function(page, data, callback) {
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
        console.log("got reults");
        try {
          var result = JSON.parse(body);
          if (page === 0) {
            data = [];
          }
        } catch (e) {
          console.log("API Did not give results, probably hit API Limit :(");
          console.log(body);
          page = 50;
          var result = {};
          if (data.length < 1) {
            console.log(
              "I've got no results, Filling Dummy Data for Testing page is set at " +
                page
            );
            result.Events = [ddd];
          } else {
            console.log(
              "Got Last Event, Displaying results for " +
                data.length +
                " events"
            );
            result.Events = [];
          }
        }
        var aEvent;
        for (i = 0; i < result.Events.length; i++) {

         result.Events[i].Latitude = undefined;
          result.Events[i].Longitude =undefined;
          data.push(result.Events[i]);
        }
      
        page = page + 1;
        if (page <= 42) {
          module.exports.getData(page, data, callback);
        } else {
          if (config.redisURL) {
            var client2 = require("redis").createClient(config.redisURL);
            client2.set("concertCache", JSON.stringify(data), function() {
              console.log("Show Data Updatated at " + Date().toString());
              client2.quit();
              callback(data);
              });
          } else {
            console.log("Fake Show Data Created at " + Date().toString());
            callback(data);
          }
        }
      });
    })
    .on("error", function(e) {
      console.log("Got an error: ", e);
    });
};
