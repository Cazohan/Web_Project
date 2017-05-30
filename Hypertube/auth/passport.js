var LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    FortyTwoStrategy = require('passport-42').Strategy,
    init = require('./init'),
    uniqid = require('uniqid'),
    User = require('../models/user');

module.exports = function(passport) {
    passport.serializeUser((profile, done) => done(null, profile));
    passport.deserializeUser((profile, done) => done(null, profile));
    
    // Register local
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'mail',
            passwordField: 'pwd',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            process.nextTick(function() {
                User.findOne({ 'mail': email }, function(err, user) {
                    if (err)
                        return done(err);
                    if ( user 
                        || !req.body.login
                        || !req.body.fname
                        || !req.body.lname
                        || !req.body.pwd
                        || !req.body.pwd2
                        || req.body.pwd !== req.body.pwd2
                        || !req.body.pwd.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/)) {
                        return done(null, false);
                    } else {
                        var newUser = new User();
                        newUser.mail = email;
                        newUser.myid = uniqid(),
                        newUser.login = req.body.login;
                        if (req.body.avatar) {
                            newUser.avatar = '/asset/upload/' + req.body.avatar + '.png';
                        } else {
                            newUser.avatar = '/asset/upload/avatar.png';
                        }
                        
                        newUser.fname = req.body.fname;
                        newUser.lname = req.body.lname;
                        newUser.passwd = newUser.generateHash(password);
                        newUser.providerID = 'local' + uniqid();
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            
            });
        })
    ),

    // Login local
    passport.use('local-signin', new LocalStrategy({
            usernameField: 'mail',
            passwordField: 'pwd',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            process.nextTick(function() {
                User.findOne({ 'mail': email }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user && user.validPassword(password)) {
                        return done(null, user);
                    } else {
                        return done('User not found', null);
                    }
                });
            });
        })
    ),

    // Register / login facebook
    passport.use('facebook', new FacebookStrategy({
            clientID: init.facebookID,
            clientSecret: init.facebookSC,
            callbackURL: "http://localhost:3000/auth/facebook/callback",
            profileFields: ['id', 'email', 'first_name', 'last_name', 'photos']
        },
        function(accessToken, refreshToken, profile, cb) {
            User.findOne({ 'providerID': profile.provider + profile.id }, function(err, user) {
                if (err) {
                    return cb(err, null);
                }
                if (!user) {
                    var newUserFB = new User();
                    newUserFB.mail = profile._json.email;
                    newUserFB.myid = uniqid(),
                    newUserFB.login = profile._json.first_name + ' ' + profile._json.last_name;
                    newUserFB.providerID = profile.provider + profile.id;
                    newUserFB.avatar = profile._json.picture.data.url;
                    newUserFB.accessToken = accessToken;
                    newUserFB.fname = profile._json.first_name;
                    newUserFB.lname = profile._json.last_name;
                    newUserFB.passwd = newUserFB.generateHash(profile.id);
                    newUserFB.save((error) => {
                        if (error) return cb(error, null);
                        return cb(error, newUserFB);
                    })
                }
                else 
                    return cb(null, user);
            });
        }
    )),
    
    passport.use('42', new FortyTwoStrategy({
            clientID: init.fourtyID,
            clientSecret: init.fourtySC,
            callbackURL: "http://localhost:3000/auth/forty/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            User.findOne({ 'providerID': profile.provider + '_' + profile.id }, function(err, user) {
                if (err) {
                    return cb(err, null);
                }
                if (!user) {
                    var newUser42 = new User();
                    newUser42.mail = profile.emails[0].value;
                    newUser42.myid = uniqid(),
                    newUser42.login = profile.displayName;
                    newUser42.providerID = profile.provider + '_' + profile.id;
                    newUser42.avatar = profile.photos[0].value;
                    newUser42.accessToken = accessToken;
                    newUser42.fname = profile.name.givenName;
                    newUser42.lname = profile.name.familyName;
                    newUser42.passwd = newUser42.generateHash(profile.id);
                    newUser42.save((error) => {
                        if (error) return cb(error, null);
                        return cb(error, newUser42);
                    })
                }
                else 
                    return cb(null, user);
            });
    }))
}