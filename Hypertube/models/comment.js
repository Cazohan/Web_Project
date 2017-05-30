var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// create Comment Schema
var Comment = new Schema({
    imdb_id: {type: String, require: true },
    from_id: {type: String, require: true },
    from: {type: String, require: true },
    msg: { type: String, require: true }
});

module.exports = mongoose.model('comments', Comment);