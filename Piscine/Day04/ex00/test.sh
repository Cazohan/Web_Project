#!/usr/bin/sh
echo "test0"
curl -v -c cook.txt 'http://e2r5p22.42.fr:8080/Piscine/Day04/ex00/index.php'
echo "test"
curl -v -b cook.txt 'http://e2r5p22.42.fr:8080/Piscine/Day04/ex00/index.php?login=sb&passwd=beeone&submit=OK'
echo "test2"
curl -v -b cook.txt 'http://e2r5p22.42.fr:8080/Piscine/Day04/ex00/index.php'
echo "test3"
curl -v 'http://e2r5p22.42.fr:8080/Piscine/Day04/ex00/index.php'
