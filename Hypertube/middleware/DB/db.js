                   let MongoClient = require('mongodb').MongoClient,
	url = "mongodb://localhost:28000/hyper_tube";

function saveDB() {
	return new Promise(function(resolve, reject) {
		MongoClient.connect(url, (err, db) => {
			if (err) return reject(err);
			else return resolve(db);
		});
	});
}

const db = saveDB()

db.catch(() => console.log('Connection rejected'))

exports.DbCo = saveDB();