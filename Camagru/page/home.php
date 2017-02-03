<?php
session_start();
if ($_SESSION['login'] != "")
	header('Location: gallery.php');
?>
<html>
	<head>
		<meta charset='utf-8'/>
		<title>Camagru_42</title>
		<link rel='stylesheet' href='style.css'/> 
	</head>
	<body>
		<h1 class='home'>Bienvenue !</h1>
		<div class='home'>
			<p>Tout doux minou. Déja inscrit?<br/>
			<a href='login.php'><input type='submit' value='Connection'></a><br/><br/><br/>
			Inscrit toi, tout va bien ce passer.<br/>
			<a href='register.php'><input type='submit' value='Inscription'></a></p> 
		</div>
	</body>
</html>