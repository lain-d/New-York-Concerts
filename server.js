//Requirements and Config
require("datejs");
require("marko/node-require").install();
require("marko/express");
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
var phillydata = [];

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
  getData(0, data, config.zipCode, "concertCache", function(thedata) {
    console.log("Saving Show Data in Memory");
    data = thedata;
  });
}

//Update Data Script on the Hour
var ontime = require("ontime");
ontime(
  {
    cycle: ["00:00"]
  },
  function(ot) {
    console.log("Updating From API");
    getData(0, data, config.zipCode, "concertCache", function(thedata) {
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

//Routes

//Static Files
app.get("/static/*", function(req, res, next) {
  //lasso middleware doesn't put cache-control, route to force Cache Control Headers for static content, then send it to lasso middleware
  res.setHeader("Cache-Control", "public, max-age=2592000");
  res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
  app.use(require("lasso/middleware").serveStatic());
  next();
});

//Philly Test

app.get("/phillydata", function(req, res) {

    console.log("Updating From API");
    getData(0, data, config.zipCode, "concertCache", function(thedata) {
      console.log("Saving Show Data in Memory");
      phillydata = thedata;
      res.marko(indexTemplate, {
    events: phillydata,
    numevents: phillydata.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    city: "Philly"
  });
    });
 
});


app.get("/philly", function(req, res) {
  res.marko(indexTemplate, {
    events: phillydata,
    numevents: phillydata.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    city: "Philly"
  });
});




//Main Route
app.get("/", function(req, res) {
  res.marko(indexTemplate, {
    events: data,
    numevents: data.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
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
