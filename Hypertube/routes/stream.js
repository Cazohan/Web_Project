var torrentStream 	= require('torrent-stream'),
	fs 				= require('fs'),
	path			= require('path'),
	video			= require('./video'),
	pump			= require('pump'),
	movieModel		= require('../models/movie'),
	ffmpeg			= require('fluent-ffmpeg');
var options = {
	connections: 1000,    		// Max amount of peers to be connected to.
	uploads: 10,          		// Number of upload slots.
	tmp: '/tmp/eff',      		// Root folder for the files storage.
	                      		// Defaults to '/tmp' or temp folder specific to your OS.
	                      		// Each torrent will be placed into a separate folder under /tmp/torrent-stream/{infoHash}
	path: '/tmp/eff/my-file',	// Where to save the files. Overrides `tmp`.
	verify: true,         		// Verify previously stored data before starting
	                      		// Defaults to true
	dht: true,            		// Whether or not to use DHT to initialize the swarm.
	                      		// Defaults to true
	tracker: true,        		// Whether or not to use trackers from torrent file or magnet link
	                      		// Defaults to true
	trackers: [
	    'udp://tracker.openbittorrent.com:80',
	    'udp://tracker.ccc.de:80',
	    'udp://tracker.internetwarriors.net:1337',
	    'udp://p4p.arenabg.ch:1337',
	    'udp://tracker.leechers-paradise.org:6969',
	    'udp://tracker.coppersurfer.tk:6969',
	    'udp://tracker.openbittorrent.com:80',
	    'udp://torrent.gresille.org:80/announce',
	    'udp://tracker.opentrackr.org:1337/announce',
	    'udp://glotorrents.pw:6969/announce'
	]
}
var engines = [];
var torrent = function(req, res, next) {
	var launched = 0;
	var stream;
	var command;
	var file;
	var cap;
	var max = 0;
	var i = 0;
	var size;

	if (!req.magnet) return;
	if (engines[req.params.id]) return;
	else engines[req.params.id] = torrentStream(req.magnet, options);
	engines[req.params.id].on('ready', function() {
		engines[req.params.id].files.forEach(function(current) {
			if (current.length > max) {
				max = current.length;
				file = current;
			}
			i++;
		});
		if (i == engines[req.params.id].files.length) {
			cap = file.length * 3 / 100
			if (file.name.substring(file.name.length - 3, file.name.length) == 'mp4' || file.name.substring(file.name.length - 4, file.name.length) == 'webm') {
				movieModel.updateOne({ imdb_id: req.params.id }, {
					$set: {
						path: "/tmp/eff/my-file/" + file.path.replace('/' + file.name, ""),
						last_seen: new Date()
					}
				}, (err) => {
					if (err) console.log(err);
				});
				movieModel.findOne({ imdb_id: req.params.id },
				 (err, doc) => {
					if (err) console.log(err);
					if (doc && doc.size) {
						size = doc.size;
						cap = size * 3 / 100;
					}
				});
				fs.stat('/tmp/eff/my-file/' + file.path, function(err, stats) {
					if(launched != 1) {
						if(err == null && stats.size > cap) {
							stream = file.createReadStream();
							pump(stream, res, function() {
								engines[req.params.id].destroy();
								engines[req.params.id] = null;
								res.destroy()
								file.deselect();
							});
							launched = 1;
						} else {
							stream = file.createReadStream();
						}
					}
				});
			} else if (file.name.substring(file.name.length - 3, file.name.length) == 'mkv') {
				movieModel.updateOne({ imdb_id: req.params.id }, {
					$set: {
						path: "/tmp/eff/my-file/" + file.path.replace('/' + file.name, ""),
						last_seen: new Date()
					}
				}, (err) => {
					if (err) console.log(err);
				});
				movieModel.findOne({ imdb_id: req.params.id },
				 (err, doc) => {
					if (err) console.log(err);
					if (doc && doc.size) {
						size = doc.size;
						cap = size * 3 / 100;
					}
				});
				stream = file.createReadStream();
				command = ffmpeg(stream)
				  .outputOption('-movflags frag_keyframe+faststart')
				  .audioCodec('aac')
				  .videoCodec('libx264')
				  .audioBitrate('128k')
				  .videoBitrate('1024k')
				  .format('mp4')
				fs.stat('/tmp/eff/my-file/' + file.path, function(err, stats) {
					if(err == null && stats.size > cap) {
						if(launched != 1) {
							pump(command, res, function() {
								engines[req.params.id].destroy();
								engines[req.params.id] = null;
								res.destroy()
								file.deselect();
							});
							launched = 1;
						}
					}
				});
			} else if (file.name.substring(file.name.length - 3, file.name.length) == 'avi' ) {
				movieModel.updateOne({ imdb_id: req.params.id }, {
					$set: {
						path: "/tmp/eff/my-file/" + file.path.replace('/' + file.name, ""),
						last_seen: new Date()
					}
				}, (err) => {
					if (err) console.log(err);
				});
				movieModel.findOne({ imdb_id: req.params.id },
				 (err, doc) => {
					if (err) console.log(err);
					if (doc && doc.size) {
						size = doc.size;
						cap = size * 3 / 100;
					}
				});
				stream = file.createReadStream();
				command = ffmpeg(stream)
				  .outputOption('-movflags frag_keyframe+faststart')
				  .audioCodec('aac')
				  .videoCodec('libx264')
				  .audioBitrate('128k')
				  .videoBitrate('1024k')
				  .format('mp4')
				fs.stat('/tmp/eff/my-file/' + file.path, function(err, stats) {
					if(err == null && stats.size > cap) {
						if(launched != 1) {
							pump(command, res, function() {
								engines[req.params.id].destroy();
								engines[req.params.id] = null;
								res.destroy()
								file.deselect();
							});
							launched = 1;
						}
					}
				});
			}
		}
	});
	engines[req.params.id].on('download', function(){
		if (engines[req.params.id].swarm.downloaded >= cap) {
			if (launched == 0)
			if (launched != 1) {
				if (command) {
					pump(command, res, function() {
						engines[req.params.id].destroy();
						engines[req.params.id] = null;
						res.destroy()
						file.deselect();
					});
				}
				else if (stream) {
					pump(stream, res, function() {
						engines[req.params.id].destroy();
						engines[req.params.id] = null;
						res.destroy()
						file.deselect();
					});
				}
				launched = 1;
			}
		}
	})

}

var local = function(req, res, next) {
	fs.stat(file, function(err, stats) {
		if (err) {
			if (err.code === 'ENOENT') {
			  // 404 Error if file not found
			  return res.sendStatus(404);
			}
			res.end(err);
		}
		var range = req.headers.range;
		if (!range) {
			// 416 Wrong range
			return res.sendStatus(416);
		}
		console.log(range);
		var positions = range.replace(/bytes=/, "").split("-");
		var start = parseInt(positions[0], 10);
		var total = stats.size;
		var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
		var chunksize = (end - start) + 1;
		console.log("Content-Range: bytes " + start + "-" + end + "/" + total)
		res.writeHead(206, {
	        "Content-Range": "bytes " + start + "-" + end + "/" + total,
	        "Accept-Ranges": "bytes",
	        "Content-Length": chunksize,
	        "Content-Type": "video/mp4"
	    });
	    var stream = fs.createReadStream(file, {start: start, end:end})
        .on("open", function() {
			  stream.pipe(res);
        }).on("error", function(err) {
          res.end(err);
        });
    });
}

module.exports = {
	torrent, local
}