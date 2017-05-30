var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// create Movie Schema
var Movie = new Schema({
    imdb_id: {type: String, require: true, unique: true},
    rate: {type: Number, require: true, default: 0},
    genres: {type: [String], require: true, default: []},
    title: {type: String, require: true},
    seeds: {type: Number, require: true, default: 10},
    size: { type: Number, default: 720000000},
    last_seen: {type: Date},
    path: {type: String},
    synopsis: {type: String, require: true, default: "No synopsis avaible"},
    year: {type: Number, require: true},
    lang: {type: String, require: true, default:'English'},
    cover: {type: String, require: true, default: '/asset/no_cover.jpg'},
    torrent: {type: String, require: true, default:"n/a"},
    download: {type: Boolean, require: true, default: false},
    magnet: {type: String, require: true}
});

Movie.methods.speak = function(saved) {
    // console.log(saved.title, 'ajouté');
    return;
};

module.exports = mongoose.model('movies', Movie);
