var pump = require('pump'),
	stream = require('./stream'),
	db_conn = require('../middleware/DB/db').DbCo,
	trans = require('../middleware/traduction/selectTrad'),
	fs = require('fs');

var video = {
	play: function(req, res, next) {
		if (typeof req.params == 'undefined' || typeof req.params.id == 'undefined')
			return res.redirect('/'); // PASS TO 404
		db_conn.then(function(db){
			db.collection('movies').find({imdb_id:req.params.id}).toArray(function(err, doc){
				trans.refreshInfo(req.user.myid, (err, user) => {
					req.user = user;
					if (err) console.log(err);
					if (doc && doc[0]) {
						if (req.user) {
							var tmp = req.user.movies; // tableau de film 'deja vu'
							if (tmp.indexOf(doc[0].title) < 0) { // ajout du film en cours de chargement si il n'est pas dans le tableau
								tmp.push(doc[0].title);
								// maj des film 'deja vu'
								db.collection('users').updateOne({myid:req.user.myid},{$set:{movies:tmp}});
							}
							trans.late(req, res, (lang) => {
								var options = {
									movie: doc[0],
									src: "/videoDataTorrent/" + req.params.id,
									translate: lang,
									user: req.user,
									videoJs: true
								};
								if (req.srtEn)
									options.srcSrtEn = "/srt/" + req.params.id + '.en.vtt';

								if (req.srtFr)
									options.srcSrtFr = "/srt/" + req.params.id + '.fr.vtt';
								res.render('video', options);
							});
						} else {
							res.redirect('/login'); // doit etre log pour charger un film
						}
					}
					else
						res.redirect('/'); // PASS TO 404
				});
			});
		});
	},
	getStream: function(req, res, next){
		if (!req.params.id)
			res.redirect('/'); // PASS TO 404
		db_conn.then(function(db){
			db.collection('movies').find({imdb_id:req.params.id}).toArray(function(err, doc){
				if (err) console.log(err);
				if (doc && doc[0]) {
					req.magnet = doc[0]['magnet'];
					stream.torrent(req, res);
				}
				else
					res.redirect('/'); // PASS TO 404
			});
		});
	}
};

module.exports = video;
