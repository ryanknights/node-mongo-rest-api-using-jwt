"use strict";

 var express = require('express'),
 	 User    = require('../models/user.js');

module.exports = (function (app)
{
	var router = express.Router();

	/*==========================================================
	=            http://localhost:8080/api/user/:id | PUT      =
	==========================================================*/
	
	router.put('/:id', function (req, res)
	{
		User.findById(req.params.id, function (err, user)
		{
			if (err)
			{
				return res.json({error: err});
			}

			if (!user)
			{
				return res.json({error: 'Invalid user'});
			}

			user.username = req.body.user;
			user.email    = req.body.email;

			user.save(function (err, user)
			{
				if (err)
				{
					return res.json({error : err});
				}

				return res.json({user: user});
			});
		});
	});

	/*==========================================================
	=         http://localhost:8080/api/user/:id | DELETE      =
	==========================================================*/

	router.delete('/:id', function (req, res)
	{
		User.findById(req.params.id, function (err, user)
		{
			if (err)
			{
				return res.json({error: err});
			}

			if (!user)
			{
				return res.json({error: 'Invalid user'});
			}

			user.remove(function (err, user)
			{
				if (err)
				{
					return res.json({error: err});
				}

				return res.json({success : true});
			});
		});
	});

	return router;
	
}());