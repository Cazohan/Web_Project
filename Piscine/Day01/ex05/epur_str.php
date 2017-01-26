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

$epur = ft_split($argv[1]);
foreach ($epur as $value)
{
	$text = $text . " " . $value;
}
$text = ltrim($text);
echo  $text . "\n";
?>