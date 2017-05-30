var fs = require('fs'),
	User = require('../../models/user'),
	db = require('../DB/db').DbCo;


var refreshInfo = function (id, callback) {
	if (id) {
	    User.findOne({ myid: id }, {passwd:0, accessToken:0}, (err, doc) => {
	        if (err) callback(err, null);
	        return callback(null, doc);
	    });
	} else {
		callback('no Id, please log-in', null);
	}
}

var late = function(req, res, callback) {
		let trans = JSON.parse(fs.readFileSync(__dirname + '/traduction.json', 'UTF-8'));

		if (req.user) {
			if (req.user.lang == 'FR') {
				return callback(trans.translate.FR);
			} else if (req.user.lang == 'EN') {
				return callback(trans.translate.EN);
			} 
		} else {
			return callback(trans.translate.EN)
		}
}

module.exports = {
	late,
	refreshInfo
};