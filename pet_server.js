var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var petRoutes = require('./routes/pet.js');

var server = app.listen(3002, function() {
	console.log('server running at http://127.0.0.1:3002');
})

// value in 3 servers   for a client you only want to hit one point
// better for security