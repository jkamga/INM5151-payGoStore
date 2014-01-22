/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongo = require('mongodb')
  , format = require('util').format;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var server = new mongo.Server("localhost", 27017, {auto_reconnect: true});
var dbManager = new mongo.Db("applique-web", server, {safe:true});
dbManager.open(function(err, db) {
  require('./routes/index')(app, db);
   
  app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});
