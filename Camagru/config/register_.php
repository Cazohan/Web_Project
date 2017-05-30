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
	mail($mail, $objet, $content, $entete);
}


$DB_DSN = 'mysql:host=localhost;dbname=Cama_db';
$DB_USER = 'root';
$DB_PASSWORD = 'root';
$pattern_pass = '#(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.\w)#';
$pattern_mail = '#^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$#';
try
{
	$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
	$dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	if ($_POST['login'] != "" && $_POST['passwd'] != "" && $_POST['mail'] != "" && $_POST['go'])
	{
		if (!preg_match($pattern_pass, $_POST['passwd']) || !preg_match($pattern_mail, $_POST['mail']))
		{
			echo "<script>alert('Mot de passe/mail invalide');
				window.location.href = ('../page/register.php');</script>";
		}
		else
		{
			$req = 'SELECT `login` FROM `Users` WHERE `login` = :login';
			$stmt =  $dbconn->prepare($req);
			$stmt->bindValue(':login', htmlspecialchars($_POST['login']), PDO::PARAM_STR);
			$stmt->execute();
			/*
			$requete = $dbconn->prepare("SELECT `login` FROM `Users` WHERE `login` = '".$_POST['login']."'");
			$requete->execute();*/
			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			if ($result['login'] == $_POST['login'])
			{
				echo "<script>alert('Pseudo indisponible');
					window.location.href = ('../page/register.php');</script>";
			}
			else
			{
				$pass = hash('whirlpool', $_POST['passwd']);
				$add = 'INSERT INTO `Users`(login, passwd, mail, date_creation, admin) VALUES (:login, :passwd, :mail, CURDATE(), 0)';
				$stmt = $dbconn->prepare($add);
				$stmt->bindValue(':login', htmlspecialchars($_POST['login']), PDO::PARAM_STR);
				$stmt->bindValue(':passwd', htmlspecialchars($pass), PDO::PARAM_STR);
				$stmt->bindValue(':mail', htmlspecialchars($_POST['mail']), PDO::PARAM_STR);
				$stmt->execute();
				$_SESSION['login'] = htmlspecialchars($_POST['login']);
				$_SESSION['admin'] = 0;
				get_mail($_POST['mail'], $_POST['login']);
				header ('Location: ../page/gallery.php');
			}
		}
	}
}

catch (PDOException $e)
{
	echo "Error" . $e->getMessage();	
}
?>