//This module gets the data from the Jambase API, after it gets all the pages it can (up to 50) invokes a callback with the data.
require('datejs');
const config = require('../config').config;
var favicon = require('serve-favicon');
var path = require('path');
var http = require('http');
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

function showList(zipCode, cacheName, callback) {
  this.theShowList = [];
  this.dataReady = false;
  this.zip = zipCode;
  this.cache = cacheName;
  if (config.redisURL) {
    var client = require('redis').createClient(config.redisURL);
    console.log('Server Starting Getting Cache From Redis');
    client.get('concertCache', (err, reply) => {
      this.theShowList = JSON.parse(reply);
      console.log('Data Loaded from Cache, Closing Redis');
      client.quit();
    });
  } else {
    console.log('no Redis');
    this.theShowList = [];
    callback.call(this);
  }
}

showList.prototype.update = function update() {
  //The Function
  var getData = (page) => {
    console.log('Getting Concert Info for page ' + page);
    var api =
      'http://api.jambase.com/events?zipCode=' +
      this.zip +
      '&radius=' +
      config.radius +
      '&page=' +
      page +
      '&api_key=' +
      config.APIkey +
      '&o=json';
    http
      .get(api, (res) => {
        var body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          console.log('got reults');
          try {
            var result = JSON.parse(body);
            if (page === 0) {
              this.theShowList = [];
            }
          } catch (e) {
            console.log('API Did not give results, probably hit API Limit :(');
            console.log(body);
            page = 50;
            var result = {};
            if (this.theShowList.length < 1) {
              console.log(
                "I've got no results, Filling Dummy Data for Testing page is set at " +
                  page
              );
              result.Events = [JSON.parse(JSON.stringify(ddd))];
            } else {
              console.log(
                'Got Last Event, Displaying results for ' +
                  this.theShowList.length +
                  ' events'
              );
              result.Events = [];
            }
          }
          for (var i = 0, l = result.Events.length; i < l; i++) {
            var theEvent = result.Events[i];
            delete theEvent.Id;
            delete theEvent.Venue.Id;
            delete theEvent.Venue.State;
            delete theEvent.Venue.Country;
            delete theEvent.Venue.CountryCode;
            if (theEvent.Venue.Url == '') {
              delete theEvent.Venue.Url;
            }
            for (var z = 0, op = theEvent.Artists.length; z < op; z++) {
              delete theEvent.Artists[z].Id;
              theEvent.Artists[z].N = theEvent.Artists[z].Name;
              delete theEvent.Artists[z].Name;
            }
            delete theEvent.Venue.Latitude;
            delete theEvent.Venue.Longitude;
            if (theEvent.TicketUrl == '') {
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
            this.theShowList.push(theEvent);
          }
          page = page + 1;
          if (page <= 42) {
            getData(page);
          } else {
            if (config.redisURL) {
              var client2 = require('redis').createClient(config.redisURL);
              client2.set(this.cache, JSON.stringify(this.theShowList), () => {
                console.log(
                  this.cache + ' Show Data Updatated at ' + Date().toString()
                );
                client2.quit();
              });
            } else {
              console.log('Show Data Stored In Memory at ' + Date().toString());
            }
          }
        });
      })
      .on('error', (e) => {
        console.log('Got an error: ', e);
      });
  };
  getData(0);
};
module.exports = showList;
