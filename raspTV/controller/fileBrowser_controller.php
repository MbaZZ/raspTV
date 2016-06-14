<?php
class fileBrowser_controller extends abstractController{
	public function init($html){		
		$this->addHelper('jsController');
		$this->jsControllerHelper->initJSController($this);
// 		$this->addHelper('html');
		
		$this->addModel('browser');
		$this->browserModel->initialiseAttr('current_dir', '/media/nfs');
		if(isset($_GET['dir'])) $this->browserModel->setParam('current_dir', $_GET['dir']);	
		elseif(isset($_POST['dir'])) $this->browserModel->setParam('current_dir', $_POST['dir']);	
		$html->currDirectory = $this->browserModel->getParam('current_dir');		
	}
	public function home($html){
		
		$html->browserContent = $this->browserModel->getContent();
		
		return "fileBrowser/home.php";
	}
}
?>
