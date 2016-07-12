var express = require('express');
var favicon = require('serve-favicon');

var app = express();

app.use(favicon(__dirname + '/public/favicon.ico'));

app.get('/', function(req, res) {
  res.render('/client/index');
});

var port = process.env.PORT || 8000;

app.listen(port);
