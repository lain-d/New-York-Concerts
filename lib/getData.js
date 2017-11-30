require('datejs');
const config = require('../config').config;
var favicon = require('serve-favicon');
var path = require('path');
var http = require('http');
const ddd = {
  Id: 3064646,
  Date: Date.today(),
  Venue: {
    Id: 151240,
    Name: "Test's House",
    Address: 'API Load Error',
    City: 'New York',
    State: 'New York',
    StateCode: 'NY',
    Country: 'US',
    CountryCode: 'US',
    ZipCode: '10573',
    Url: '#',
    Latitude: 41.001397,
    Longitude: -73.6654978
  },
  Artists: [{Id: 69, Name: 'Jay'}],
  TicketUrl: '#'
};

exports.getData = function(page, data) {
  console.log('Getting Concert Info for page ' + page);
  var api =
    'http://api.jambase.com/events?zipCode=' +
    config.zipCode +
    '&radius=' +
    config.radius +
    '&page=' +
    page +
    '&api_key=' +
    config.APIkey +
    '&o=json';
  http
    .get(api, function(res) {
      var body = '';
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('end', function() {
        try {
          var result = JSON.parse(body);
          if (page === 0) {
            data = [];
          }
        } catch (e) {
          console.log('API Did not give results, probably hit API Limit :(');
          console.log(body);
          page = 50;
          var result = {};
          if (data.length < 1) {
            console.log("I've got no results, Filling Dummy Data for Testing");
            result.Events = [ddd, ddd, ddd, ddd];
          } else {
            console.log('Displaying results for ' + data.length + ' events');
            result.Events = [];
          }
        }
        for (i = 0; i < result.Events.length; i++) {
          data.push(result.Events[i]);
        }
        var p = page++;
        if (p <= 43) {
          module.exports.getData(p, data);
        } else {
          if (config.redisURL === true) {
            var client2 = require('redis').createClient(config.redisURL);
            client2.set('concertCache', JSON.stringify(data), function() {
              client2.quit();
            });
          }
        }
      });
    })
    .on('error', function(e) {
      console.log('Got an error: ', e);
    });
};
