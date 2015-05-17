"use strict";

/**
* Require modules
**/

var express 		= require('express'),
	app     		= express(),
	bodyParser 		= require('body-parser'),
	methodOverride 	= require('method-override'),
	mongoose   		= require('mongoose'),
	expressJwt      = require('express-jwt'),
	jwtSecret       = require('./app/config/jwt');

/**
* Connect to MongoDB
**/

var db = require('./app/config/db');

/**
* Setup server for POST/UPDATE/DELETE requests
**/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

/**
* Login Route - Not Authenticated
**/

app.use('/api/login', require('./app/routes/login'));


/**
* Users Routes | http://localhost:8080/api/users | Authenticated
**/

app.use('/api/users', expressJwt({secret : jwtSecret.secret}));
app.use('/api/users', require('./app/routes/users'));

/**
* User Routes | http://localhost:8080/api/user/:id | Authenticated
**/

app.use('/api/user', expressJwt({secret : jwtSecret.secret}));
app.use('/api/user', require('./app/routes/user'));

/**
* Error Handlers
**/

app.use(function (err, req, res, next) 
{
	if (err.name === 'UnauthorizedError') 
	{
		res.send(401);
	}
});

/**
* Start the server
**/

var port = process.env.PORT || 8080;

app.listen(port);
console.log('App listening on port ' + port);

exports = module.exports = app;