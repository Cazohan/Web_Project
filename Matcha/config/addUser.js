use matcha
db.createUser({
	user: "RandomUser",
	pwd: "MatchaDB",
	roles: [ { role: "readWrite", db: "matcha" } ]
})
quit()