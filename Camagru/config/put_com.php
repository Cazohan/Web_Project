<?php 

function mail_comment($user, $titre, $comment, $mail)
{
	$objet = "Nouveau commentaire";
	$content = '
	<html>
	<body>
		<h1>'.$user.' a commenté votre photo</h1><br/><br/>
		<p>Sur votre photo '.$titre.' <br/>
		Comment:'.$comment.'.
		<br/><br/>
		C\'est cadeau.</p>
	</body>
	</html>';
	$entete = 'Content-type: text/html; charset=utf-8' . "\r\n" .
				'From: lherbelo@student.42.fr' . "\r\n" .
				'Reply-To: lherbelo@student.42.fr' . "\r\n" .
				'X-Mailer: PHP/' . phpversion();
	mail($mail, $objet, $content, $entete);
}

if (isset($_POST['cur_user']) && isset($_POST['aut_photo']) && isset($_POST['titre']) && isset($_POST['comment']))
{
	$user = htmlspecialchars($_POST['cur_user']);
	$aut = htmlspecialchars($_POST['aut_photo']);
	$titre = htmlspecialchars($_POST['titre']);
	$comment = htmlspecialchars($_POST['comment']);
	try
	{
		$DB_DSN = 'mysql:host=localhost;dbname=Cama_db';
		$DB_USER = 'root';
		$DB_PASSWORD = 'root';
		$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
		$dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$req = 'INSERT INTO `Comm`(`user`, `photo_user`, `titre`, `commentaire`) VALUES (:user, :aut, :titre, :comment)';
		$stmt = $dbconn->prepare($req);
		$stmt->bindValue(':user', $user, PDO::PARAM_STR);
		$stmt->bindValue(':aut', $aut, PDO::PARAM_STR);
		$stmt->bindValue(':titre', $titre, PDO::PARAM_STR);
		$stmt->bindValue(':comment', $comment, PDO::PARAM_STR);
		$stmt->execute();
		$req = 'SELECT `mail` FROM `Users` WHERE `login` = :user';
		$stmt = $dbconn->prepare($req);
		$stmt->bindValue(':user', $aut, PDO::PARAM_STR);
		$stmt->execute();
		$ret = $stmt->fetch(PDO::FETCH_ASSOC);
		mail_comment($user, $titre, $comment, $ret['mail']);
	}
	catch (PDOException $e)
	{
		echo "Error: ".$e->getMEssage();
	}
}
else
{
	echo "<script>alert('Humm... je dirais bien qu'on as un souci');
		window.location.href = ('../page/mounting.php');</script>";
}
?> 