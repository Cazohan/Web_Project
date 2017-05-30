<?php
session_start();
try
{
	$DB_DSN = 'mysql:host=localhost;dbname=Cama_db';
	$DB_USER = 'root';
	$DB_PASSWORD = 'root';
	$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
	$dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	if (isset($_POST['titre']))
	{
		$req = "SELECT `user`, `commentaire` FROM `Comm` WHERE `titre` = '".$_POST['titre']."'";
		$stmt = $dbconn->prepare($req);
		$stmt->execute();
		$ret = $stmt->fetchAll(PDO::FETCH_ASSOC);
		if ($ret == NULL)
			echo "Nothing";
		else
		{
			// print_r($ret);
			echo json_encode($ret);
		}
	}
}
catch (PDOException $e)
{
	echo "Error: ".$e->getMEssage();
}
?>