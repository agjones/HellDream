// Server setup
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');


// Server config
var configFile = require('./server/config/config');
app.set('env', 'development');
process.env.NODE_ENV = 'development';
app.use(morgan('dev'));

// Static routes
app.use('/assets', express.static(path.join(__dirname, 'client')));

// body-parser setup
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));



// Routes
var api = require('./server/routes/api');
var routes = require('./server/routes/routes');
app.use('/api', api);
app.use('/', routes);

// 404
app.use(function (req, res, next) {
  var err = new Error('404 - Page not found');
  err.status = 404;
  next(err);
});

// Listens
var port = configFile.port;
var db = configFile.databaseUrl;
if (config.ip) app.listen(port, configFile.ip);
else app.listen(port);

// DB setup
mongoose.connect(configFile.databaseUrl, function (err) {
  if (err) console.log('DB err: ' + err);
  else console.log('Connected to mongodb');
});

console.log('App listening on ' + (configFile.ip || 'localhost') + ':' + port);
console.log('Database: ' + db);