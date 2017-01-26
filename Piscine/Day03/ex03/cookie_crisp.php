<?php
if ($_GET ['action'] == "set" && $_GET['name'] && $_GET['value'])
 	setcookie($_GET['name'], $_GET['value'], time()+3600);
if ($_GET['action'] == "del" && $_GET['name'])
 	setcookie($_GET['name'], $_COOKIE[$_GET['name']], time()-5);
 if ($_GET['action'] == "get" && $_GET['name'])
 	echo $_COOKIE[$_GET['name']] . "\n";
?>