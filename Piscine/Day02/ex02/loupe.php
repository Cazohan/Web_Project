#!/usr/bin/php
<?php
$fd = fopen($argv[1], "r");
while ($fd)
	echo fgets($fd);

fclose($fd);
?>