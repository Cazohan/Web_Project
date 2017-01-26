#!/usr/bin/php
<?php
if ($argc != 4)
{
	echo "Incorrect Parameters\n";
	exit ();
}
$val1 = trim($argv[1]);
$val2 = trim($argv[2]);
$val3 = trim($argv[3]);
if ($val2 == "+")
{
	$result = "$val1" + "$val3";
	echo "$result\n";
}
if ($val2 == "/")
{
	$result = "$val1" / "$val2";
	echo "$result\n";
}
if ($val[2] == '*')
{
	$result = "$val1" * "$val3";
	echo "$result\n";
}
if ($val2 == "-")
{
	$result = "$val1" - "$val3";
	echo "$result\n";
}
if ($val2 == "%")
{
	$result = "$val1" % "$val3";
	echo "$result\n";
}
?>