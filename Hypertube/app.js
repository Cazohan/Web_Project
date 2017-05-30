//__________________Components________________
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    io = require('socket.io').listen(server),
    logger = require('morgan'),
    flash = require('connect-flash'),
    mongoose = require('mongoose'),
    multer = require('multer'),
    path = require('path'),
    User = require('./models/user'),
    storeFilm = require('./middleware/StoreFilm/storeFilm'),
    passport = require('passport');


//___________________Mongoose_______________
// mongoose.connect('mongodb://localhost:28000/hyper_tube');
// mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:28000/hyper_tube');
// mongoose.connect('mongodb://hyperUser:Hyp3tub3User@localhost:28000/hyper_tube');
// mongoose.connect('mongodb://userAdmin:AdminHyp3@localhost:28000/hyper_tube');

//________________passport____________________
require('./auth/passport')(passport);

//________________Path Routes_________________
var index = require('./routes/index');

//________________Remove every day old movies_________________
setInterval(function(){
    storeFilm.removeOldMovies();
}, 3600 * 60);

//_______________Moteur templates_____________
app.set('view engine', 'ejs')

//_________________Middlewares________________
// .use(logger('dev'))
.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
.use(bodyParser.json())
.use(favicon(__dirname + '/public/favicon.png'))
.use('/asset', express.static('public'))
.use('/srt', express.static(path.resolve('/tmp/eff/srt')))
.use('/videos', express.static('videos'))
.use('/node_modules/socket.io-client', express.static('socket.io'))
.use(cookieParser())
.use(session({
    secret: 'Hyp3rtub3',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 24 * 7 }
}))
.use(flash())
.use(passport.initialize())
.use(passport.session())

//__________________Routes___________________
.use('/', index)

server.listen(3000, function(){
    console.log('Server Started');
    storeFilm.getYts();
    storeFilm.getRarBg();
});