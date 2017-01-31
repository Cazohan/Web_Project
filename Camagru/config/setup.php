<?php 
$password = "6a4e012bd9583858a5a6fa15f58bd86a25af266d3a4344f1ec2018b778f29ba83be86eb45e6dc204e11276f4a99eff4e2144fbe15e756c2c88e999649aae7d94";
try
{
	//$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
	$sql = "CREATE TABLE IF NOT EXISTS `Cama_db`.`Users` ( 
		`id_user` INT(5) NOT NULL AUTO_INCREMENT , 
		`login` VARCHAR(25) NOT NULL , 
		`passwd` VARCHAR(255) NOT NULL , 
		`mail` VARCHAR(245) NOT NULL , 
		`date_creation` DATE NOT NULL , 
		`admin` INT(1) NULL,
		PRIMARY KEY (`id_user`)) ENGINE = InnoDB";
	$dbconn->exec($sql);

	$sql = "CREATE TABLE IF NOT EXISTS `Cama_db`.`Photo` ( 
		`id_photo` INT(5) NOT NULL AUTO_INCREMENT , 
		`titre` VARCHAR(245) NOT NULL , 
		`src` TEXT NOT NULL , 
		`id_user` INT(5) NOT NULL , 
		`like` INT(5) NULL , 
		PRIMARY KEY (`id_photo`)) ENGINE = InnoDB";
	$dbconn->exec($sql);

	$sql = "CREATE TABLE IF NOT EXISTS `Cama_db`.`Img_base` ( 
		`id_img` INT(5) NOT NULL AUTO_INCREMENT , 
		`i_titre` VARCHAR(255) NOT NULL , 
		`i_src` TEXT NOT NULL , 
		PRIMARY KEY (`id_img`)) ENGINE = InnoDB";
	$dbconn->exec($sql);

	$sql = "CREATE TABLE IF NOT EXISTS `Cama_db`.`Comm` ( 
		`id_com` INT(5) NOT NULL AUTO_INCREMENT , 
		`id_photo` INT(5) NOT NULL , 
		`id_user` INT(5) NOT NULL , 
		`commentaire` VARCHAR(245) NOT NULL , 
		PRIMARY KEY (`id_com`)) ENGINE = InnoDB"; 
	$dbconn->exec($sql);

	$sql = "INSERT INTO `Cama_db`.`Users` (id_user, login, passwd, mail, date_creation, admin) VALUES ('1', 'Cazohan','".$password."', 'herbelot.lilian@gmail.com', 'NOW()', '1')";
	$dbconn->exec($sql);
}
catch (Exception $e)
{
	die('Erreur table ' . $e->getMessage());
}
?>