<?php
function error()
{
	echo "ERROR\n";
	exit;
}
$passwd_path = "../private/passwd";
if ($_POST['login'] != "" && $_POST['passwd'] != "" && $_POST['submit'] == "OK")
{
	if (file_exists("../private") == FALSE)
		mkdir("../private", 0777);
	$i = 0;
	if (file_exists($passwd_path))
	{
		$stock = unserialize(file_get_contents($passwd_path));
		while ($stock[$i])
		{
			foreach ($stock[$i] as $key => $value)
			{
				if ($key == 'login' && $value == $_POST['login'])
					error();
			}
			$i = $i + 1;
		}
	}
	else
		$stock = array();
	$stock[$i] = array("login" => $_POST['login'], "passwd" => hash("whirlpool", $_POST['passwd']));
	if (file_put_contents($passwd_path, serialize($stock)))
		echo "OK\n";
}
else
	error();
?>