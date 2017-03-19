var mongoose = require('mongoose');

var TechSchema = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
	reputation: {type: Number, default: 0, min: 0},
	totalWeight: {type: Number, default: 0, min: 0},
	image: {type: String, required: true},
	totalReviews: {type: Number, default: 0}
});

module.exports = TechSchema;
