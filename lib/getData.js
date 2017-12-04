//This module gets the data from the Jambase API, after it gets all the pages it can (up to 50) invokes a callback with the data.
require("datejs");
const config = require("../config").config;
var favicon = require("serve-favicon");
var path = require("path");
var http = require("http");
//Dummy Data for testing if API doesn't respond.
var ddd = {
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
  TicketUrl: "crispy"
};
//The Function
exports.getData = function(page, datac, zip, cache, callback) {
  console.log("Getting Concert Info for page " + page);
  var api =
    "http://api.jambase.com/events?zipCode=" +
    zip +
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
            datac = [];
          }
        } catch (e) {
          console.log("API Did not give results, probably hit API Limit :(");
          console.log(body);
          page = 50;
          var result = {};
          if (datac.length < 1) {
            console.log(
              "I've got no results, Filling Dummy Data for Testing page is set at " +
                page
            );
            result.Events = [JSON.parse(JSON.stringify(ddd)),JSON.parse(JSON.stringify(ddd)),JSON.parse(JSON.stringify(ddd)),JSON.parse(JSON.stringify(ddd))];
          } else {
            console.log(
              "Got Last Event, Displaying results for " +
                datac.length +
                " events"
            );
            result.Events = [];
          }
        }
        result.Events.map((theEvent) =>{
          console.log("event minify");
          delete theEvent.Id;
          delete theEvent.Venue.Id;
          delete theEvent.Venue.State;
          delete theEvent.Venue.Country;
          delete theEvent.Venue.CountryCode;
          if (theEvent.Venue.Url == "") {
            delete theEvent.Venue.Url;
          }
          theEvent.Artists.map((art)=>{
            delete art.Id;
            art.N = art.Name;
            delete art.Name;
          });
          delete theEvent.Venue.Latitude;
          delete theEvent.Venue.Longitude;
          if (theEvent.TicketUrl == "") {
            delete theEvent.TicketUrl;
          }
          theEvent.V = theEvent.Venue;
          theEvent.D = theEvent.Date;
          theEvent.TU = theEvent.TicketUrl;
          theEvent.A = theEvent.Artists;
          theEvent.V.SC = theEvent.V.StateCode;
          theEvent.V.Ad = theEvent.V.Address;
          theEvent.V.N = theEvent.V.Name;
          theEvent.V.C = theEvent.V.City;
          delete theEvent.Venue;
          delete theEvent.Date;
          delete theEvent.V.City;
          delete theEvent.V.Name;
          delete theEvent.Artists;
          delete theEvent.V.StateCode;
          delete theEvent.V.Address;
          delete theEvent.TicketUrl;
          delete theEvent.V.ZipCode;
          datac.push(theEvent);
        })
        page = page + 1;
        if (page <= 42) {
          module.exports.getData(page, datac, zip, cache, callback);
        } else {
          if (config.redisURL) {
            var client2 = require("redis").createClient(config.redisURL);
            client2.set(cache, JSON.stringify(datac), function() {
              console.log("Show Data Updatated at " + Date().toString());
              client2.quit();
              callback(datac);
            });
          } else {
            console.log("Fake Show Data Created at " + Date().toString());
            callback(datac);
          }
        }
      });
    })
    .on("error", function(e) {
      console.log("Got an error: ", e);
    });
};
