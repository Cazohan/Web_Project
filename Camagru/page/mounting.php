<?php
session_start();
if ($_SESSION['login'] == "Guest")
	header('Location: page/gallery.php');	
?>
<html>
	<head>
		<meta charset="utf-8">
		<title>Montage</title>
		<link rel="stylesheet" href="style.css">
		<script type="text/javascript" src="../config/picture.js"></script>
		<!-- <script type="text/javascript" src="../config/save_png.js"></script> -->
	</head>
	
	<body>
	<div class="hmont">
	<h1>Photo-Montage</h1>
	</div>
 	<div class="main">
 		<div class="flexband">
 			<a href="gallery.php"><button class="flexbut">Gallerie</button></a>
 			<a href="account.php"><button class="flexbut">Compte</button></a>
 		</div>
 		<div class="png">
			<input type="radio" name="png" value="ret" src="../res/ret.png"><img src="../res/ret.png" alt="png ret" title="ret" height="60" width="60">
			<input type="radio" name="png" value="cat" src="../res/cat.png">	<img src="../res/cat.png" alt="cat png" title="le chat" height="60" width="60">
			<input type="radio" name="png" value="beard" src="../res/beard.png"><img src="../res/beard.png" alt="beard png" title="la barbe" height="60" widht="60">
			<input type="button" value="add it" onclick="check()">
			<br/>
			<label for="persoup">Fichier perso:</label><br/>
			<button id="came" onclick="camera();">Camera</button>
			<input type="file" name="persoup" id="file" accept="image/png" onchange="addpng()" />
		</div>
		<br/>
			<button id="sbutton" onclick="takepicture()" disabled>Take picture</button>
	<div class="test">
		<div class="parent">
			<video id="video" class="super"></video>
			<img id="imadd" class="super" src=""/>
			<canvas id="canvas"></canvas>
		</div>
	<div class="apercu">
		<button id="save" onclick="save_png()" disabled>Enregistrer?</button>
		<img src="" id="photo" class="sup2" title=""/>
		<img  id="prev2" class="sup2" src="" />
	</div>
	</div>
	</div>
	<!-- <div class="footer">where</div>
 -->	
	<!-- <script type="text/javascript" src="../config/takepicture.js"></script> -->
	<!-- <script type="text/javascript" src="../config/picture.js"></script> -->
</body>
</html>