<?php
session_start();
?>
<html>
	<head>
		<meta charset="utf-8">
		<title>Montage</title>
		<link rel="stylesheet" href="style.css">
		<script type="text/javascript" src="../config/save_png.js"></script>
	</head>
	
	<body>
	<div cass="full">
	<div class="hmont">
	<h1>Testing Mounting</h1>
	</div>
	<button id="camera">Camera</button>
	<div class="flexm">
		<div class="main">
		<video id="video"></video>
		<button id="sbutton">Take picture</button>
		<canvas id="canvas"></canvas>
		</div>
		<div class="side">la</div>
	</div>
	<div class="apercu">
		<img src="" id="photo" alt="photo">
		<button id="save" onclick="save_png()">Enregistrer?</button>
	</div>
	<div class="footer">where</div>
	</div>
	<script type="text/javascript" src="../config/takepicture.js"></script>
</body>
</html>