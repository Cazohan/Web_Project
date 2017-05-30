use hyper_tube
db.createUser({
	user: "UserHyperTube",
	pwd: "Hyp3tub3",
	roles: [ { role: "dbOwner", db: "hyper_tube" },
			{ role: "readWrite", db: "hyper_tube" } ]
})
db.createRole({
  role: "hyper",
  privileges: [
     { resource: { db: "hyper_tube", collection: "movies" }, actions: [ "find", "insert", "update" ] },
     { resource: { db: "hyper_tube", collection: "users" }, actions: [ "find", "insert", "update" ] },
     { resource: { db: "hyper_tube", collection: "comments" }, actions: [ "find", "insert", "update" ] }
  ],
  roles: []
})
db.createUser({
	user: "hypeUser",
	pwd: "Hyp3tub3User",
	roles: [ { role: "hyper", db: "hyper_tube" },
			{ role: "read", db: "hyper_tube" } ]
})
quit()