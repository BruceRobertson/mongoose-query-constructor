'use strict';

var mongoose = require('mongoose');
var dbUri = 'mongodb://localhost:27017/test-query-constructor';

var db = mongoose.createConnection(dbUri);

var Cars = db.model('cars', new mongoose.Schema({
	color: String,
	numWheels: Number,
	auxPort: Boolean
}));

init();

function init() {
	var baseQuery = Cars.where({color: 'red'}).toConstructor();
	var extendedQuery = baseQuery()
		.findOneAndUpdate({numWheels: 4}, {$set: {color: 'blue'}}, {upsert: true, new: true})
	console.log('Query:', extendedQuery.getQuery());
	console.log('Update', extendedQuery.getUpdate());
	extendedQuery.exec(function(err, result) {
		if (err) {
			console.log(err);
		}
		else {
			console.log('car updated', result);
		}
	})
}