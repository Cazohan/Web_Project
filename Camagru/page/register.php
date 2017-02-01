<?php
session_start();
?>
<html>
	<head>
		<meta charset="utf-8">
		<title>Inscription</title>
		<link rel="stylesheet" href="style.css">
	</head>
	
	<body>
		<div>
		<form method="post" action="../config/register_.php">
		<p>C'est quoi ton petit nom?</p>
		<input type="text" name="login" value="">
		<p>Sécurise moi ca !</p>
		<input type="password" name="passwd" value="">
		<p>Et si je doit te contacter?</p>
		<input type="text" name="mail" value=""><br/><br/>
		<input type="submit" name="go" value="Here We Go!">
		</form>
		</div>
	</body>
</html>