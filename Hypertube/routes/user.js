let trans = require('../middleware/traduction/selectTrad'),
    User = require('../models/user'),
    passport = require('passport');

function accepted(callback, info) {
    return callback(null, {
        'id': info.myid,
        'fname': info.fname,
        'lname': info.lname,
        'avatar': info.avatar,
        'login': info.login,
        'movies': info.movies
    });
}

function getInfo(id, callback) {
    User.findOne({ myid: id }, (err, doc) => {
        if (err) return callback(err, null);
        return accepted(callback, doc);
    });
}

function updateInfo(body, user, callback) { 
	var mail = body.mail != user.mail ? body.mail : user.mail,
		lname = body.lname != user.lname ? body.lname : user.lname,
		fname = body.fname != user.fname ? body.fname : user.fname,
		theme = body.theme.toLowerCase() != user.theme ? body.theme.toLowerCase() : user.theme,
        lang = body.lang != user.lang ? body.lang : user.lang,
		login = body.login != user.login ? body.login : user.login;
    User.updateOne({ myid: user.myid }, { 
    	$set: { 
    		mail: mail,
    		lname: lname,
    		fname: fname,
    		theme: theme,
    		login: login,
            lang: lang//,
    	} 
    }, (err, result) => {
    	User.findOne({myid:user.myid}, (err, doc) => {
    		if (err) return callback(err, null);
    		return callback(null, doc);
    	});
    });
}

function updateImage(filename, user, callback) {
    User.updateOne({ myid: user.myid }, { 
        $set: { 
            avatar: '/asset/upload/avatar' + filename
        }
    }, (err, result) => {
        User.findOne({myid:user.myid}, (err, doc) => {
            if (err) return callback(err, null);
            return callback(null, doc);
        });
    });
}

var user = {
    compte: (req, res, next) => {
    	if (req.user) {
            trans.refreshInfo(req.user.myid, (err, user) => {
    	        if (err) console.log('Error: refreshInfo:', err);
                req.user = user;
                trans.late(req, res, (lang) => {
		            res.render('compte', {
		                translate: lang,
		                user: user
		            });
		        });
	        });
	    } else {
	    	res.redirect('/login');
	    }
    },
    profile: (req, res, next) => {
        trans.refreshInfo(req.user.myid, (err, user) => {
            req.user = user;
            trans.late(req, res, (lang) => {
                if (req.params) {
                    getInfo(req.params.id, (err, herInfo) => {
                        if (err) return res.redirect('/');
                        res.render('profile', {
                            translate: lang,
                            user: req.user,
                            her: herInfo
                        });
                    });
                } else {
                    res.redirect('/');
                }
            });
        });
    },

    update: (req, res, next) => {
        updateInfo(req.body, req.user, (err, user) => {
            req.user = user;
            res.redirect('/compte');
        });
    },

    image: (req, res, next) => {
        updateImage(req.file.filename, req.user, (err, user) => {
            req.user = user;
            return res.redirect('/compte');
        });
    }
}

module.exports = user;
