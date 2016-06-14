<?php 
class streaming extends appModel implements formServiceInterface
{
	public function saveValidForm(){
		Logger::tracerErreur(' url :: '.$this->youtubeSearch);
	}
// 	/*
// 	 * Persistence
// 	 */
// 	private $initParams;
// 	public function getParam($sName){
// 		if(!isset($_SESSION['browser'][$sName])){
// 			$_SESSION['browser'][$sName] = null;
// 		}
// 		return $_SESSION['browser'][$sName];
// 	}
// 	public function initialiseAttr($name,$value){
// 		$this->initParams[$name] = $value;
// 		if($this->getParam($name)==null){
// 			$this->setParam($name, $value);
// 		}
// 	}
// 	function __set($var_name, $value){
// 		parent::__set($var_name, $value);
// 		$this->setParam($var_name, $value);
// 	}
// 	function __get($var_name){
// // 		$res=parent::__get($var_name);
// // 		return $res==null?$this->getParam($var_name):$res;
// 		return $this->getParam($var_name);
// 	}
	
// 	public function setParam($sName, $value){
// 		$_SESSION['browser'][$sName] = $value;
// 		return $_SESSION['browser'][$sName];
// 	}
	
	
// 	public function getContent(){
// 		$resultFolder = Array(
// 			'dir' => Array(),
// 			'img' => Array(),
// 			'video' => Array(),
// 			'navig' => Array(),
// 			'son' => Array()
// 		);
// 		$Directory = $this->getParam('current_dir');

// 		if(dirname($Directory) != $Directory)
// 			$resultFolder['navig']['/'.dirname($Directory)] = 'Dossier Parent';
		
// 		$resultFolder['navig'][$this->initParams['current_dir']] = 'Medias';
// 		$resultFolder['navig']['/media/nfs/video'] = 'Videos';
// 		$resultFolder['navig']['/media/nfs/zikBazzquinPart'] = 'Zik';
		
// 		if(!file_exists($Directory)){
// 			$resultFolder['forbiden'] = true;
// 			return $resultFolder;
// 		}
// 		$resultFolder['forbiden']=false;
// 		$MyDirectory = opendir($Directory) or die('Erreur');
// // 		$max=500;
// // 		$i=0;		
		
// 		while($Entry = @readdir($MyDirectory)) {
// 			$type="unknow";
// 			if(is_dir($Directory.'/'.$Entry)&& $Entry != '.' && $Entry != '..' && substr($Entry,0,1) != '.') {				
// 				$type="dir";
// 			}else {
// 				$file_extention = explode('.',$Entry);
// 				$id = count($file_extention) -1;
// 				if($id > 0){
// 					$extention = $file_extention[$id];
// 					switch(strtolower($extention)){
// 						case "png":case "jpg":case"jpeg":case "gif": $type="img"; break;
// 						case "avi":case "mkv":case "mp4": $type="video"; break;
// 						case "mp3":case "wma":case "wav": $type="video"; break;//$type="son"
// 					}
// 				}				
// 			}
// 			if($type != "unknow"){
// 				$resultFolder[$type][addslashes($Directory.'/'.$Entry)] = $Entry;
// // 				$i++;
// 			}
// 		}
// 		closedir($MyDirectory);
// 		return $resultFolder;
// 	}
	
// 	private function strLigneAuto($str, $len){
// 		$nb = count($str) % $len;
// 		if($nb > 0){
// 			for($i=0;i<$nb;$i++){
// 				$str[$i*$len]
// 			}
// 		}
		
// 	}
}
?>