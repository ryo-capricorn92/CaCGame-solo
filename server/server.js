var express = require('express');

var app = express();

require('./router.js')(app, express);

app.listen(8000);
