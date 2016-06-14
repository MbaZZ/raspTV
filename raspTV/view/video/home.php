<div class="navbar navbar-inverse" role="navigation">
<!--   <div class="navbar-header"> -->
<!--     <a class="navbar-brand" href="#">Lecteur</a> -->
<!--   </div> -->
  <div class="navbar-collapse collapse">

    <!-- Left nav -->
<!--     <ul class="nav navbar-nav"> -->
<!--       <li><a href="#">Link</a></li> -->
<!--       <li><a href="#">Link</a></li>     -->
<!--     </ul> -->
  
<!-- 	  <div class="progress"> -->
 <!-- 	 		<div class="progress-bar" role="progressbar" aria-valuenow="70"  aria-valuemin="0" aria-valuemax="100" style="width:70%"> -->
<!--    		 70% -->
<!--   		</div> -->
<!-- 	</div> -->
    <?php

    $hlp = $this->getHelper('jsController');
    	echo '<ul class="list-inline">'; 			
    			if(isset($_GET['3D'])){
    				echo '<li>'.$hlp->link('playVideo3dSBS', array('href' => 'playVideo', 'libel' => '<span class="glyphicon glyphicon-play"></span> Play3D TB', 'class' => "btn btn-info btn-lg")).' </li>'
    				.'<li>'.$hlp->link('playVideo3dTB', array('href' => 'playVideo', 'libel' => '<span class="glyphicon glyphicon-play"></span> Play3D SBS', 'class' => "btn btn-info btn-lg")).' </li>';
    			}else{
    				echo '<li>'.$hlp->link('playVideo', array('href' => 'playVideo', 'libel' => '<span class="glyphicon glyphicon-play"></span> Play', 'class' => "btn btn-info btn-lg")).' </li>';
			   	}		    
			    echo '<li>'.$hlp->link('pauseVideo', array('href' => 'pauseVideo', 'libel' => '<span class="glyphicon glyphicon-pause"></span> Pause', 'class' => "btn btn-info btn-lg")).'</li>'
			    .'<li>'.$hlp->link('stopVideo', array('href' => 'stopVideo', 'libel' => '<span class="glyphicon glyphicon-stop"></span> Stop', 'class' => "btn btn-danger btn-lg")).'</li>'
			    .'<li>'.$hlp->link('prevVideo', array('href' => 'prevVideo', 'libel' => '<span class="glyphicon glyphicon-fast-backward"></span>', 'class' => "btn btn-danger btn-lg")).' </li>'
			    .'<li>'.$hlp->link('arrVideo', array('href' => 'arrVideo', 'libel' => '<span class="glyphicon glyphicon-backward"></span>', 'class' => "btn btn-warning btn-lg")).' </li>'			    
			    .'<li>'.$hlp->link('avVideo', array('href' => 'avVideo', 'libel' => '<span class="glyphicon glyphicon-forward"></span>', 'class' => "btn btn-warning btn-lg")).' </li>'
			    .'<li>'.$hlp->link('nextVideo', array('href' => 'nextVideo', 'libel' => '<span class="glyphicon glyphicon-fast-forward"></span>', 'class' => "btn btn-danger btn-lg")).' </li>'
			    .'<li>'.$hlp->link('shutdownRasb', array('href' => 'shutdown', 'libel' => ' <span class="glyphicon glyphicon-off"></span> Eteindre ', 'class' => "btn btn-danger btn-lg")).' </li>'
			    .'<li>'.$hlp->link('volMoins', array('href' => 'volMoins', 'libel' => '<span class="glyphicon glyphicon-volume-down"></span> -', 'class' => "btn btn-info btn-lg")).'</li>'
			    .'<li>'.$hlp->link('volPlus', array('href' => 'volPlus', 'libel' => ' <span class="glyphicon glyphicon-volume-up"></span> + ', 'class' => "btn btn-info btn-lg")).' </li>'
			    .'<li>'.$hlp->link('nextPisteAudio', array('href' => 'nextPisteAudio', 'libel' => '<span class="glyphicon glyphicon-forward"></span> Piste audio', 'class' => "btn btn-info btn-lg")).' </li>'
			    .'<li>'.$hlp->link('nextPisteAudio', array('href' => 'prevPisteAudio', 'libel' => '<span class="glyphicon glyphicon-backward"></span> Piste audio', 'class' => "btn btn-info btn-lg")).' </li>'
				.'<li id="mediaCourrant" class="textGros"></li>'
    		.'</ul>';
    
    ?>

    <!-- Right nav -->
