<?php 
session_start();
 ?>
<html>
	<head>
		<meta charset='utf-8'/>
		<title>Camagru_42</title>
		<link rel='stylesheet' href='style.css'/> 
	</head>
	<body>
		<h1 class="h_compte">Compte</h1>
		<br/>
			<div class="flexband">
 			<a href="gallery.php"><button class="flexbut">Galerie</button></a>
 		</div>
 		<br/><br/>
 		<div class="form_pass">
		<p> Tu veut changer de mot de passe ?<br/>
		<form method="post" action="../config/change_pass.php">
		Ancien mot de passe: <br/>
		<input type="password" name="oldpass" value=""><br/>
		Nouveau mot de passe: <br/>
		<input type="password" name="new_pass" pattern=".{6,}" required title="6 caracteres minimum, inclus chiffres, majuscules et caracteres spéciaux" value=""><br/>
		Encore une fois: <br/>
		<input type="password" name="conf_pass" pattern=".{6,}" required title="6 caracteres minimum, inclus chiffres, majuscules et caracteres spéciaux" value=""><br/><br/>
		<input type="submit" name="change" value="changeage">
		</form></p>
		</div>
	</body>
</html>
