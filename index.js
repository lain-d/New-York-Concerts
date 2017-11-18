require('marko/node-require');
var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var markoExpress = require('marko/express');
var template = require('./page');
require('datejs');
var http = require('http');
var app = express();
var port = process.env.PORT || 8080;
const ddd = { Id: 3064646, Date: '2020-01-01T20:00:00', Venue: { Id: 151240, Name: 'Jays House', Address: '69 West Avenue', City: 'New York', State: 'New York', StateCode: 'NY', Country: 'US', CountryCode: 'US', ZipCode: '10573', Url: '#', Latitude: 41.001397, Longitude: -73.6654978 }, Artists: [{ Id: 69, Name: 'Jay' }], TicketUrl: '#' };
const ddd2 = { Id: 3064646, Date: '2021-01-01T20:00:00', Venue: { Id: 151240, Name: 'Jays House 2 The Bungalow', Address: '96 East Avenue', City: 'New York', State: 'New York', StateCode: 'NY', Country: 'US', CountryCode: 'US', ZipCode: '10573', Url: '#', Latitude: 41.001397, Longitude: -73.6654978 }, Artists: [{ Id: 65944, Name: 'Jay' }], TicketUrl: '#' };

var p = 0;
var data = [];
var compression = require('compression');
app.use(compression());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(markoExpress());

function getData(page) {
    console.log("Getting Concert Info for page " + page)

    var api = "http://api.jambase.com/events?zipCode=10010&radius=50&page=" + page + "&api_key=45gxnvd2mm8ysvc72xkzcsrv&o=json";

    http.get(api, function(res) {
        var body = '';

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
            try {
                var result = JSON.parse(body);
                if (p === 0) {
                    data = [];
                }
            } catch (e) {
                p = 11;
                var result = {};
                if (data.length < 1) {
                    result.Events = [ddd, ddd, ddd2, ddd, ddd, ddd, ddd2];
                } else {
                    result.Events = [];
                }
            }
            for (i = 0; i < result.Events.length; i++) {

                data.push(result.Events[i]);
            }
            p++;
            if (p <= 25) {
                getData(p);
            } else {
                p = 0;
            }

        });


    }).on('error', function(e) {
        console.log("Got an error: ", e);
    });

}
getData(p);
var dayInMilliseconds = 1000 * 60 * 60 * 24;
setInterval(getData, dayInMilliseconds, p);
app.get('/', function(req, res) {
    res.marko(template, {
        events: data
    });
});

app.listen(port);