<?php
session_start();

function get_mail($mail, $log){
	$objet = "Confirmation d'Inscription";
	$content = '
	<html>
	<head>
		<title>Inscription Réussi !</title>
	</head>
	<body>
		<h1>Bienvenue parmis nous '.$log.'</h1><br/><br/>
		<p>Bravo ta réussi a t'."'".'inscrire !!</p><br/><br/>
		<p>Tu veut une médaille?</p>
	</body>
	</html>';
	$entete = 'Content-type: text/html; charset=utf-8' . "\r\n" .
				'From: lherbelo@student.42.fr' . "\r\n" .
				'Reply-To: lherbelo@student.42.fr' . "\r\n" .
				'X-Mailer: PHP/' . phpversion();
	mail($mail, $log, $content, $entete);
}

$DB_DSN = 'mysql:host=localhost;dbname=Cama_db';
$DB_USER = 'root';
$DB_PASSWORD = 'root';
$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
try
{
	if ($_POST['login'] != "" && $_POST['passwd'] != "" && $_POST['mail'] != "" && $_POST['go'])
	{
		$requete = $dbconn->prepare("SELECT `login` FROM `Users` WHERE `login` = '".$_POST['login']."'");
		$requete->execute();
		$result = $requete->fetchAll(PDO::FETCH_ASSOC);
		if (count($result) == 1)
		{
			echo "<script>alert('Pseudo indisponible');
			window.location.href = ('../page/register.php')</script>";
		}
		else
		{
			$pass = hash('whirlpool', $_POST['passwd']);
			$add = $dbconn->prepare("INSERT INTO `Users`(login, passwd, mail, date_creation, admin) VALUES ('".$_POST['login']."', '".$pass."', '".$_POST['mail']."', CURDATE(), '0')");
			$add->execute();
			$_SESSION['login'] = $_POST['login'];
			$_SESSION['admin'] = 0;
			get_mail($_POST['mail'], $_POST['login']);
			header ('Location: ../page/gallery.php');
		}
	}

}

catch (Expression $e)
{
	echo "Error" . $e->getMessage();	
}