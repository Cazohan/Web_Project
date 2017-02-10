<?php
session_start();
?>
<html>
	<head>
		<meta charset="utf-8">
		<title>Gallery</title>
		<link rel="stylesheet" href="style.css">
	</head>
	<body>
		<div>
		<h1 class="gallery">Welcome <?php echo $_SESSION['login'];?></h1>
		<div class="button_log"><a class="logo" href="../config/check.php" title="connexion"><img class="co" src="../res/connect.png" alt="log/delog" title="lien connection"/></a><p class="cur_user"><?php echo $_SESSION['login'];?></p></div>
		</div>
		<div>
		<p>Tu veut prendre une petite photo?<br/>C'est par ici</p>
		<a href="mounting.php"><button>Photo</button></a>
		</div>
		

</body>
</html>