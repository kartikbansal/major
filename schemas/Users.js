var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../config/devConfig.js');

var UserSchema = new mongoose.Schema({
	fullName: {type: String, required: true},
	image: {type: String, default: '/images/default_user.png'},
	email: {type: String, lowercase: true, unique: true, required: true},
	hash: String,
	salt: String,
	followersCount: {default: 0, type: Number},
	followees: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	votedReview: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
	techFollow: [{type: mongoose.Schema.Types.ObjectId, ref: 'Technology'}],
	bookmarks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
});

UserSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

	return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 60);
	return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.fullName.split(' ')[0],
		firstLogin: this.firstLogin,
		exp: parseInt(exp.getTime() / 1000)
	}, config.secret_key);
};

UserSchema.methods.follow = function(cb) {
	this.followersCount += 1;
	this.save(cb);
}

UserSchema.methods.unfollow = function(cb) {
	this.followersCount -= 1;
	this.save(cb);
}

module.exports = UserSchema;
