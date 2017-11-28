require("marko/node-require");
var express = require("express");
var favicon = require("serve-favicon");
var path = require("path");
var markoExpress = require("marko/express");
var template = require("./views/page");
require("datejs");
var http = require("http");
var app = express();
var port = process.env.PORT || 8080;
const ddd = {
    Id: 3064646,
    Date: Date.today(),
    Venue: {
        Id: 151240,
        Name: "Jay's House",
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
var p = 0;
var redis = true;
var data = [];
const config = require("./config").config;
var compression = require("compression");
if(config.redisURL){
    var client = require("redis").createClient(config.redisURL);
    console.log("Server Starting Getting Cache From Redis");
    client.get("concertCache", function(err, reply) {
        data = JSON.parse(reply);
    });
} else {
    console.log("no Redis attempting to get data from API");
    redis = false;
    getData(p);
}
app.use(compression());
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(markoExpress());
function getData(page) {
    console.log("Getting Concert Info for page " + page);
    var api =
        "http://api.jambase.com/events?zipCode="+config.zipCode+"&radius="+config.radius+"&page=" +
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
                    console.log("API Did not give results, probably hit API Limit :(")
                    console.log(body);
                    p = 50;
                    var result = {};
                    if (data.length < 1) {
                        console.log("I've got no results, Filling Dummy Data for Testing")
                        result.Events = [ddd, ddd, ddd, ddd, ddd];
                    } else {
                        console.log("Displaying results for "+data.length+" events")
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
                    if ((redis === true)) {
                        client.set("concertCache", JSON.stringify(data));
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

app.get("/", function(req, res) {
    res.marko(template, {
        events: data
    });
});
app.listen(port);
console.log("server on port:"+port);