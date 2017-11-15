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
const ddd = {Id:3064646,Date:'2017-11-16T20:00:00',Venue:{Id:151240,Name:'Garcia\'s at The Capitol Theatre',Address:'149 Westchester Avenue',City:'Port Chester',State:'New York',StateCode:'NY',Country:'US',CountryCode:'US',ZipCode:'10573',Url:'http://www.thecapitoltheatre.com/garcias-list/',Latitude:41.001397,Longitude:-73.6654978},Artists:[{Id:65944,Name:'Leslie Mendelson'}],TicketUrl:'http://www.shareasale.com/r.cfm?u=460319&b=234786&m=27601&afftrack=&urllink=https://www.ticketfly.com/purchase/event/1578307/tfly?utm_medium=api'};
var p = 0;
var data = [];
var compression = require('compression');
app.use(compression());

function getData(page) {
    console.log("Getting Concert Info for page " + page)
    var api = "http://api.jambase.com/events?zipCode=10010&radius=50&page=" + page + "&api_key=45gxnvd2mm8ysvc72xkzcsrv&o=json";

    http.get(api, function(res) {
        var body = '';

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
        	try{
            var result = JSON.parse(body);
            }
            catch(e){
            	p=11;
            	var result = {};
            	result.Events = [ddd];
            }
            for (i = 0; i < result.Events.length; i++) {

                data.push(result.Events[i]);
            }
            p++;
            if (p <= 10) {
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
setInterval(getData, 7200000, p);

app.use(markoExpress()); //enable res.marko(template, data)


app.get('/', function(req, res) {
    res.marko(template, {
        events: data
    });
});

app.listen(port);