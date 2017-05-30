<?php
session_start();

if (isset($_POST['titre']))
{
	try
	{
		$DB_DSN = 'mysql:host=localhost;dbname=Cama_db';
		$DB_USER = 'root';
		$DB_PASSWORD = 'root';
		$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
		$dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$req = "SELECT * FROM `Like` WHERE `titre_photo` = '".$_POST['titre']."'";
		$stmt = $dbconn->prepare($req);
		$stmt->execute();
		$ret = $stmt->fetch(PDO::FETCH_ASSOC);
		if ($ret == NULL)
		{
			echo "0";
		}
		else
		{
			$req = "SELECT `like` FROM `Photo` WHERE `titre` = '".$_POST['titre']."'";
			$stmt = $dbconn->prepare($req);
			$stmt->execute();
			$count = $stmt->fetch(PDO::FETCH_ASSOC);
			echo $count['like'];
		}
	}
	catch (PDOException $e)
	{
		echo "Error: ".$e->getMessage();
	}
}

?>