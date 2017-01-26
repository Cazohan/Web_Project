#!/usr/bin/php
<?php

function ft_is_sort($tab)
{
	$tmp = $tab;
	sort($tmp);
	$index = 0;
	while ($tab[$index])
	{
		if ($tab[$index] != $tmp[$index])
			return (FALSE);
		$index++;
	}
	return (TRUE);
}	
?>