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
  TicketUrl: "crispy"
};

//The Function
exports.getData = function(page, data, zip, cache, callback) {
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


    delete result.Events[i].Id;
    delete result.Events[i].Venue.Id;
    delete result.Events[i].Venue.State;
    delete result.Events[i].Venue.Country;
    delete result.Events[i].Venue.CountryCode;
    if(result.Events[i].Venue.Url == "")
    {
      delete result.Events[i].Venue.Url
    }
    for(z=0;z<result.Events[i].Artists.length;z++)
    {
      delete result.Events[i].Artists[z].Id
      result.Events[i].Artists[z].N = result.Events[i].Artists[z].Name;
      delete result.Events[i].Artists[z].Name;
    }
    delete result.Events[i].Venue.Latitude;
      delete result.Events[i].Venue.Longitude;
      if(result.Events[i].TicketUrl == "")
      {
        delete result.Events[i].TicketUrl;
      }
      result.Events[i].V=result.Events[i].Venue;
      result.Events[i].D=result.Events[i].Date;
      result.Events[i].TU=result.Events[i].TicketUrl;
      result.Events[i].A=result.Events[i].Artists;
      result.Events[i].V.SC=result.Events[i].V.StateCode;
      result.Events[i].V.Ad=result.Events[i].V.Address;
      result.Events[i].V.N=result.Events[i].V.Name;
      result.Events[i].V.C=result.Events[i].V.City;
      delete result.Events[i].Venue;
      delete result.Events[i].Date;
      delete result.Events[i].V.City;
      delete result.Events[i].V.Name;
      delete result.Events[i].Artists;
      delete result.Events[i].V.StateCode;
      delete result.Events[i].V.Address;
      delete result.Events[i].TicketUrl;
      delete result.Events[i].V.ZipCode;
     
          data.push(result.Events[i]);
        }
      
        page = page + 1;
        if (page <= 42) {
          module.exports.getData(page, data, zip, cache, callback);
        } else {
          if (config.redisURL) {
            var client2 = require("redis").createClient(config.redisURL);
            client2.set(cache, JSON.stringify(data), function() {
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
