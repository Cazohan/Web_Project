<?php

class Tyrion extends Lannister {
	
	function sleepWith($t){
		if($t instanceof Lannister)
		{
			print("Not even if I'm drunk !" . PHP_EOL);
		} else {
			print("Let's do this." . PHP_EOL);
		}

	}
}
?>