<?php
session_start(); 
try
{
	$DB_DSN = 'mysql:host=localhost;dbname=Cama_db';
	$DB_USER = 'root';
	$DB_PASSWORD = 'root';
	$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
	$dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	$passwd = hash('whirlpool', 'admin');
	$sql = "CREATE TABLE IF NOT EXISTS `Users` ( 
		`id_user` INT(5) NOT NULL AUTO_INCREMENT , 
		`login` VARCHAR(250) NOT NULL , 
		`passwd` TEXT NOT NULL , 
		`mail` VARCHAR(245) NOT NULL , 
		`date_creation` DATE NOT NULL , 
		`admin` INT(1) NULL,
		PRIMARY KEY (`id_user`)) ENGINE = InnoDB";
	$stmt = $dbconn->prepare($sql);
	$stmt->execute();

	$sql = "CREATE TABLE IF NOT EXISTS `Photo` ( 
		`id_photo` INT(5) NOT NULL AUTO_INCREMENT , 
		`titre` VARCHAR(245) NOT NULL , 
		`src` TEXT NOT NULL , 
		`login` VARCHAR(245) NOT NULL ,
		`like` int(5) NOT NULL ,
		PRIMARY KEY (`id_photo`)) ENGINE = InnoDB";
	$stmt = $dbconn->prepare($sql);
	$stmt->execute();

	$sql = "CREATE TABLE IF NOT EXISTS `Comm` ( 
		`id_com` INT(5) NOT NULL AUTO_INCREMENT , 
		`user` VARCHAR(245) NOT NULL , 
		`photo_user` VARCHAR(245) NOT NULL ,
		`titre` VARCHAR(245) NOT NULL ,
		`commentaire` TEXT NOT NULL , 
		PRIMARY KEY (`id_com`)) ENGINE = InnoDB"; 
	$stmt = $dbconn->prepare($sql);
	$stmt->execute();

	$sql = "CREATE TABLE IF NOT EXISTS `Like` (
		`id` INT(5) NOT NULL AUTO_INCREMENT ,
		`user` VARCHAR(245) NOT NULL ,
		`titre_photo` VARCHAR(245) NOT NULL ,
		PRIMARY KEY (`id`)) ENGINE = InnoDB";
	$stmt = $dbconn->prepare($sql);
	$stmt->execute();

	$sql = 'SELECT `login` FROM `Users` WHERE `login` = "Cazohan"';
	$stmt = $dbconn->prepare($sql);
	$stmt->execute();
	$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

	if(!$result)
	{
		$sql = "INSERT INTO `Users` (login, passwd, mail, date_creation, admin) VALUES ('Cazohan', '".$passwd."', 'herbelot.lilian@gmail.com', CURDATE(), 1)";
		$stmt = $dbconn->prepare($sql);
		$stmt->execute();
	}

	
}
catch (PDOException $e)
{
	die('Erreur table ' . $e->getMessage());
}
?>