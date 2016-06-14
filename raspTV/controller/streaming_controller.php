<?php
class streaming_controller extends abstractController{
	public function init($html){
		$html->addJs('raspTVControl');
		$this->addModel('streaming');
		$this->addHelper('jsController');
		$this->jsControllerHelper->initJSController($this);
		$this->jsControllerHelper->setModel($this->streamingModel);
	}
	public function home($html){
		return 'streaming/home.php';
	}	
}
?>
