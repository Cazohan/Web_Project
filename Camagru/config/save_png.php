<?php
session_start();
header("Content-type: image/png");

function create_png($input) {
	$pathtmp = "../save_photo/";
	$file = scandir($pathtmp, 0);
	$i = 1;
	foreach($file as $n)
		$i += 1;
	$pathtmp = $pathtmp."".$_SESSION['login']."tmp".$i++.".png";
	$parts = explode(',', $input);
	$data = $parts[1];
	$data = base64_decode($data);
	file_put_contents($pathtmp, $data);
	list($w_dest, $h_dest) = getimagesize($pathtmp);
	if ($w_dest > 400 || $h_dest > 300)
	{
		$n_width = 400;
		$n_height = 300;
		$resize = imagecreatetruecolor($n_width, $n_height);
		$sources = imagecreatefrompng($pathtmp);
		imagecopyresized($resize, $sources, 0, 0, 0, 0, $n_width, $n_height, $w_dest, $h_dest);
		imagepng($resize, $pathtmp);
	}
	return ($pathtmp);
}

function fuse_png($dest, $src) {
	$path = "../save_photo/".$_SESSION['login']."/";
	if (!file_exists($path))
		mkdir($path);
	$name = $_SESSION['login'].uniqid();
	$path = $path."".$name.".png";
	$source = imagecreatefrompng($src);
	$destination = imagecreatefrompng($dest);
	$larg_src = imagesx($source);
	$haut_src = imagesy($source);
	$larg_dest = imagesx($destination);
	$haut_dest = imagesy($destination);
	$src_x = 0;
	$src_y = 0;
	if ($src == "../res/beard.png")
	{
		$src_x = ($larg_dest / 2) - ($larg_src / 2);
		$src_y = ($haut_dest / 2) - ($haut_src / 2);
	}
	imagecopy($destination, $source, $src_x, $src_y, 0, 0, $larg_src, $haut_src);
	imagepng($destination, $path);
	unlink($dest);
	$DB_DSN = 'mysql:host=localhost;dbname=Cama_db';
	$DB_USER = 'root';
	$DB_PASSWORD = 'root';
	try
	{
		$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
		$dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		echo "test";
		$req = "INSERT INTO `Photo` (`titre`, `src`, `login`, `like`) VALUES ('".$name."', '".$path."', '".htmlspecialchars($_SESSION['login'])."', 0)";
		$stmt = $dbconn->prepare($req);
		$stmt->execute();
		
	}
	catch (PDOException $e)
	{
		echo "Error" . $e->getMessage();
	}
}

if (isset($_POST['photo']) && isset($_POST['png']))
{
	$dest = create_png($_POST['photo']);
	$res = fuse_png($dest, $_POST['png']);
}
?>