<?php
$DB_DSN = 'mysql:host=localhost;';
$DB_USER = 'root';
$DB_PASSWORD = 'root';

$dbconn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
$sql = "DROP DATABASE `Cama_db`";
$dbconn->exec($sql);
echo "database deleted";

?>