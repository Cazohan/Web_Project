<?php
session_start()
$DB_DSN = 'mysql:host=localhost;';
$DB_USER = 'root';
$DB_PASSWORD = 'root';

try
{
	$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
	$_SESSION['dbconn'] = $dbconn;
	$sql = "CREATE DATABASE IF NOT EXISTS `Cama_db`";
	$dbconn->exec($sql);	
}

catch (Exception $e)
{
	die('Erreur : ' . $e->getMessage());
}
?>