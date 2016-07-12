var express = require('express');
var favicon = require('serve-favicon');

var app = express();

app.use(favicon(__dirname + '/favicon.ico'));
app.use(express.static(__dirname + '/client'));

app.set('views', __dirname + '/client');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
});

var port = process.env.PORT || 8000;

app.listen(port);
