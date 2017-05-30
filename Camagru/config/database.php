<?php
session_start();
$DB_DSN = 'mysql:host=localhost';
$DB_USER = 'root';
$DB_PASSWORD = 'root';

try
{
	$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
	$dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$sql = "CREATE DATABASE IF NOT EXISTS `Cama_db`";
	$stmt = $dbconn->prepare($sql);
	$stmt->execute();	
}

catch (PDOException $e)
{
	die('Erreur : ' . $e->getMessage());
}
?>