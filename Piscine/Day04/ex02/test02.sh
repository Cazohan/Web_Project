rm -rf ~/http/MyWebSite/Piscine/Day04/ex01/private

echo Test ajout

curl -d login=x -d passwd=21 -d submit=OK 'http://e2r5p22.42.fr:8080/Piscine/Day04/ex01/create.php'

more ~/http/MyWebSite/Piscine/Day04/ex01/private/passwd
echo Test modif 

curl -d login=x -d oldpw=21 -d newpw=42 -d submit=OK 'http://e2r5p22.42.fr:8080/Piscine/Day04/ex02/modif.php'

echo Test fichier

more ~/http/MyWebSite/Piscine/Day04/ex01/private/passwd

echo Test deja fait

curl -d login=x -d oldpw=21 -d newpw=42 -d submit=OK 'http://e2r5p22.42.fr:8080/Piscine/Day04/ex02/modif.php'

echo fail

curl -d login=x -d oldpw=21 -d newpw= -d submit=OK 'http://e2r5p22.42.fr:8080/Piscine/Day04/ex02/modif.php'