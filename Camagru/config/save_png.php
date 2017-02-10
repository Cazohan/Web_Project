<?php
$data = isset($_POST['image']);
$data = base64_decode($data);
$im = imagecreatefromstring($data);
header('Content-Type: image/png');
imagepng($im);
file_put_contents('../save_photo/test2.png', $im);


/*
$DB_DSN = 'mysql:host=localhost;dbname=Cama_db';
$DB_USER = 'root';
$DB_PASSWORD = 'root';
$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
try
{
	$req = "INSERT INTO `Photo`(id_photo, titre, src, id_user, jaime) VALUES (1, 'test', '".$data."', 2, 3)";
	$stmt = $dbconn->prepare($req);
	$stmt->execute();
}
catch (Exception $e)
{
	die('Erreur add ' . $e->getMessage());
}*/
?>