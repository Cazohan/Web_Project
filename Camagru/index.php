<?php
session_start();

$_SESSION['login'] = "";
$_SESSION['admin'] = 0;

include('config/database.php');
include('config/setup.php');
header('Location: page/home.php');
?>