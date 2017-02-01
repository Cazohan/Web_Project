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
		<h1 class="gallery">Welcome <?php echo $_SESSION['login'];?></h1>


</body>
</html>