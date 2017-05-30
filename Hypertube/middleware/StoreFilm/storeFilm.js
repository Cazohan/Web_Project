let http = require('https'),
    isohuntApi = require('isohunt-api'),
    uniqid = require('uniqid'),
    imdb = require('imdb-api'),
    mongoose = require('mongoose'),
    movieDB = require('moviedb')('5698bc99cc62ee0543ada130fcb60a9b'),
    MovieModel = require('../../models/movie'),
    rimraf = require('rimraf'),
    rarbg = require('rarbg'),
    fs = require('fs'),
    ptn = require('parse-torrent-name');

var pirata = require('../pirata/pirata');

// mongoose.connect('mongodb://userAdmin:AdminHyp3@localhost:28000/hyper_tube');
// mongoose.connect('mongodb://UserHyperTube:Hyp3tub3@localhost:28000/hyper_tube');

mongoose.Promise = require('bluebird');
mongoose.createConnection('mongodb://localhost:28000/hyper_tube');

var getMovieYts = function(data) {
    if (data) {
        if (data.torrents[0].seeds >= 30) {
            const trackers = '&tr=udp://tracker.internetwarriors.net:1337&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.openbittorrent.com:80&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://glotorrents.pw:6969/announce';
            const name = data.title.replace(' ', '+');
            const link = encodeURI(`magnet:?xt=urn:btih:${data.torrents[0].hash}&dn=${name}${trackers}&xl=${data.torrents[0].size_bytes}`);
            var toSave = new MovieModel({
                imdb_id: data.imdb_code,
                rate: data.rating,
                genres: data.genres,
                title: data.title,
                seeds: data.torrents[0].seeds,
                size: data.torrents[0].size_bytes,
                synopsis: data.description_full,
                year: data.year,
                lang: data.language,
                cover: data.large_cover_image,
                torrent: data.torrents[0].url,
                download: false,
                magnet: link
            });
            toSave.save(function(err, fluffy) {
                // if (err) return console.error(err);
                toSave.speak(toSave);
            });
        }
    }
}

var getPirateBay = function() {
}

var getLink = function(opt) {
    http.get(opt, function(res) {
        let data = ''
        res.on('data', function(chunk) {
            data += chunk
        })
        res.on('end', function() {
            let result = JSON.parse(data),
                i = 0
            while (i < result.data.limit) {
                if (result.data.movies)
                    getMovieYts(result.data.movies[i])
                i++;
            }
        })
    });
}

function delIncomplete(movie, callback) {
    var i = 0;
    var total = movie.length - 1;
    movie.forEach((current, index) => {
        if (typeof current.seeds === 'undefined'
            || typeof current.size === 'undefined'
            || typeof current.torrent === 'undefined'
            || typeof current.magnet === 'undefined') {
            movie.splice(index, 1);
        }
        i++;
        // console.log(i + 1, ' / ', total);
        if (i == total - 1) {
            return callback(movie)
        }
    })
}

function getTorrentFor(movie, callback) {
    var i = 0;
    var j = 0;
    var maxSeeds;
    var total = movie.length;
    var result = [];
    movie.forEach((saved, index) => {
        isohuntApi.search(saved.title, {category: 'movies'}).then((torrentList) => {
            maxSeeds = 0;
            torrentList.forEach(torrentInfo =>{
                isohuntApi.getTorrentUrl(torrentInfo.infoUrl).then(torrentUrl => {
                    isohuntApi.getMagnetUrl(torrentInfo.infoUrl).then(magnetUrl => {
                        if (torrentInfo.seeders > 30 
                            && torrentInfo.seeders > maxSeeds) {
                            let arr = [];
                            arr.push(saved.genres.name);
                            var toSave = new MovieModel({
                                imdb_id: saved.imdb_id,
                                rate: saved.rate,
                                genres: arr,
                                title: saved.title,
                                seeds: torrentInfo.seeders,
                                size: parseInt(torrentInfo.size),
                                synopsis: saved.synopsis,
                                year: parseInt(saved.year.substr(0, 3)),
                                lang: saved.lang,
                                cover: saved.cover,
                                torrent: torrentUrl,
                                download: false,
                                magnet: encodeURI(magnetUrl)
                            });
                            toSave.save(function(err, fluffy) {
                                if (!err) {
                                    result.push(fluffy);
                                    toSave.speak(toSave);
                                }
                            });
                            maxSeeds = torrentInfo.seeders;
                        }
                    })
                })
            })
        });
        i++;
        if (i == total) {
            setTimeout(function(){
                return callback(result);
            }, 6000)
        }
    });
}


