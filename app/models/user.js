"use strict";

var mongoose = require('mongoose');

var userSchema = mongoose.Schema(
{
	username :
	{
		type     : String,
		required : true,
		unique   : true
	},
	email :
	{
		type     : String,
		required : true,
		unique   : true,
	}
});

module.exports = mongoose.model('User', userSchema);