<?php  
	session_start();
	include('../danaworld/router.php');
	router::getInstance()->run();
?>
