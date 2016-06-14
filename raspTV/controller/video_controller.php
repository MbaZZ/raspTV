<?php
class video_controller extends abstractController{
	public function init($html){
		$this->addHelper('jsController');
		$html->addJs('raspTVControl');
		$this->jsControllerHelper->initJSController($this);
	}
	public function home($html){				
		router::getInstance()->addController('fileBrowser', 'home', 'browser_content');
		router::getInstance()->addController('streaming', 'home', 'streaming_content');
		return "video/home.php";
	}
}
?>
