<?php
session_start();

if ($_SESSION['login'] != "Guest")
{
	echo "<script>
	var r= confirm('Déconnexion?');
	if (r == true)
		window.location.href = ('../index.php');
	else
		window.location.href = ('../page/gallery.php');</script>";
}
else
	echo "<script>window.location.href = ('../page/gallery.php');</script>";
?> 