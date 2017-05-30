const OpenSubtitles = require('opensubtitles-api');
var	init = require('../auth/init');
const OS = new OpenSubtitles({
    useragent: init.OpenSubID,
    username: init.OpenSubID,
    password: init.OpenSubSC,
    ssl: true
});
var iconv = require('iconv-lite');
var pump = require('pump');
var path = require('path');
var fs = require('fs');
var zlib = require('zlib');
var request = require('request');
var srt2vtt = require('srt2vtt');

OS.login()
.then(res => {
})
.catch(err => {
    console.log(err);
});

var getSubtitles = function(req, res, next) {
	var srttab = [];
	if (!req.params.id)
		return next();
	var id = req.params.id;
	fs.stat(path.resolve('/tmp/eff/srt/' + id + '.en.vtt'), function(err, stats) {
		if (!err) {
			fs.stat(path.resolve('/tmp/eff/srt/' + id + '.fr.vtt'), function(err, stats) {
				if (!err) {
					req.srtEn = true;
					req.srtFr = true;
					return next();
				}
			});
		}
	});
	OS.search({
    imdbid: id,
    sublanguageid: 'fre, eng',
    gzip: true
	}).then(subtitles => {
	    if (subtitles.fr) {
	        request({
	            url: subtitles.fr.url,
	            encoding: null
	        }, (error, response, data) => {
	            if (error) throw error;
	            zlib.unzip(data, (error, buffer) => {
	                if (error) return console.log(error);
	                const subtitle_content = iconv.decode(buffer, subtitles.fr.encoding);
					srt2vtt(subtitle_content, function(err, vttData) {
					  if (err) return console.log(err);
					  fs.writeFileSync(path.resolve('/tmp/eff/srt/' + id + '.fr.vtt'), vttData);
					  srttab.push("fr");
					  req.srtFr = true;
					});
	            });
	        });
	    }
	    if (subtitles.en) {
	        request({
	            url: subtitles.en.url,
	            encoding: null
	        }, (error, response, data) => {
	            if (error) throw error;
	            zlib.unzip(data, (error, buffer) => {
				    if (error) return console.log(error);
	                const subtitle_content = iconv.decode(buffer, subtitles.en.encoding);
	                srt2vtt(subtitle_content, function(err, vttData) {
		                if (err) console.log(err);
					  fs.writeFileSync(path.resolve('/tmp/eff/srt/' + id + '.en.vtt'), vttData);
					  srttab.push("en");
					  req.srtEn = true;
					});
	            });
	        });
	    }
	}).catch(console.error);
	setTimeout(function(){
		return next();
	}, 2000)
}

module.exports = {
	getSubtitles
}