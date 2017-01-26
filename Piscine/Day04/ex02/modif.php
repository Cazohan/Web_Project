<?php
function error()
{
	echo "ERROR\n";
	exit;
}
$passwd_path = "../ex01/private/passwd";
if ($_POST['login'] != "" && $_POST['oldpw'] != "" && $_POST['newpw'] != "" && $_POST['submit'] == "OK")
{
	$i = 0;
	$stock = unserialize(file_get_contents($passwd_path));
	while ($stock[$i])
	{
		$login_state = 0;
		foreach ($stock[$i] as $key => $value)
		{
			if ($key == 'login')
			{
				if ($value == $_POST['login'])
					$login_state = 1;
				else
					$login_state = 0;
			}
			if ($key == 'passwd' && $login_state === 1)
			{
				if ($value === hash("whirlpool", $_POST['oldpw']))
				{
					$stock[$i] = array("login" => $_POST['login'], "passwd" => hash("whirlpool", $_POST['newpw']));
					file_put_contents($passwd_path, serialize($stock));
					echo "OK\n";
					return ;
				}
				else
					error();
			}
		}
		$i = $i + 1;
	}
}
else
	error();
?>