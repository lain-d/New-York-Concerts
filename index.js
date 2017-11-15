require('marko/node-require');
var express = require('express');
var markoExpress = require('marko/express');
var template = require('./page');
require('datejs');
var http = require('http');
var app = express();
var port = process.env.PORT || 8080;
var p = 0;
var data = [];

function getData(page) {
    console.log("Getting Concert Info for page " + page)
    var api = "http://api.jambase.com/events?zipCode=10010&radius=50&page=" + page + "&api_key=45gxnvd2mm8ysvc72xkzcsrv&o=json";

    http.get(api, function(res) {
        var body = '';

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
            var result = JSON.parse(body);
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