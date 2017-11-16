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
const ddd = {Id:3064646,Date:'2017-11-16T20:00:00',Venue:{Id:151240,Name:'Jays House',Address:'149 Westchester Avenue',City:'New York',State:'New York',StateCode:'NY',Country:'US',CountryCode:'US',ZipCode:'10573',Url:'#',Latitude:41.001397,Longitude:-73.6654978},Artists:[{Id:65944,Name:'Jay'}],TicketUrl:'#'};
const ddd2 = {Id:3064646,Date:'2017-11-16T20:00:00',Venue:{Id:151240,Name:'Jays House 2 The Electric one In the Sky',Address:'149 Westchester Avenue',City:'New York',State:'New York',StateCode:'NY',Country:'US',CountryCode:'US',ZipCode:'10573',Url:'#',Latitude:41.001397,Longitude:-73.6654978},Artists:[{Id:65944,Name:'Jay'}],TicketUrl:'#'};

var p = 0;
var data = [];
var compression = require('compression');
app.use(compression());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
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
            	result.Events = [ddd, ddd, ddd2, ddd, ddd, ddd, ddd2];
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