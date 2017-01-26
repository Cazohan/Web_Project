<?php 
class Targaryen{

	public function resistsFire(){
		return False;
	}
		public function getBurned(){
			if($this->resistsFire() === False) {
				return "burns alive";
			}else if ($this->resistsFire() === True){
				return "emerges naked but unharmed";}
		}
}

?>