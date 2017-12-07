//Requirements and Config
require("datejs");
require("marko/node-require").install();
require("marko/express");
var subdomain = require('express-subdomain');
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


//Build the showlists
var showList = require("./lib/showList");
var nycshowlist = new showList(config.zipCode, "concertCache", function(){this.update()});
var phillyshowlist = new showList("19102", "phillyconcertCache", function(){this.update()});
//var denvershowlist = new showList(config.zipCode, "denverconcertCache", function(){this.update()});
//var seattleshowlist = new showList(config.zipCode, "seattleconcertCache", function(){this.update()});
//var chicagoshowlist = new showList(config.zipCode, "chicagoconcertCache", function(){this.update()});
//var lashowlist = new showList(config.zipCode, "laconcertCache", function(){this.update()});
//var austinshowlist = new showList(config.zipCode, "austinconcertCache", function(){this.update()});
//var dcshowlist = new showList(config.zipCode, "dcconcertCache", function(){this.update()});


//Update Data Script on the Hour
var ontime = require("ontime");
ontime(
  {
    cycle: ["12:00:00"]
  },
  function(ot) {
    console.log("Updating From API");
    nycshowlist.update();
    phillyshowlist.update();
    //denvershowlist.update();
    //seattleshowlist.update();
    //chicagoshowlist.update();
    //lashowlist.update();
    //austinshowlist.update();
    //dcshowlist.update();
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

var phillyr = express.Router();
app.use(subdomain('philly', phillyr));
//api specific routes 
phillyr.get('/', function(req, res) {
     res.marko(indexTemplate, {
    events: phillyshowlist.theShowList,
    numevents: phillyshowlist.theShowList.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    city: "Philly"
  });
});

//Static Files
app.get("/static/*", function(req, res, next) {
  //lasso middleware doesn't put cache-control, route to force Cache Control Headers for static content, then send it to lasso middleware
  res.setHeader("Cache-Control", "public, max-age=2592000");
  res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
  app.use(require("lasso/middleware").serveStatic());
  next();
});

//Main Route for NYC
app.get("/", function(req, res) {
  res.marko(indexTemplate, {
    events: nycshowlist.theShowList,
    numevents: nycshowlist.theShowList.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
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
