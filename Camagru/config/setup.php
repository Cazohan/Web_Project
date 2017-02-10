<?php
session_start(); 
try
{
	$DB_DSN = 'mysql:host=localhost;dbname=Cama_db';
	$DB_USER = 'root';
	$DB_PASSWORD = 'root';
	$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
	
	$passwd = hash('whirlpool', 'admin');
	$sql = "CREATE TABLE IF NOT EXISTS `Users` ( 
		`id_user` INT(5) NOT NULL AUTO_INCREMENT , 
		`login` VARCHAR(25) NOT NULL , 
		`passwd` TEXT NOT NULL , 
		`mail` VARCHAR(245) NOT NULL , 
		`date_creation` DATE NOT NULL , 
		`admin` INT(1) NULL,
		PRIMARY KEY (`id_user`)) ENGINE = InnoDB";
	$dbconn->exec($sql);

	$sql = "CREATE TABLE IF NOT EXISTS `Photo` ( 
		`id_photo` INT(5) NOT NULL AUTO_INCREMENT , 
		`titre` VARCHAR(245) NOT NULL , 
		`src` LONGBLOB NOT NULL , 
		`id_user` INT(5) NOT NULL , 
		`jaime` INT(5) NULL , 
		PRIMARY KEY (`id_photo`)) ENGINE = InnoDB";
	$dbconn->exec($sql);

	$sql = "CREATE TABLE IF NOT EXISTS `Img_base` ( 
		`id_img` INT(5) NOT NULL AUTO_INCREMENT , 
		`i_titre` VARCHAR(255) NOT NULL , 
		`i_src` TEXT NOT NULL , 
		PRIMARY KEY (`id_img`)) ENGINE = InnoDB";
	$dbconn->exec($sql);

	$sql = "CREATE TABLE IF NOT EXISTS `Comm` ( 
		`id_com` INT(5) NOT NULL AUTO_INCREMENT , 
		`id_photo` INT(5) NOT NULL , 
		`id_user` INT(5) NOT NULL , 
		`commentaire` VARCHAR(245) NOT NULL , 
		PRIMARY KEY (`id_com`)) ENGINE = InnoDB"; 
	$dbconn->exec($sql);

	$sql = "INSERT INTO `Users` (id_user, login, passwd, mail, date_creation, admin) VALUES (1, 'Cazohan', '".$passwd."', 'herbelot.lilian@gmail.com', CURDATE(), 1)";
	$dbconn->exec($sql);
	//print_r($dbconn->errorInfo());
}
catch (Exception $e)
{
	die('Erreur table ' . $e->getMessage());
}
?>