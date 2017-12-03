require("datejs");
require("marko/node-require").install();
require("marko/express");
//Requirements and Config Vars
var express = require("express");
var indexTemplate = require("./index.marko");
const config = require("./config").config;
var favicon = require("serve-favicon");
var path = require("path");
var http = require("http");
var app = express();
var port = process.env.PORT || 8080;
var compression = require("compression");
app.use(compression());
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
var getData = require("./lib/getData").getData;
//Store Array in Memory Var
var data = [];

//Get Data at Start-up from API or Redis Cache
if (config.redisURL) {
  var client = require("redis").createClient(config.redisURL);
  console.log("Server Starting Getting Cache From Redis");
  client.get("concertCache", function(err, reply) {
    data = JSON.parse(reply);
    console.log("Data Loaded from Cache, Closing Redis");
    client.quit();
  });
} else {
  console.log("no Redis attempting to get data from API");
  getData(0, data, function(thedata) {
    console.log("Saving Show Data in Memory");
    data = thedata;
  });
}

//Update Data Script
var ontime = require("ontime");
ontime(
  {
    cycle: ["12:00:00"]
  },
  function(ot) {
    console.log("Updating From API");
    getData(0, data, function(thedata) {
      console.log("Saving Show Data in Memory");
      data = thedata;
    });
    ot.done();
    return;
  }
);

//Lasso Pack Page
var isProduction = process.env.NODE_ENV === "production";
require("lasso").configure({
  plugins: ["lasso-marko"],
  outputDir: __dirname + "/static",
  bundlingEnabled: isProduction,
  minify: isProduction,
  fingerprintsEnabled: isProduction
});

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Routes
app.get("/static/*", function(req, res, next) {
  //lasso middleware doesn't put cache-control, route to force Cache Control Headers for static content, then send it to lasso middleware
  res.setHeader("Cache-Control", "public, max-age=2592000");
  res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
  app.use(require("lasso/middleware").serveStatic());
  next();
});

app.get("/refresh", function(req, res){

getData(0, data, function(thedata) {
      console.log("Saving Show Data in Memory");
      data = thedata;
      	  res.setHeader("Cache-Control", "public, max-age=86400");
  res.setHeader(
    "Expires",
    Date.today()
      .set({ hour: 12, minute: 00, second: 00 })
      .toUTCString()
  );
  res.marko(indexTemplate, {
    events: data,
    numevents: numberWithCommas(data.length),
    city: config.cityName
  });
    });
});

app.get("/", function(req, res) {
  res.marko(indexTemplate, {
    events: data,
    numevents: numberWithCommas(data.length),
    city: config.cityName
  });
});

//Start Server
app.listen(port, function() {
  console.log("server on port:" + port);
  if (process.send) {
    process.send("online");
  }
});
