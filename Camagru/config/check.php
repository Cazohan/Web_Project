<?php
session_start();

if ($_SESSION['login'] === "Guest")
	header('Location: ../page/home.php');
else
{
	echo "<script>
	var r= confirm('Vous ete sur?');
	if (r == true)
		window.location.href = ('../index.php');
	else
		window.location.href = ('../page/gallery.php');</script>";
}
?> 