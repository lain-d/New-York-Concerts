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

//Build the showlists
var showList = require("./lib/showlist");
var nycshowlist = new showList(config.zipCode, "concertCache");
var phillyshowlist = new showList("19102", "phillyconcertCache");
var denvershowlist = new showList("80012", "denverconcertCache");
var seattleshowlist = new showList("98101", "seattleconcertCache");
var chicagoshowlist = new showList("60611", "chicagoconcertCache");
var lashowlist = new showList("90041", "laconcertCache");
var austinshowlist = new showList("78701", "austinconcertCache");
var dcshowlist = new showList("20001", "dcconcertCache");


//Update Data Script on the Hour
var ontime = require("ontime");
ontime(
  {
    cycle: ["12:00:00"]
  },
  function(ot) {
    console.log("Updating From API");
    nycshowlist.update(function(){
      phillyshowlist.update(function(){
        denvershowlist.update(function(){
         seattleshowlist.update(function(){
          chicagoshowlist.update(function(){
            lashowlist.update(function(){
              austinshowlist.update(function(){
                dcshowlist.update(function(){
                  console.log("all cities Updated");
                });
              });
            });
          });
         }); 
        });
      });
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

var denr = express.Router();
app.use(subdomain('philly', phillyr));
//api specific routes 
denr.get('/', function(req, res) {
     res.marko(indexTemplate, {
    events: denvershowlist.theShowList,
    numevents: denvershowlist.theShowList.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    city: "Denver"
  });
});

var dcr = express.Router();
app.use(subdomain('dc', phillyr));
//api specific routes 
dcr.get('/', function(req, res) {
     res.marko(indexTemplate, {
    events: dcshowlist.theShowList,
    numevents: dcshowlist.theShowList.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    city: "DC"
  });
});

var austinr = express.Router();
app.use(subdomain('austin', phillyr));
//api specific routes 
austinr.get('/', function(req, res) {
     res.marko(indexTemplate, {
    events: austinshowlist.theShowList,
    numevents: austinshowlist.theShowList.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    city: "Austin"
  });
});

var lar = express.Router();
app.use(subdomain('la', phillyr));
//api specific routes 
lar.get('/', function(req, res) {
     res.marko(indexTemplate, {
    events: lashowlist.theShowList,
    numevents: lashowlist.theShowList.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    city: "LA"
  });
});

var chir = express.Router();
app.use(subdomain('chicago', phillyr));
//api specific routes 
chir.get('/', function(req, res) {
     res.marko(indexTemplate, {
    events: chicagoshowlist.theShowList,
    numevents: chicagoshowlist.theShowList.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    city: "Chicago"
  });
});

var seatr = express.Router();
app.use(subdomain('philly', phillyr));
//api specific routes 
seatr.get('/', function(req, res) {
     res.marko(indexTemplate, {
    events: seattleshowlist.theShowList,
    numevents: seattleshowlist.theShowList.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    city: "Seattle"
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
