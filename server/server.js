var express = require('express');

var app = express();

require('./router.js')(app, express);

app.use(favicon(__dirname + '../client/imgs/favicon.ico'));

app.listen(8000);
