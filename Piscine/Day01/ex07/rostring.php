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

$tab = ft_split($argv[1]);
$index = 1;
while ($tab[$index])
{

	echo "$tab[$index] ";
	$index++;
}
echo "$tab[0]\n";
?>