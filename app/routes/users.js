"use strict";

 var express = require('express'),
 	 User    = require('../models/user.js');

module.exports = (function (app)
{
	var router = express.Router();

	/*==========================================================
	=            http://localhost:8080/api/users | GET         =
	==========================================================*/

	router.get('/', function (req, res)
	{
		if (!req.user)
		{
			return res.send(401);
		}

		User.find(function (err, users)
		{
			if (err)
			{
				return res.json({error : err});
			}

			res.json({users: users});
		});		
	});

	/*==========================================================
	=            http://localhost:8080/api/users | POST        =
	==========================================================*/

	router.post('/', function (req, res)
	{
		if (!req.user)
		{
			return res.send(401);
		}

		var username = req.body.username || '',
			email    = req.body.email || '';

		if (username === '' || email === '')
		{
			return res.json({error: 'Please supply a username and email address'});
		}

		var newUser = new User({username : username, email : email});

		newUser.save(function (err, user)
		{
			if (err)
			{
				return res.json({error : err});
			}

			res.json({user: user});
		});
	});

	return router;
	
}());