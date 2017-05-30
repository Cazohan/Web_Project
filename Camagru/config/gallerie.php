<?php
session_start();

try
{
	$DB_DSN = 'mysql:host=localhost;dbname=Cama_db';
	$DB_USER = 'root';
	$DB_PASSWORD = 'root';
	$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
	$dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::	ERRMODE_EXCEPTION);
	$req = 'SELECT `titre`, `src`, `login` FROM `Photo` LIMIT 0, 6';
	$stmt = $dbconn->prepare($req);
	$stmt->execute();
	$result = array();
	$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
	// print_r($result);
	echo json_encode($result);
}
catch (PDOException $e)
{
	echo "Error: " . $e->getMessage();
}
?>