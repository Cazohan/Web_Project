#!/us/bin/sh
echo "\033[30m\033[42m\nSuppression du dossier private\033[0m\n"
more ~/http/MyWebSite/j04/private/passwd
rm -rf ~/http/MyWebSite/j04/private/
sleep 2
echo "\033[30m\033[43m\nEnvoie d'5 login + mdp\033[0m\n"
curl -d login=a -d passwd=21 -d submit=OK 'http://e2r4p22.42.fr:8080/j04/ex01/create.php'
echo "\033[30m\033[43m\nEnvoie d'4 login + mdp\033[0m\n"
curl -d login=b -d passwd=22 -d submit=OK 'http://e2r4p22.42.fr:8080/j04/ex01/create.php'
echo "\033[30m\033[43m\nEnvoie d'3 login + mdp\033[0m\n"
curl -d login=c -d passwd=23 -d submit=OK 'http://e2r4p22.42.fr:8080/j04/ex01/create.php'
echo "\033[30m\033[43m\nEnvoie d'2 login + mdp\033[0m\n"
curl -d login=d -d passwd=24 -d submit=OK 'http://e2r4p22.42.fr:8080/j04/ex01/create.php'
echo "\033[30m\033[43m\nEnvoie d'1 login + mdp\033[0m\n"
curl -d login=e -d passwd=25 -d submit=OK 'http://e2r4p22.42.fr:8080/j04/ex01/create.php'
sleep 2
echo "\033[30m\033[41m\ncheck le fichier private/passwd\033[0m\n"
more ~/http/MyWebSite/j04/private/passwd
sleep 5
echo "\033[30m\033[44m\ntest changement de mot de passe\033[0m\n"
curl -d login=a -d oldpw=21 -d newpw=42 -d submit=OK 'http://e2r4p22.42.fr:8080/j04/ex02/modif.php'
curl -d login=b -d oldpw=22 -d newpw=42 -d submit=OK 'http://e2r4p22.42.fr:8080/j04/ex02/modif.php'
curl -d login=c -d oldpw=23 -d newpw=42 -d submit=OK 'http://e2r4p22.42.fr:8080/j04/ex02/modif.php'
curl -d login=d -d oldpw=24 -d newpw=42 -d submit=OK 'http://e2r4p22.42.fr:8080/j04/ex02/modif.php'
curl -d login=e -d oldpw=25 -d newpw=42 -d submit=OK 'http://e2r4p22.42.fr:8080/j04/ex02/modif.php'
sleep 2
echo "\033[30m\033[44m\ntest new mdp vide\033[0m\n"
curl -d login=a -d oldpw=42 -d newpw= -d submit=OK 'http://e2r4p22.42.fr:8080/j04/ex02/modif.php'
curl -d login=b -d oldpw=42 -d newpw= -d submit=OK 'http://e2r4p22.42.fr:8080/j04/ex02/modif.php'
curl -d login=c -d oldpw=42 -d newpw= -d submit=OK 'http://e2r4p22.42.fr:8080/j04/ex02/modif.php'
curl -d login=d -d oldpw=42 -d newpw= -d submit=OK 'http://e2r4p22.42.fr:8080/j04/ex02/modif.php'
curl -d login=e -d oldpw=42 -d newpw= -d submit=OK 'http://e2r4p22.42.fr:8080/j04/ex02/modif.php'