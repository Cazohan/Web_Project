var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// create User Schema
var User = new Schema({
    providerID: { type: String, require: true, unique: true},
    myid: { type: String, require: true, unique: true },
    login: { type: String, require: true },
    fname: { type: String, require: true },
    lname: { type: String, require: true },
    avatar: { type: String },
    mail: { type: String, unique: true, require: true },
    passwd: { type: String, require: true },
    recoverToken: { type: String },
    accessToken: { type: String },
    theme: { type: String, default: 'paper', enum: ['cerulean', 'cosmos', 'cyborg', 'darkly', 'flatly', 'journal', 'lumen', 'paper', 'readable', 'sandstone', 'simplex', 'slate', 'solar', 'spacelab', 'superhero', 'united', 'yeti'] },
    lang: { type: String, enum: ["FR", "EN"], default: 'EN' },
    movies: { type: [String] },
    picture: { type: String }
});

User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.passwd);
};

User.methods.updateInfo = function(req, res, callback) {
    callback(null, {ok:1});
};

module.exports = mongoose.model('users', User);
