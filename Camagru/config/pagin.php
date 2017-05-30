<?php
$DB_DSN = 'mysql:host=localhost;dbname=Cama_db';
$DB_USER = 'root';
$DB_PASSWORD = 'root';
try
{
	$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
	$dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);	
	$req = 'SELECT COUNT(*) AS `id_photo` FROM Photo';
	$stmt = $dbconn->prepare($req);
	$stmt->execute();
	$nb_pic = 6;
	$ret = $stmt->fetch(PDO::FETCH_OBJ);
	$nb_page = ceil($ret->id_photo / $nb_pic);
	echo $nb_page;
}
catch (PDOException $e)
{
	echo "Error: " . $e->getMessage();
}
?>