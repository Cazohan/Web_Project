#!/usr/bin/php
<?php
while(1)
{
	echo "Entrez un nombre : ";
	$entry=fopen('php://stdin', r);

	if (($line=fgets($entry)) == NULL)
	{
		echo "\n";
		exit ();
	}
	$nb=trim($line , "\n");
	if (ctype_digit($nb) == FALSE)
		echo "'" . $nb . "' n'est pas un chiffre\n";
	elseif ($nb % 2 == 0)
		echo"Le chiffre " . $nb . " est Pair\n";
	elseif ($nb % 2 != 0)
		echo "Le chiffre " . $nb .  " est Impair\n";
	fclose($entry);
}
?>