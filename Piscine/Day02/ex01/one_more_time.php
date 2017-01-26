#!/usr/bin/php
<?php
if ($argv[1])
{
	$month = array("01" => "[Jj]anvier", "02" => "[Ff]évrier", "03" => "[Mm]ars", "04" => "[Aa]vril", "05" => "[Mm]ai", "06" => "[Jj]uin", "07" => "[Jj]uillet", "08" => "[Aa]out", "09" => "[Ss]eptembre", "10" => "Octobre", "11" => "[Nn]ovembre", "12" => "[Dd]écembre");
	$day = array("01" => "[Ll]undi", "02" => "[Mm]ardi", "03" => "[Mm]ercredi", "04" => "[Jj]eudi", "05" => "[Vv]endredi", "06" => "[Ss]amedi", "07" => "[Dd]imanche");
	$date = preg_split("![\s]+!", $argv[1]);

	foreach ($day as $key => $value) 
	{
		if (preg_match("/$value/", $date[0]))
			$date[0] = $key;
	}
	foreach ($month as $key => $value)
	{
		if (preg_match("/$value/", $date[2]))
			$date[2] = $key;
	}
	date_default_timezone_set('Europe/Paris');
	$time = $date[3] ."-". $date[2] ."-". $date[1] . " " . $date[4];
	$form = strtotime($time);
	if (ctype_digit($form) == FALSE || !$date[4])
		echo "Wrong Format\n";
	else
		echo "$form\n";
}
?>