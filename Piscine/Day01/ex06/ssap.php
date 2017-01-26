#!/usr/bin/php
<?php

function ft_split($str)
{
	$tab = array();
	$entry = explode(" ", $str);
	foreach ($entry as $value) 
	{
		if ($value != "")
			array_push($tab, $value);	
	}
	return($tab);
}


$tab = array();
$index = 0;
while ($index++ <= $argc)
	$tab = array_merge($tab, ft_split($argv[$index]));
sort($tab);
$index = 0;
while ($tab[$index])
{
	echo "$tab[$index]\n";
	$index++;
}
?>