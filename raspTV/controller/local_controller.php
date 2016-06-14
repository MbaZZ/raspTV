<?php
class local_controller extends abstractController{
	public function home($html){
		$this->addHelper('jsController');
		$html->addCss('local');
		$html->addJs('raspTVControl');
		$this->jsControllerHelper->initJSController($this);
		
// 		$html->fluxMeteo=false;
// 		if($flux = simplexml_load_file('http://api.meteorologic.net/forecarss?p=Nantes'))
// 		{
// 			$html->fluxMeteo = $flux->channel;		
// 		}
		return 'local/home.php';
	}	
}
?>
