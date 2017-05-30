<?php
session_start();
$DB_DSN = 'mysql:host=localhost;dbname=Cama_db';
$DB_USER = 'root';
$DB_PASSWORD = 'root';
try
{
	$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
	$dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	if ($_POST['login'] != "" && $_POST['passwd'] != "" && $_POST['submit'] =="Avada_Kedavra")
	{
		$req = 'SELECT `login`, `passwd`, `admin` FROM `Users` WHERE `login` = :login';
		$stmt = $dbconn->prepare($req);
		$stmt->bindValue(':login', htmlspecialchars($_POST['login']), PDO::PARAM_STR);
		$stmt->execute();
		$result_tmp = $stmt->fetchAll(PDO::FETCH_ASSOC);		
		$check = hash('whirlpool', htmlspecialchars($_POST['passwd']));
		foreach ($result_tmp as $key => $value)
		{
			if ($key == "login")
				$checkl = $value['login'];
			if ($key == "passwd")
				$checkp = $value['passwd'];
			if ($key == "admin")
					$_SESSION['admin'] = $value['admin'];
		}
		if ($checkl === $_POST['login'] && $checkp === $check)
		{
			$_SESSION['login'] = htmlspecialchars($_POST['login']);
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


catch (PDOException $e)
{
	echo "Error" . $e->getMessage();
}
?>