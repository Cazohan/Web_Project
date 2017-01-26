#!/usr/bin/php
<?php

//$test = array("login" => "X", "mdp" => "41", "login" => "y", "mdp" => "42", "login" => "Z", "mdp" => "43");
$test = file_get_contents("../ex01/private/passwd");
$test1 = unserialize($test);
$i = 0;

while ($test1[$i])
{
	foreach ($test1[$i] as $key => $value)
	{
		echo "$key => $value\n";

	}
	$i = $i + 1;
}


//print_r($test);
//print_r($test1);

?>