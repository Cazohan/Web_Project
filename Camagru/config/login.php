<?php
session_start();
//echo $_POST['login'] . ' '  . $_POST['passwd'] . ' ' . $_POST['submit'];
$DB_DSN = 'mysql:host=localhost;dbname=Cama_db';
$DB_USER = 'root';
$DB_PASSWORD = 'root';
$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
try
{
	if ($_POST['login'] != "" && $_POST['passwd'] != "" && $_POST['submit'] =="OK")
	{
		$requete = $dbconn->prepare("SELECT `passwd`, `admin` FROM `Users` WHERE `login` = '".$_POST['login']."'");
		$requete->execute();
		$result_tmp = $requete->fetchAll(PDO::FETCH_ASSOC);		
		$check = hash('whirlpool', $_POST['passwd']);
		//echo $check."<html><br/></html>";
		//print_r($result_tmp);
		foreach ($result_tmp as $key => $value)
		{
			if ($key == "passwd")
			{
				if ($value['passwd'] === $check)
					$_SESSION['login'] = $_POST['login'];
				else 
				{
					header ('Location: ../page/login.html');
					exit();
					//echo "connection fail<html><br/></html>";
					
				}

			}
			if ($key == "admin")
			{
				if ($value['admin'])
					$_SESSION['admin'] = $value['admin'];
			}
		}
	}
	//echo "connection succed<html><br/></html>";
	//echo "Welcome ". $_SESSION['login'] . "admin? " .  $_SESSION['admin'];
}
catch (Expression $e)
{
	echo "Error" . $e->getMessage();
}
?>