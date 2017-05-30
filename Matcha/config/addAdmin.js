use admin
db.createUser({
	user: "Cazohan",
	pwd: "MatchaDB",
	roles: [ { role: "userAdminAnyDatabase", db: "admin"} ]
})
quit()