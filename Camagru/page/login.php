<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Connecting</title>
	<link rel="stylesheet" href="style.css">
</head>

<body>
		<h1 class="h_compte">Qui est tu ?</h1>
		<br/>
		<div class="flexband">
 		<a href="gallery.php"><button class="flexbut">Galerie</button></a>
 		</div><br/>
		<div class="ch_pass">
		<form method="post" action="../config/login_.php">
		<p>On se connait?<br/>
		<input type="text" name="login" value=""><br/><br/><br/>
		Le petit mot magique?<br/>
		<input type="password" name="passwd" value=""><br/><br/><br/>
		<input type="submit" name="submit" value="Avada_Kedavra" ></p>
		</form>
		<a class="kassos" href="register.php" title="enregistre-toi">Toi, ta cliqué sans lire. non?</a>
	</div>
</body>
</html>