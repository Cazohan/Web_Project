<?php

$DB_DSN = 'mysql:host=localhost;';
$DB_USER = 'root';
$DB_PASSWORD = 'root';

try
{
	$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
	$sql = "CREATE DATABASE IF NOT EXISTS `Cama_db`";
	$dbconn->exec($sql);
	echo "DATABASE created";
	
}
catch (PDOException $e)
{
	die('Erreur : ' . $e->getMessage());
}

$dbconn = null;
?>