<?php
try
{
	$DB_DSN = 'mysql:host=localhost;dbname=Cama_db';
	$DB_USER = 'root';
	$DB_PASSWORD = 'root';
	$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
	$dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	if (isset($_POST['user']) && isset($_POST['titre']))
	{
		$req = "DELETE FROM `Photo` WHERE `login` = :login AND `titre` = :titre";
		$stmt = $dbconn->prepare($req);
		$stmt->bindValue(':login', $_POST['user'], PDO::PARAM_STR);
		$stmt->bindValue(':titre', $_POST['titre'], PDO::PARAM_STR);
		$stmt->execute();
		echo "ok";
	}

}
catch (PDOException $e)
{
	echo "Error: ".$e->getMessage();
}
?>
