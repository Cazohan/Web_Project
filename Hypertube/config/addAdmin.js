use admin
db.createUser({
	user: "userAdmin",
	pwd: "AdminHyp3",
	roles: [ { role: "userAdminAnyDatabase", db: "admin"} ]
})
quit()