<!--     <ul class="nav navbar-nav navbar-right"> -->
<!--       <li><a href="bootstrap-navbar.html">Default</a></li> -->
<!--     </ul> -->

  </div><!--/.nav-collapse -->
</div>

<div class="container-fluid">
	<div class="row">
		<div class="col-lg-3 col-sm-12 col-xs-12">
		<div class="panel panel-default">
				<div class="panel-heading">Liste de lecture</div>
					<div class="panel-body">				
					 <ul class="nav nav-tabs">
				        <li class="active"><a data-toggle="tab" href=#playListVideo>Videos/Son</a></li>
				        <li><a data-toggle="tab" href="#playListImage">Images</a></li>
<!-- 				        <li><a data-toggle="tab" href="#playListSon">Musiques</a></li> -->
<!-- 				        <li class="dropdown"> -->
<!-- 				            <a data-toggle="dropdown" class="dropdown-toggle" href="#">Dropdown <b class="caret"></b></a> -->
<!-- 				            <ul class="dropdown-menu"> -->
<!-- 				                <li><a data-toggle="tab" href="#dropdown1">Dropdown1</a></li> -->
<!-- 				                <li><a data-toggle="tab" href="#dropdown2">Dropdown2</a></li> -->
<!-- 				            </ul> -->
<!-- 				        </li> -->
				    </ul>
				    <div class="tab-content">
				        <div id="playListVideo" class="tab-pane fade in active">
				            <ol class="list-group">				            
							</ol>
				        </div>
				        <div id="playListImage" class="tab-pane fade">
				            <ol class="list-group">
				            
							</ol>
				        </div>
				        <div id="playListSon" class="tab-pane fade">
				            <ol class="list-group">
				            
							</ol>
				        </div>
				    </div>		
				    <?php 
				   		echo '<ul class="list-inline">';
				    	echo '<li>'.$hlp->link('viderPlayList', array('href' => 'viderPlayList', 'libel' => '<span class="glyphicon glyphicon-trash"></span> Vider', 'class' => "btn btn-danger btn-default")).'</li>';	
				    	if(!isset($_GET['3D']))
				    		echo '<li><a href="?3D" class="btn btn-info	 btn-default">Lecture 3D</a></li>';
				    	else
				    		echo '<li><a href="?2D" class="btn btn-info btn-default">Lecture 2D</a></li>';
				    	echo '</ul>';
				    ?>			
				</div>					
			</div>
				
<!-- 			<div class="playlist padding1"> -->
<!-- 			Playlist -->
<!-- 			</div> -->
		</div>
		
		<div class="col-lg-9 col-sm-12 col-xs-12">
			
		
					
			<div class="panel panel-default">
				<div class="panel-heading">Parcours des medias</div>
				<div class="panel-body">	
						
					<div class="files padding1">
					 <ul class="nav nav-tabs">
				        <li class="active"><a data-toggle="tab" href=#browseFichier>Fichiers</a></li>
				        <li><a data-toggle="tab" href="#youtubeSearch">Streaming</a></li>
				    </ul>
				   	 <div class="panel panel-default">
						<div class="panel-body">
						<div class="tab-content">
				        <div id="browseFichier" class="tab-pane fade in active">
				            <?php 
								$this->getContent("browser_content");
							?>
				        </div>
				        <div id="youtubeSearch" class="tab-pane fade">
<!-- 				            <p> -->
			            	 <?php 
								$this->getContent("streaming_content");
// 							?>
<!-- 				            </p> -->
				        </div>
				    </div>
						</div>
						</div>
					</div>
				</div>			
			</div>
		</div>
	</div>
</div>