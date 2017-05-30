<?php
session_start();
?>
<html>
	<head>
		<meta charset="utf-8">
		<title>Gallery</title>
		<link rel="stylesheet" href="style.css">
		<script type="text/javascript" src="../config/pagination.js"></script>
	</head>
	<body>
		<div id="delire">
		<h1 class="gallery">Welcome <?php echo $_SESSION['login'];?></h1>
		<div class="flexband">
 			<button class="flexbut" onclick="auth()">Photo</button>
 			<?php if ($_SESSION['login'] != "Guest") {
 				echo "<a href='account.php'><button class='flexbut'>Compte</button></a>";}
 				else {
 					echo "<a href='log.php'><button class='flexbut'>Connexion</button></a>";}
 				?>
 		</div>
		<div class="button_log"><a class="logo" href="../config/check.php" title="connexion"><img class="co" src="../res/connect.png" alt="log/delog" title="login/logout"/></a><p id="cur_user"><?php echo $_SESSION['login'];?></p></div>
		</div>
		<!-- <div class="tofo"><button id="select"></button></div> -->
		<div id="gallerie" class="pagination">
			<ul id="mini_galerie">
			<li>
				<img id="preview" class="img0" src="" title="" alt="" />
			</li>
			<li>
				<img id="preview" class="img1" src="" title="" alt="" />
			</li>
			<li>
				<img id="preview" class="img2" src="" title="" alt="" />
			</li>
			<li>
				<img id="preview" class="img3" src="" title="" alt="" />
			</li>
			<li>
				<img id="preview" class="img4" src="" title="" alt="" />
			</li>
			<li>
				<img id="preview" class="img5" src="" title="" alt="" />
			</li>
			</ul>
			<div id="commi" class="aff">
			
			<form id="cacher" class="commentaire">
				<img id="cross" src="../res/red_cross.png" alt="cross" title="cross" onclick="erase()"/>
				<img id="finish" name="pho" src="" alt="" title=""/>
				
				<img id="like" src="../res/check_green.png" alt="pic_like" title="like" onclick="put_like()"/><span>  </span><span id="nb_like"></span><br/>
				<label for="comment">Un avis? | 80 car max</label><br/>
				<textarea id="texting" name="comment" maxlength="80"></textarea><br/>
				<input type="button" value="Envoie" onclick="put_com()"/>
				</form>
			</div>
			
		
		</div>
		
		
<!-- <script type="text/javascript" src="../config/gallery.js"></script> -->
</body>
</html>