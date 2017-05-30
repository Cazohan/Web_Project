let storeFilm = require('../middleware/StoreFilm/storeFilm'),
    passport = require('passport'),
    trans = require('../middleware/traduction/selectTrad'),
    User = require('../models/user'),
    nodemailer = require('nodemailer'),
    uniqid = require('uniqid'),
	Comment = require('../models/comment');

var home = {
    
    //_________________________GET__________________

    home: (req, res, next) => {
        if (req.user) {
            trans.refreshInfo(req.user.myid, (err, user) => {
                if (err) console.log(err);
                req.user = user;
                trans.late(req, res, (lang) => {
                    res.render('index', {
                        translate: lang,
                        user: req.user
                    });
                })
            });
        } else {
            res.redirect('/login');
        }
    },
    delog: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    login: (req, res, next) => {
        trans.late(req, res, (lang) => {
            res.render('login', {
                translate: lang,
                user: req.user
            });
        });
    },
    register: (req, res, next) => {
        trans.late(req, res, (lang) => {
            res.render('register', {
                translate: lang,
                user: req.user
            });
        });
    },
    reset: (req, res, next) => {
        trans.late(req, res, (lang) => {
            res.render('reset', {
                translate: lang,
                user: req.user
            });
        });
    },
    changePass: (req, res, next) => {
        trans.late(req, res, (lang) => {
            res.render('changepass', {
                translate: lang,
                user: req.user
            });
        });
    },

    //_______________________POST__________________________

    biblio: (req, res, next) => {
        storeFilm.getBiblioPg(req.user.movies, req.body.page, (bibli) => {
            if (!bibli[0])
                return res.status(200).send('');
            res.status(200).send(bibli);
        });
    },
    bibliosearch: (req, res, next) => {
        storeFilm.getBiblioPgSearch(req.user.movies, req.body, (bibli) => {
            if (!bibli[0])
                return res.status(200).send('');
            res.status(200).send(bibli);
        });
    },
    getComment: (req, res, next) => {
        var ret = {},
            i = -1;
        Comment.find({ imdb_id: req.body.imdb }).then((result) => {
            for (var j = 0; j < result.length; j++) {
                i++;
                ret[i] = result[j];
            }
            if (i == result.length - 1) {
                res.status(200).send({ result: ret })
            }
            
        })
    },
    resetPost: (req, res, next) => {
        if (req.body.mail) {
            var token = uniqid() + uniqid();
            User.updateOne({mail: req.body.mail}, {
                $set: {
                    recoverToken: token
                }
            }, (err, result) => {
                module.exports.senderMail(req.body.mail, "Reset", token);
                next();
            })
        }
    },
    changePassPost: (req, res, next) => {
        var myUser = new User();
        if (req.body.pwd == req.body.cfpwd) {
            var pass = myUser.generateHash(req.body.pwd);
            User.updateOne({ recoverToken: req.query.token }, {
                $set: {
                    passwd: pass
                }
            }, (err, result) => {
                next();
            })
        }  
    },
    postComment: (req, res, next) => {
        var tmp = req.body.imdb;
        var newCom = new Comment();
        newCom.from_id = req.user.myid;
        newCom.imdb_id = tmp;
        newCom.msg = req.body.message;
        newCom.from = req.user.login;
        newCom.save((err, fluffy) => {
            if (err) return res.sendStatus(403);
            else return res.status(200).send(fluffy)
        })
    },
    search: (req, res, next) => {
        req.body.rateMin = isNaN(req.body.rateMin) ? 0 : req.body.rateMin;  
        req.body.rateMax = isNaN(req.body.rateMax) ? 10 : req.body.rateMax;
        req.body.Ymax = isNaN(req.body.Ymax) ? 2012 : req.body.Ymax;
        req.body.Ymin = isNaN(req.body.Ymin) ? 1942 : req.body.Ymin;
        var sch;
        if (req.body.search == '')
            sch = true;
        else
            sch = false;
        if (req.user) {
            trans.refreshInfo(req.user.myid, (err, user) => {
                if (err) console.log('Error: search:', err);
                req.user = user;
                trans.late(req, res, (lang) => {
                    storeFilm.getGenre((allgenres) => {
                        storeFilm.getSearch(req.body.search, user.lang, (result) => {
                            if (typeof req.body.search !== 'undefined' && req.body.search !== '') {
                                return res.render('search', {
                                    result: result.res,
                                    genres: allgenres,
                                    Ymax: result.Ymax,
                                    Ymin: result.Ymin,
                                    translate: lang,
                                    user: req.user,
                                    selected: {
                                        search: sch,
                                        rateMin: 0,
                                        rateMax: 10,
                                        yearMin: result.Ymin,
                                        yearMax: result.Ymax,
                                        genres: []
                                    }
                                });
                            } else if (result) {
                                return res.render('search', {
                                    genres: allgenres,
                                    Ymax: result.Ymax,
                                    Ymin: result.Ymin,
                                    translate: lang,
                                    user: req.user,
                                    selected: {
                                        rateMin: 0,
                                        rateMax: 10,
                                        yearMin: result.Ymin,
                                        yearMax: result.Ymax,
                                        genres: []
                                    }
                                });
                            } else {
                                return res.redirect('/');
                            }
                        });
                    });
                });
            });
        } else {
            return res.redirect('/');
        }
    },
    preciseSearch: (req, res, next) => {
        req.body.rateMin = isNaN(req.body.rateMin) ? 0 : req.body.rateMin;  
        req.body.rateMax = isNaN(req.body.rateMax) ? 10 : req.body.rateMax;
        req.body.Ymax = isNaN(req.body.Ymax) ? 2012 : req.body.Ymax;
        req.body.Ymin = isNaN(req.body.Ymin) ? 1942 : req.body.Ymin;
        if (req.user) {
            trans.refreshInfo(req.user.myid, (err, user) => {
                if (err) console.log('Error: presiceSearch:', err);
                req.user = user;
                trans.late(req, res, (lang) => {
                    storeFilm.getGenre((allgenres) => {
                        storeFilm.getPreciseSearch(req.body, user.lang, (result) => {
                            if (req.body.search !== '') {
                                return res.render('search', {
                                    genres: allgenres,
                                    Ymax: result.Ymax,
                                    Ymin: result.Ymin,
                                    translate: lang,
                                    user: req.user,
                                    selected: {
                                        rateMin: req.body.rateMin,
                                        rateMax: req.body.rateMax,
                                        yearMin: result.Ymin,
                                        yearMax: result.Ymax,
                                        genres: req.body.genre || []
                                    }
                                });
                            }
                            if (result) {
                                return res.render('search', {
                                    result: result.res,
                                    genres: allgenres,
                                    Ymax: result.Ymax,
                                    Ymin: result.Ymin,
                                    translate: lang,
                                    user: req.user,
                                    selected: {
                                        rateMin: req.body.rateMin,
                                        rateMax: req.body.rateMax,
                                        yearMin: result.Ymin,
                                        yearMax: result.Ymax,
                                        genres: req.body.genre || []
                                    }
                                });
                            } else {
                                return res.redirect('/');
                            }
                        });
                    });
                });
            });
        } else {
            return res.redirect('/');
        }
    },
    senderMail: function(mail, reason, token) {

        var transporter = nodemailer.createTransport();
        if (reason == "User") {
            var mailOption = {
                from: '"TTC Hypertube" <no-reply@hypertube.com>',
                to: mail,
                subject: 'Register on TTC Hypertube',
                text: 'You Success your register on Hypertube Website!',
                html: '<b>You Success your register on Hypertube Website!</b>'
            }
            transporter.sendMail(mailOption, function(error, info) {
                if (error) return console.log('Error Mail sender', error);
            });
        } else if (reason == 'Reset' && token) {
            var mailOption = {
                from: '"TTC Hypertube" <no-reply@hypertube.com>',
                to: mail,
                subject: 'Reset password on TTC Hypertube',
                text: 'Reset your password by following this link:',
                html: '<br>Reset your password by following this: <a target="_blank" href="http://localhost:3000/changepass?token='+ token +'">link</a><br>'
            }
            transporter.sendMail(mailOption, function(error, info) {
                if (error) return console.log('Error Mail sender', error);
            });
        }
    }
};

module.exports = home;
