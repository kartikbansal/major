var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
	userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	time: {type: Date, default: Date.now},
	review: {
		body: {type: String, required: true},
		rating: {type: Number, required: true}
	},
	technology: {
		name: {type: String, required: true},
		techID: {type: mongoose.Schema.Types.ObjectId, ref: 'Technology', required: true}
	},
	tags: [{type: String, required: true}],
	reputation: {type: Number, min: 0},
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

ReviewSchema.methods.upvote = function(cb) {
	this.reputation += 0.4;
	this.save(cb);
};

ReviewSchema.methods.downvote = function(cb) {
	this.reputation -= 0.5;
	this.save(cb);
};

module.exports = ReviewSchema;
