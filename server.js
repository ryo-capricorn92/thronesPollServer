var express = require('express');
var bodyParser = require('body-parser');
var db = require('./server/db');

var app = express();

app.use(bodyParser.json());
app.set('views', __dirname + '/');
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./server/routes')(app, express);

app.get('/', function (req, res) {
  res.render('index');
});

db.sync().then(function () {
  app.listen(3434, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
});
