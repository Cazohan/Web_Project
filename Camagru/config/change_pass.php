<?php
session_start();
try 
{
	$DB_DSN = 'mysql:host=localhost;dbname=Cama_db';
	$DB_USER = 'root';
	$DB_PASSWORD = 'root';
	$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
	$dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	if (isset($_POST['oldpass']) && isset($_POST['new_pass']) && isset($_POST['conf_pass']))
	{
		$old = htmlspecialchars($_POST['oldpass']);
		$new = htmlspecialchars($_POST['new_pass']);
		$conf = htmlspecialchars($_POST['conf_pass']);
		$user = $_SESSION['login'];
		if ($new == $conf)
		{
			if (!preg_match('#(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.\w)#', $new))
			{
				echo "<script>alert('Mot de passe invalide');
				window.location.href = ('../page/account.php');</script>";	
			}
			else
			{
				$req = "UPDATE `Users` SET `passwd` = :new WHERE `login` = :login AND `passwd` = :old";
				$stmt = $dbconn->prepare($req);
				$old_hash = hash('whirlpool', $old);
				$new_hash = hash('whirlpool', $new);
				$stmt->bindValue(':new', $new_hash, PDO::PARAM_STR);
				$stmt->bindValue(':login', $user, PDO::PARAM_STR);
				$stmt->bindValue(':old', $old_hash, PDO::PARAM_STR);
				$stmt->execute();
				echo "<script>alert('Succes!');
					window.location.href = ('../page/gallery.php')</script>";
			}
		}
		else
		{
			echo "<script>alert('Confirmation incorrect');
			window.location.href = ('../page/account.php');</script>";		
		}

	}
	else
	{
		echo "<script>alert('Champs incomplet');
			window.location.href = ('../page/account.php');</script>";
	}
}
catch (PDOException $e)
{
	echo "Error: ".$e->getMessage();
}
?>


<!-- window.location.href = ('../page/gallery.php'); -->