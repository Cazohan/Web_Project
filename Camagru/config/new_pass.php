<?php
session_start();

function pass_mail($mail, $user, $new_pass) {
	$objet = "Réinitialisation de Mot de passe";
	$content = '
	<html>
	<body>
		<h1>Vous avez demander un nouveau mot de passe '.$user.'</h1><br/><br/>
		<p>Voici votre nouveau mot de passe : '.$new_pass.'.
		<br/><br/>See you!</p>
	</body>
	</html>';
	$entete = 'Content-type: text/html; charset=utf-8' . "\r\n" .
				'From: lherbelo@student.42.fr' . "\r\n" .
				'Reply-To: lherbelo@student.42.fr' . "\r\n" .
				'X-Mailer: PHP/' . phpversion();
	mail($mail, $objet, $content, $entete);
}

try
{
	$DB_DSN = 'mysql:host=localhost;dbname=Cama_db';
	$DB_USER = 'root';
	$DB_PASSWORD = 'root';
	$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
	$dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	if (isset($_POST['mail']) && isset($_POST['login']))
	{
		$req = "SELECT `mail` FROM `Users` WHERE `mail` = :mail AND `login` = :login";
		$stmt= $dbconn->prepare($req);
		$stmt->bindValue(':mail', htmlspecialchars($_POST['mail']), PDO::PARAM_STR);
		$stmt->bindValue(':login', htmlspecialchars($_POST['login']), PDO::PARAM_STR);
		$stmt->execute();
		$ret = $stmt->fetch(PDO::FETCH_ASSOC);
		if ($ret == NULL)
		{
			echo "<script>alert('Combinaison Inconnue');
					window.location.href = ('../page/get_passwd.php');</script>";
		}
		else
		{
			$new_pass = uniqid()."_A";
			$new_hash = hash('whirlpool', $new_pass);
			$req = "UPDATE `Users` SET `passwd` = '".$new_hash."' WHERE `login` = :login";
			$stmt = $dbconn->prepare($req);
			$stmt->bindValue(':login', htmlspecialchars($_POST['login']), PDO::PARAM_STR);
			$stmt->execute();
			pass_mail(htmlspecialchars($_POST['mail']), htmlspecialchars($_POST['login']), $new_pass);
			echo "<script>alert('Réinitialisation réussi');
				window.location.href = ('../page/log.php')</script>";
		}
	}
	else
	{
		echo "<script>alert('Mdp ou Login manquant');
			window.location.href = ('../page/get_passwd.php');</script>";
	}
}
catch (PDOException $e)
{
	echo "Error: ".$e->getMessage();
}
?>