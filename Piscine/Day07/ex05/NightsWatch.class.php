<?php
class NightsWatch  {
	private $ar;

	public function recruit($someone)
	{
		if($someone instanceof IFighter)
			$this->ar[] = $someone;
	}

	public function fight(){
		foreach($this->ar as $cle => $el){
			$el->fight();
		}	
	}
}
?>