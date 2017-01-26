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
	sort($tab);
	return($tab);
}
?>