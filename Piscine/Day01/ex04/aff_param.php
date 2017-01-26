#!/usr/bin/php
<?php

$nb_param = 1;
while ($argv[$nb_param] != NULL)
{
	echo "$argv[$nb_param] \n";
	$nb_param++;
}

?>