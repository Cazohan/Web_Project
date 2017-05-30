#!/bin/sh

DBPATH=./data
FULL=./data/db
ADD_ADM=./addAdmin.js
ADD_USR=./addUser.js

if [ ! -d "$FULL" ]; then
	echo 'Aucune DB présente'
	mkdir -p "$FULL"
	sleep 5
	mongod --dbpath "$FULL" --port 28000 &
	sleep 10
	mongo --port 28000 < "$ADD_ADM" 
	sleep 5
	pkill mongod
	sleep 5
	mongod --dbpath "$FULL" --port 28000 --auth &
	sleep 10
	mongo --port 28000 -u "Cazohan" -p "MatchaDB" --authenticationDatabase "admin" < "$ADD_USR"
	sleep 5
	node ./gen.js all 500
	sleep 5
	pkill mongod
	sleep 2
	echo 'end'
	mongod --dbpath "$FULL" --port 28000 --auth
else
	mongod --dbpath "$FULL" --port 28000 --auth
fi
