<?php
session_start();
//echo $_POST['login'] . ' '  . $_POST['passwd'] . ' ' . $_POST['submit'];
$DB_DSN = 'mysql:host=localhost;dbname=Cama_db';
$DB_USER = 'root';
$DB_PASSWORD = 'root';
$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
try
{
	if ($_POST['login'] != "" && $_POST['passwd'] != "" && $_POST['submit'] =="Avada_Kedavra")
	{
		$req = 'SELECT `login`, `passwd`, `admin` FROM `Users` WHERE `login` = :login';
		$stmt = $dbconn->prepare($req);
		$stmt->bindValue(':login', $_POST['login'], PDO::PARAM_STR);
		$stmt->execute();
		/*$requete = $dbconn->prepare("SELECT `login`, `passwd`, `admin` FROM `Users` WHERE `login` = :login");
		$requete->execute();*/
		$result_tmp = $stmt->fetchAll(PDO::FETCH_ASSOC);		
		$check = hash('whirlpool', $_POST['passwd']);
		//echo $check."<html><br/></html>";
		//print_r($result_tmp);
		foreach ($result_tmp as $key => $value)
		{
			if ($key == "login")
				$checkl = $value['login'];
			if ($key == "passwd")
				$checkp = $value['passwd'];
			if ($key == "admin")
					$_SESSION['admin'] = $value['admin'];
		}
		/*echo "1".$checkl."4".$_POST['login'];
		echo "2".$checkp."<html><br/></html>";
		echo "3".$check;
		echo $_SESSION['admin'];*/
		if ($checkl === $_POST['login'] && $checkp === $check)
		{
			$_SESSION['login'] = $_POST['login'];
			header ('Location: ../page/gallery.php');
		}
		else
			echo "<script>alert('Wrong id/passwd');
					window.location.href = ('../page/login.php');</script>";
	}
	else
			echo "<script>alert('Hummm.... forgot something?');
					window.location.href = ('../page/login.php');</script>";
}


catch (Expression $e)
{
	echo "Error" . $e->getMessage();
}
?>