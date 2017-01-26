<?php

class Jaime extends Lannister {
	function sleepWith($t){
		if($t instanceof Cersei)
		{
			print("With pleasure, but only in a tower in Winterfell, then." . PHP_EOL);
		} else if ($t instanceof Lannister) {
			print("Not even if I'm drunk !" . PHP_EOL);
		}else{
			print("Let's do this." . PHP_EOL);
		}

	}
}

?>