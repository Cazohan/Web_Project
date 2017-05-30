var express = require('express'),
    fs = require('fs'),
    router = express.Router(),
    home = require('./home'),
    user = require('./user'),
    video = require('./video'),
    subtitles = require('./subtitles'),
    multer = require('multer'),
    upload = multer({ dest: './public/upload/' }),
    passport = require('passport'),
    img = require('../routes/uploadPic');

var storeFilm = require('../middleware/StoreFilm/storeFilm');

//__________________GET_____________________
var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated())
        return next();
    return res.redirect('/login');
}

router.get('/', home.home)

.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email', 'user_photos'] }))
.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

.get('/auth/forty', passport.authenticate('42'))

.get('/auth/forty/callback', passport.authenticate('42', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

.get('/logout', ensureAuthenticated, home.delog)


.get('/login', home.login)

.get('/register', home.register)

.get('/reset', home.reset)

.get('/changepass', home.changePass)

.get('/compte', ensureAuthenticated, user.compte)

.get('/profile/:id', ensureAuthenticated, user.profile)

.get('/video/:id', ensureAuthenticated, subtitles.getSubtitles, video.play)

.post('/images', ensureAuthenticated, img.upload, user.image)

.get('/videoDataTorrent/:id', ensureAuthenticated, video.getStream)

//__________________POST____________________

.post('/', ensureAuthenticated, home.search)

.post('/search', ensureAuthenticated, home.preciseSearch)

.post('/biblio', ensureAuthenticated, home.biblio)

.post('/bibliosearch', ensureAuthenticated, home.bibliosearch)


.post('/update', ensureAuthenticated, user.update)

.post('/getcomment', ensureAuthenticated, home.getComment)

.post('/postcomment', ensureAuthenticated, home.postComment)

.post('/login', passport.authenticate('local-signin', {
    failureRedirect: '/login'
})
, (req, res, next) => {
    home.senderMail(req.user.mail, "User");
    res.status(200).send('OK');
})

.post('/reset', home.resetPost, (req, res, next) => {
    res.status(200).send('OK');
})

.post('/changepass', home.changePassPost, (req, res, next) => {
    res.status(200).send('OK');
})

.post('/register', passport.authenticate('local-signup', {
        failureRedirect: '/register'
    })
, (req, res, next) => {
    home.senderMail(req.user.mail, "User");
    res.redirect('/');
});

module.exports = router;
