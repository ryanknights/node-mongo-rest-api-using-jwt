"use strict";

 var express   = require('express'),
 	 User      = require('../models/user'),
	 jwt       = require('jsonwebtoken'),
	 jwtSecret = require('../config/jwt'); 	 

module.exports = (function (app)
{
	var router = express.Router();

	/*==========================================================
	=            http://localhost:8080/api/login | POST        =
	==========================================================*/

	router.post('/', function (req, res)
	{
		var username = req.body.username || '',
			password = req.body.password || '';

		/*=================================================
		=            Put your validation here!            =
		=================================================*/

		if (username !== 'user' || password !== 'password')
		{
			return res.send(401);
		}

		/*=========================================================================
		=            Find some information to send back with the token            =
		=========================================================================*/

		var userData = {userID : 1, email : 'something@somewhere.com'}
		

		/*===========================================================================
		=            Create a token storing some useful data e.g. userID            =
		===========================================================================*/
		
		var token = jwt.sign({userID: userData.userID}, jwtSecret.secret, {expiresInMinutes : 60});


		/*==================================================================================================================================
		=            Return a JSON object with the Userdata for the client side and the token to be used on subsequent requests            =
		==================================================================================================================================*/
		
		return res.json({user: userData, token : token});		
	});

	return router;
	
}());