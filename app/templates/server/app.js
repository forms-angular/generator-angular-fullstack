/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');<% if (filters.mongoose) { %>
var mongoose = require('mongoose');<% } %>
var fs = require('fs');
var path = require('path');
var formsAngular = require('forms-angular');
var errors = require('./components/errors');
var config = require('./config/environment');
<% if (filters.mongoose) { %>
// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

<% } %>// Setup server
var app = express();
var server = require('http').createServer(app);<% if (filters.socketio) { %>
var socketio = require('socket.io').listen(server);
require('./config/socketio')(socketio);<% } %>
require('./config/express')(app);
require('./routes')(app);

var DataFormHandler = new (formsAngular)(app, {
  urlPrefix: '/api/' <% if(filters.jqUpload) { %>, JQMongoFileUploader: {} <% } %>
  });

  var modelsPath = path.join(__dirname, 'forms-angular-models');
fs.readdirSync(modelsPath).forEach(function (file) {
  var fname = modelsPath + '/' + file;
  if (fs.statSync(fname).isFile()) {
    DataFormHandler.newResource(require(fname));
    }
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(auth|components|app|bower_components|assets)/*')
  .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
  .get(function(req, res) {
    res.sendfile(app.get('appPath') + '/index.html');
    });


// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
