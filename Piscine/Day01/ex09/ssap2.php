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

$tab_spe = array();
$tab_char = array();
$tab_num = array();
$tab = array();
$index = 0;
while ($index++ <= $argc)
	$tab = array_merge($tab, ft_split($argv[$index]));
$i = 0;
while ($tab[$i])
{
	if (ctype_alpha($tab[$i]) == TRUE)
	{
		array_push($tab_char, $tab[$i]);
	}
	else if (ctype_digit($tab[$i]) == TRUE)
	{
		array_push($tab_num, $tab[$i]);
	}
	else if (ctype_punct($tab[$i]) == TRUE || ctype_print($tab[$i]) == TRUE)
	{
		array_push($tab_spe, $tab[$i]);
	}
	$i++;
}
natcasesort($tab_char);
rsort($tab_num);
natsort($tab_spe);
$printdex = 0;
foreach ($tab_char as $value)
{
	echo $value."\n";
}
foreach ($tab_num as $value)
{
	echo $value."\n";
}
foreach ($tab_spe as $value)
{
	echo $value."\n";
}
?>