<?php
session_start();
?>
<html>
	<head>
		<meta charset="utf-8">
		<title>Montage</title>
		<link rel="stylesheet" href="style.css">
	</head>
	
	<body>
	<div cass="full">
	<div class="hmont">
	<h1>Testing Mounting</h1>
	</div>
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
	</div>
	<div class="footer">where</div>
	</div>
	<script type="text/javascript" src="../config/takepicture.js"></script>
</body>
</html>