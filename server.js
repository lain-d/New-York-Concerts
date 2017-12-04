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

//Store Array in Memory Var
var data = [];
var phillydata = [];
var denverdata = [];
var seattledata =[];
var chicagodata =[];
var ladata =[];
var austindata =[];
var dcdata =[];

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
    console.log("NYC Saving Show Data in Memory");
    data = thedata;
    console.log("Get Philly");
    getData(0, phillydata, "19102", "phillyconcertCache", function(thedata2) {
    console.log("Saving Show Data in Memory");
    phillydata = thedata2;
        getData(0, denverdata, "19102", "denverconcertCache", function(thedata3) {
    console.log("Saving Show Data in Memory");
    denverdata = thedata3;
            getData(0, seattledata, "19102", "seattleconcertCache", function(thedata4) {
    console.log("Saving Show Data in Memory");
    seattledata = thedata4;
                getData(0, chicagodata, "19102", "chicagoconcertCache", function(thedata5) {
    console.log("Saving Show Data in Memory");
    chicagodata = thedata5;
     getData(0, ladata, "19102", "laconcertCache", function(thedata6) {
    console.log("Saving Show Data in Memory");
    ladata = thedata6;
      getData(0, austindata, "19102", "austinconcertCache", function(thedata7) {
    console.log("Saving Show Data in Memory");
    austindata = thedata7;
         getData(0, dcdata, "19102", "dcconcertCache", function(thedata8) {
    console.log("Saving Show Data in Memory");
    dcdata = thedata8;
  });
  });
  });
  });
  });
  });
  });
});
}

//Update Data Script on the Hour
var ontime = require("ontime");
ontime(
  {
    cycle: ["12:00:00"]
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
    getData(0, phillydata, "19102", "PhillyconcertCache", function(thedata) {
      console.log("Saving Show Data in Memory");
      phillydata = thedata;
      res.marko(indexTemplate, {
    events: phillydata,
    numevents: phillydata.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    city: "Philly"
  });
    });
 
});

var phillyr = express.Router();
 //api specific routes 
phillyr.get('/', function(req, res) {
     res.marko(indexTemplate, {
    events: phillydata,
    numevents: phillydata.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    city: "Philly"
  });
});
var denverr = express.Router();
 //api specific routes 
denverr.get('/', function(req, res) {
     res.marko(indexTemplate, {
    events: denverdata,
    numevents: denverdata.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    city: "Denver"
  });
     });
var chicagor = express.Router();
 //api specific routes 
chicagor.get('/', function(req, res) {
     res.marko(indexTemplate, {
    events: chicagodata,
    numevents: chicagodata.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    city: "Chicago"
  });
     });
var lar = express.Router();
 //api specific routes 
lar.get('/', function(req, res) {
     res.marko(indexTemplate, {
    events: ladata,
    numevents: ladata.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    city: "LA"
  });
     });
var dcr = express.Router();
 //api specific routes 
dcr.get('/', function(req, res) {
     res.marko(indexTemplate, {
    events: dcdata,
    numevents: dcdata.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    city: "DC"
});});
var austinr = express.Router();
 //api specific routes 
austinr.get('/', function(req, res) {
     res.marko(indexTemplate, {
    events: austindata,
    numevents: austindata.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    city: "Austin"
});     });
var seattler = express.Router();
 //api specific routes 
seattler.get('/', function(req, res) {
     res.marko(indexTemplate, {
    events: seattledata,
    numevents: seattledata.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    city: "Seattle"
});    }); 

app.use(subdomain('philly', phillyr));
app.use(subdomain('denver', denverr));
app.use(subdomain('chicago', chicagor));
app.use(subdomain('dc', dcr));
app.use(subdomain('la', lar));
app.use(subdomain('seattle', seattler));
app.use(subdomain('austin', austinr));

//Main Route for NYC
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