function searchExterne(search, callback) {
	var result = [];
    search.forEach(movie => {
        if (movie.download && movie.filename) {
            http.get('https://api.themoviedb.org/3/search/movie?api_key=5698bc99cc62ee0543ada130fcb60a9b&query=' + ptn(movie.filename).title.replace(" ", "+"), function(res) {
                let data = ''
                res.on('data', function(chunk) {
                    data += chunk
                })
                res.on('end', function() {
                    let dataJs = JSON.parse(data);
                    var mv = dataJs.results[0];
                    http.get('https://api.themoviedb.org/3/movie/' + mv.id + '?api_key=5698bc99cc62ee0543ada130fcb60a9b', function(res) {
                        let data = ''
                        res.on('data', function(chunk) {
                            data += chunk
                        })
                        res.on('end', function() {
                            let gnr = [];
                            let dataJs = JSON.parse(data);
                            var current = dataJs;
                            if (typeof current.genres != 'undefined') {
                                current.genres.forEach(function(elem){
                                    gnr.push(elem.name)
                                });
                                if (current.status_code !== 25) {
                                    var tmp = {
                                        imdb_id: current.imdb_id,
                                        rate: current.vote_average,
                                        genres: gnr,
                                        title: current.original_title,
                                        seeds: 75,
                                        synopsis: current.overview,
                                        year: current.release_date.substr(0, 4) ?current.release_date.substr(0, 4) : '1990',
                                        size: 720000000,
                                        lang: current.original_language,
                                        cover: 'http://image.tmdb.org/t/p/w300_and_h450_bestv2' + current.poster_path,
                                        torrent: movie.download,
                                        download: false,
                                        magnet: movie.download
                                    }
                                    result.push(tmp);
                                }
                            }
                        })
                        })
                        })
            });
            i++;
        }
        else {
            i++;
        }
            if (i == search.length) {
                setTimeout(function(){
                    return callback(result);
                }, 2000)
            }
    })
}

var omdb = require('omdb');
var ndMovie = require('node-movie');

    var i = 0;

function complete(movie, call) {
    movieDB.searchMovie({ query: movie.title + movie.year }, (err, res) => {
        if (err) console.log('err', err, 'data', res);
        if (res)
            call();
    });
}

function test(res, callback) {
    res.forEach((elem) => {
        var movie = new MovieModel();
        movie.imdb_id = undefined,
        movie.rate = undefined,
        movie.genres = undefined,
        movie.title = ptn(elem.name).title,
        movie.seeds = elem.seeds,
        movie.size = undefined,
        movie.last_seen = undefined,
        movie.path = undefined,
        movie.synopsis = undefined,
        movie.year = ptn(elem.name).year ? ptn(elem.name).year : 'n/a',
        movie.lang = (ptn(elem.name).excess == 'English' || ptn(elem.name).excess == 'French') ? ptn(elem.name).excess : 'English',
        movie.cover = undefined,
        movie.torrent = undefined,
        movie.download = undefined,
        movie.magnet = elem.magnet
        complete(movie);
    });
}

function getPage(search, opt, callback) {
    pirata.search(search, opt, (err, res) => {
        test(res, callback);
    });
}

