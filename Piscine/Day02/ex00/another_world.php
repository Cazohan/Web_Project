#!/usr/bin/php
<?php
if ($argv[1])
{
	$str = preg_replace('!\s+!', ' ', $argv[1]);
	echo "$str\n";
}	
?>