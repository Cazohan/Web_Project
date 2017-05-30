var express = require('express')
var router = express.Router()
var mymongo = require('../middle/mymongo')
var utilities = require('../middle/utility')

router.get('/:login', function(req, res, next) {
	mymongo.getMyMatch(req, res, function(result){
		req.session['myMatch'] = result;
		next();
	});
}, function(req, res, next) {
	utilities.getLogin(req.url.slice(1), function(thisName) {
		req.session['thisName'] = thisName;
		next();
	});
}, function(req, res, next) {
	mymongo.getMyBlock(req, res, function(myblock) {
		if (utilities.alreadySet(myblock, req.session['thisName'])) {
			req.flash('error', 'Vous avez bloquer l\'utilisateur');
			res.redirect('../');
		} else {
			mymongo.getHeBlock(req, res, function(heblock) {
				if (utilities.alreadySet(heblock, req.session['thisName'])) {
					req.flash('error', 'L\'utilisateur vous a bloquer');
					res.redirect('../');
				} else {
					res.locals.session = req.session;
					next();
				}
			});
		}
	});
}, function(req, res, next) {
	req.session['thisName'] = undefined;
	utilities.getHisId(req.url.slice(1), function(rep) {
		if (utilities.alreadySet(req.session['myMatch'], req.url.slice(1))) {	
			req.session['tchat_with'] = rep;
		    res.render('tchat');
		} else {
			req.flash('error', 'Vous n\'avez pas matché')
			res.redirect('/');
		}
	});
});

module.exports = router;