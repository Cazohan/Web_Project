#!/usr/bin/sh  
echo Nettoyage
rm -rf ./private
echo TEST1
curl -d login=toto1 -d passwd=titi1 -d submit=OK 'http://e2r5p22.42.fr:8080/Piscine/Day04/ex01/create.php'

echo 
echo TEST 2

more ~/http/MyWebSite/Piscine/Day04/ex01/private/passwd

echo TEST deja la

curl -d login=toto1 -d passwd=titi1 -d submit=OK 'http://e2r5p22.42.fr:8080/Piscine/Day04/ex01/create.php'
echo 
echo TEST invalide
curl -d login=toto2 -d passwd= -d submit=OK 'http://e2r5p22.42.fr:8080/Piscine/Day04/ex01/create.php'
