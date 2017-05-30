<?php
session_start();
?>
<html>
<head>
	<meta charset="utf-8">
	<title>Compte</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<h1 class="h_compte">Nouveau Pass</h1>
	<br/>
	<br/>
	<div class="flexband">
 		<a href="gallery.php"><button class="flexbut">Galerie</button></a>
 	</div>
 	<div class="ch_pass">
 		<br/>
		<p><form method="post" action="../config/new_pass.php">
		Login :<br/>
		<input type="text" name="login" value=""/><br/><br/>
		Adresse mail :<br/>
		<input type="text" name="mail" value=""/><br/><br/></p>
		<input type="submit" name="Nouveau pass" value="Appliquer" />
		</form></p>
	</div>
</body>
</html>