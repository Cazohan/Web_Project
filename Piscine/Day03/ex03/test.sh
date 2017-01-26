#!/usr/bin/sh
echo "set\n";
curl -c cook.txt 'http://e2r11p23.42.fr:8080/ex03/cookie_crisp.php?action=set&name=plat&value=choucroute'
echo "get\n";
curl -b cook.txt 'http://e2r11p23.42.fr:8080/ex03/cookie_crisp.php?action=get&name=plat'
echo "del\n";
curl -c cook.txt 'http://e2r11p23.42.fr:8080/ex03/cookie_crisp.php?action=del&name=plat'
echo "get\n";
curl -b cook.txt 'http://e2r11p23.42.fr:8080/ex03/cookie_crisp.php?action=get&name=plat'
echo "end\n";
