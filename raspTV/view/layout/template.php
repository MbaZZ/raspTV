<?php
setlocale (LC_TIME, 'fr_FR.utf8','fra'); 

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
   <head>
   	  <meta http-equiv="Content-type" content="text/html; charset=UTF-8"/>
   	  <script src="http://bazzquinrasp:8000/socket.io/socket.io.js"></script>
<!--    	  <script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script> -->
      <title>raspTV</title>
      <?php
      	$this->addCss("layout");
       	echo $this->getHeaders();
      ?>
    </head>
    <body>
		<div id="centre" class="container-fluid">		
		 <?php                   
			$this->getContent("content_url");
		 ?>
		</div>
    </body>
</html>
