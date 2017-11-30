require('datejs');
require('marko/node-require').install();
require('marko/express');
var express = require('express');
var indexTemplate = require('./index.marko');
const config = require('./config').config;
var favicon = require('serve-favicon');
var path = require('path');
var http = require('http');
var app = express();
var port = process.env.PORT || 8080;
var redis = true;
var data = [];
var compression = require('compression');
var getData = require('./lib/getData').getData;
if (config.redisURL) {
  var client = require('redis').createClient(config.redisURL);
  console.log('Server Starting Getting Cache From Redis');
  client.get('concertCache', function(err, reply) {
    data = JSON.parse(reply);
    client.quit();
  });
} else {
  console.log('no Redis attempting to get data from API');
  redis = false;
  getData(0, data);
}
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

var ontime = require('ontime');
ontime(
  {
    cycle: ['12:00:00']
  },
  function(ot) {
    console.log('Updating From API');
    getData(0, data);
    ot.done();
    return;
  }
);

var isProduction = process.env.NODE_ENV === 'production';
require('lasso').configure({
  plugins: ['lasso-marko'],
  outputDir: __dirname + '/static',
  bundlingEnabled: isProduction,
  minify: isProduction,
  fingerprintsEnabled: isProduction
});
app.use(compression());
app.get('/static/*', function(req, res, next) {
  res.setHeader('Cache-Control', 'public, max-age=2592000');
  res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
  app.use(require('lasso/middleware').serveStatic());
  next();
});
app.get('/', function(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.setHeader(
    'Expires',
    Date.today()
      .set({hour: 12, minute: 00, second: 00})
      .toUTCString()
  );
  res.marko(indexTemplate, {
    events: data,
    city: config.cityName
  });
});
app.listen(port, function() {
  console.log('server on port:' + port);
  if (process.send) {
    process.send('online');
  }
});
