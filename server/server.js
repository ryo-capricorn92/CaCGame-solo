var express = require('express');
var favicon = require('serve-favicon');

var app = express();

require('./router.js')(app, express);

app.use(favicon(__dirname + '../client/imgs/favicon.ico'));

var port = process.env.PORT || 8000;

app.listen(port);