module.exports = {
    getYts: function(err) {
        let page = 1;
        while (page < 123) {
            let opt = {
                host: 'yts.ag',
                path: '/api/v2/list_movies.json?sort=seeds&quality=720p&limit=50&page=' + page
            }
            getLink(opt)
            page++
        }
    },

    getTpb: function(search, callback) {
        let opt = {
            url: 'https://pirateproxy.cc',
            page: 0,
        }
        getPage(search, opt, (res) => {
            // console.log('res', res);
        })
    },
    getRarBg: function(callback) {
        rarbg.search({
            search_string: '720p',
            sort: 'seeders',
            min_seeders: 50,
            category: 'movies',
            limit: 25
          })
          .then(response => {
            var i = 0;
            searchExterne(response, function(data) {
                data.forEach(elem => {
                    var movie = new MovieModel();
                    movie.imdb_id = elem.imdb_id;
                    movie.rate = elem.rate;
                    movie.genres = elem.genres;
                    movie.title = elem.title;
                    movie.seeds = elem.seeds;
                    movie.synopsis = elem.synopsis;
                    movie.year = elem.year;
                    movie.size = elem.size;
                    movie.cover = elem.cover;
                    movie.lang = 'en';
                    movie.torrent = elem.torrent;
                    movie.download = false,
                    movie.magnet = elem.magnet;
                    movie.save(function(err, fluffy) {
                        movie.speak(movie);
                    });
                    i++;
                    if (!response[i])
                        callback();
                });
            })
        })
    },
    getGenre: function(callback) {
        var genre = [];
        var i = 0;

        MovieModel.find().exec((err, movies) => {
            var j = movies.length;
            movies.forEach(elem => {
                elem.genres.forEach(value => {
                    if (genre.indexOf(value) < 0)
                        genre.push(value);
                });
                i++;
                if (i == j)
                    callback(genre);
            });
        });
    },

    getBiblioPg: function(seen, page, callback) {
        let result = [],
            tmp = {};
        if (page) {
            MovieModel.find().sort({ seeds: -1 }).skip(52 * (page - 1)).limit(52 * page).exec((err, movies) => {
                if (err) console.log(err);
                for (var i = 0; movies[i]; i++) {
                    tmp = {};
                    tmp['cover'] = movies[i]['cover'];
                    tmp['title'] = movies[i]['title'];
                    tmp['rate'] = movies[i]['rate'];
                    tmp['imdb_id'] = movies[i]['imdb_id'];
                    tmp['year'] = movies[i]['year'];
                    tmp['genres'] = movies[i]['genres'];
                    if (seen.indexOf(movies[i]['title']) > -1)
                        tmp['seen'] = true;
                    result.push(tmp);
                }
                if (!movies[i]) {
                    callback(result);
                }
            });
        }
    },

    getBiblioPgSearch: function(seen, body, callback) {
        let result = [],
            tmp = {};
        var genre = body.genre;
        if (body.page) {
            if (typeof body.genre !== 'undefined' && typeof body.genre[0] !== 'undefined') {
                if (typeof body.result != 'undefined') {
                    var opt = {
                        title: body.result,
                        year: {
                            $lte: body.yearMax ? body.yearMax : 2017,
                            $gte: body.yearMin ? body.yearMin : 1921
                        },
                        rate: {
                            $lte: body.rateMax ? body.rateMax : 10,
                            $gte: body.rateMin ? body.rateMin : 0
                        },
                        genres: { 
                            $all: genre
                        }
                    }
                } else {
                    var opt = {
                        year: {
                            $lte: body.yearMax ? body.yearMax : 2017,
                            $gte: body.yearMin ? body.yearMin : 1921
                        },
                        rate: {
                            $lte: body.rateMax ? body.rateMax : 10,
                            $gte: body.rateMin ? body.rateMin : 0
                        },
                        genres: { 
                            $all: genre
                        }
                    }
                }
            } else {
                if (body.result) {
                    var opt = {
                        title: body.result,
                        year: {
                            $lte: body.yearMax ? body.yearMax : 2017,
                            $gte: body.yearMin ? body.yearMin : 1921
                        },
                        rate: {
                            $lte: body.rateMax ? body.rateMax : 10,
                            $gte: body.rateMin ? body.rateMin : 0
                        }
                    }
                } else {
                    var opt = {
                        year: {
                            $lte: body.yearMax ? body.yearMax : 2017,
                            $gte: body.yearMin ? body.yearMin : 1921
                        },
                        rate: {
                            $lte: body.rateMax ? body.rateMax : 10,
                            $gte: body.rateMin ? body.rateMin : 0
                        }
                    }
                }
            }
            MovieModel.find(opt).sort({ seeds: -1 }).skip(52 * (body.page - 1)).limit(52 * body.page).exec((err, movies) => {
                if (err) console.log(err);
                for (var i = 0; movies[i]; i++) {
                    tmp = {};
                    tmp['cover'] = movies[i]['cover'];
                    tmp['title'] = movies[i]['title'];
                    tmp['rate'] = movies[i]['rate'];
                    tmp['imdb_id'] = movies[i]['imdb_id'];
                    tmp['year'] = movies[i]['year'];
                    tmp['genres'] = movies[i]['genres'];
                    if (seen.indexOf(movies[i]['title']) > -1)
                        tmp['seen'] = true;
                    result.push(tmp);
                }
                if (!movies[i]) {
                    callback(result);
                }
            });
        }
    },

    getSearch: function(search, lang, callback) {
        var result = [];
        var reg = new RegExp(search, 'i');
        MovieModel.find().exec((err, movs) => {
            var i = 0;
            var genres = [];
            var Ymax = 2000;
            var Ymin = 2000;
            if (err || !movs) {
                return searchExterne(search, lang, callback);
            }
            movs.forEach(elem => {
                if (elem.year > Ymax)
                    Ymax = elem.year;
                else if (elem.year < Ymin)
                    Ymin = elem.year;
                elem.genres.forEach(genre => {
                    if (genres.indexOf(genre) < 0)
                        genres.push(genre);
                });
                if (elem.title.match(reg) != null) {
                    result.push(elem);
                }
                i++;
                if (!movs[i]) {
                    return callback({ res: result, genres: genres, Ymax: Ymax, Ymin: Ymin });
                }
            })
        });
    },

    removeOldMovies: function() {
        var date = new Date();
        MovieModel.find({last_seen: {
            $lt: date.setMonth(date.getMonth() - 1) 
        }
        }, (err, oldMovies) => {
            oldMovies.forEach(function(movie) {
                if (movie.path != null) {
                    fs.stat(movie.path, function(err, stats) {
                        if (!err) {
                            rimraf(movie.path, function(){
                                MovieModel.update({title: movie.title}, {
                                    $set: {
                                        last_seen: null,
                                        path: null
                                    }
                                }, function(err) {
                                    if (!err)
                                        console.log(movie.title + ' deleted');
                                });
                            });
                        }
                    });
                }
            });
        });
    },

    getPreciseSearch: function(body, lang, callback) {
        var result = [];
        var genres = [];
        if (typeof body.genre === 'string')
            genres.push(body.genre)
        else
            genres = body.genre

        if (typeof body.genre === 'string') {
            var opt = {
                year: {
                    $lte: body.yearMax ? body.yearMax : 2017,
                    $gte: body.yearMin ? body.yearMin : 1921
                },
                genres: body.genre
            };
        } else {
            var opt = {
                year: {
                    $lte: body.yearMax ? body.yearMax : 2017,
                    $gte: body.yearMin ? body.yearMin : 1921
                }
            };
        }
        MovieModel.find(opt).exec((err, movs) => {
            var i = 0;
            var genres = [];
            var Ymax = body.yearMax;
            var Ymin = body.yearMin;
            return callback({res: movs, genres: genres, Ymax:Ymax, Ymin:Ymin});
        });
    }
}

// getRarBg: function(err) {
//     rarbg.search({
//         search_string: '720p',
//         sort: 'seeders',
//         min_seeders: 50,
//         category: 'movies',
//         limit: 40
//       })
//       .then(response => {
//         var i = 0;
//         response.forEach(elem => {
//             // if (i <= 39) {
//                 var film = ptn(elem.filename);
//                 var movie = new MovieModel();
//                 movie.imdb_id = uniqid();
//                 movie.title = film.title;
//                 movie.year = film.year;
//                 movie.magnet = elem.download;
//                 movie.save(function(err, fluffy) {
//                     movie.speak(movie);
//                 });
//                 i++;
//             // }
//         })
//         if (!response[i])
//             console.log(i);
//     })
// }
