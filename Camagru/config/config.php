<?php 
try
{
$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
$sql = "CREATE TABLE `Cama_db`.`USER` ( `id` INT(5) NOT NULL AUTO_INCREMENT , 
	`login` VARCHAR(255) NOT NULL , 
	`passwd` VARCHAR(255) NOT NULL , 
	`mail` VARCHAR(255) NOT NULL , 
	`date_creation` DATE NOT NULL , 
	PRIMARY KEY (`id`)) ENGINE = InnoDB";
	$dbconn->exec($sql);
}
catch (PDOException $e)
{
	die('Erreur table ' . $e->getMessage());
}
?>