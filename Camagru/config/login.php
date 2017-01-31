<?php
session_start();

if ($_POST['login'] != "" && $_POST['passwd'] != "" && $_POST['submit'] == "Avada_Kedavra")
{
	$requete = $_SESSION['dbconn']->query("SELECT `login`, `passwd` FROM `Users` WHERE `login` = '".$_POST['login']."'");
	while ($log = $requete->fetch())
	{
		$hpass = hash('whirlpool', $log['passwd']);
		if ($log['login'] == $_POST['login'])
		{
			if ($log['passwd'] == $_POST['passwd'])
			{
				$_SESSION['login'] = $log['login'];
			}
			if ($log['admin'] == 1)
				$_SESSION['admin'] == 1;
			echo "Coucou".$_SESSION['login']."\n"; 
		}
	}
}
else
{
	$requete = $_SESSION['$dbconn']->query("SELECT `login`, `passwd` FROM `Users` WHERE `login` = '".$_POST['login']."'");
	while ($log = $requete->fetch())
	{
		print_r($log);
	}
	echo "Miss something\n";
}
?>