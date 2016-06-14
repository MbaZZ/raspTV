<?php
$hlp = $this->getHelper('jsController');
?>

<section class="row" id="<?php echo $hlp->addAjaxZoneElemAndGetId('*'); ?>" >
	<nav class="navbar navbar-default">
        <div class="container-fluid">
        <div class="navbar-header">  
          <a class="navbar-brand" href="#"><?php echo $this->currDirectory=='/'?'ROOT':basename($this->currDirectory); ?></a>
        </div>
          <ul class="nav navbar-nav">
          <?php 
          		
				foreach($this->browserContent['navig'] as $path => $content){
					 echo '<li>'.$hlp->link('openFolder', array(
							'href' => '?dir='.$path, 
							'libel' => '<span class="glyphicon glyphicon-level-up"></span>'.$content, 
// 							'class' => "btn btn-lg btn-default"
						)).'</li>';
				}
          	?>
          </ul>
          <form class="navbar-form navbar-right inline-form">
            <div class="form-group">
              <input type="search" name="dir" value="<?php echo $this->currDirectory; ?>" class="input-sm form-control" placeholder="Recherche">
              <button type="submit" class="btn btn-primary btn-sm">GO</button>
            </div>
          </form>
        </div>
      </nav>
      
 	<div class="container-fluid">
 		<div class="row">
			<?php 	
			if($this->browserContent['forbiden'] == true) {
				echo "<p>Impossible d'afficher le contenu de ce dossier</p>";
			}else{
				$countElem=count($this->browserContent['dir']);
				if($countElem>0){
					echo '<div class="panel panel-default">'
							.'<div class="panel-heading">'.$countElem.' sous dossiers</div>'
								.'<div class="panel-body">';
							foreach($this->browserContent['dir'] as $path => $content){
								echo '<div class="col-sm-6"><span class="glyphicon glyphicon-folder-open"></span> '
								.$hlp->link($content, array(
										'lanceurJS' => 'openFolder',
										'href' => '?dir='.$path,
										'title' => $content,
										'class' => "btn btn-lg btn-default noBorder swipeToPlayListe",
										'data-swipeAction' => 'addFolder'										
								)).'</div>';
							}
						echo '</div>'
					.'</div>';
				}
				$countElem=count($this->browserContent['video']);
				if($countElem>0){		
					echo '<div class="panel panel-default">'
							.'<div class="panel-heading">'.$countElem.' videos</div>'
								.'<div class="panel-body">';
					foreach($this->browserContent['video'] as $path => $content){
						echo '<div class="col-sm-12"><span class="glyphicon glyphicon-facetime-video"></span> '
							.$hlp->link($content, array(
								'lanceurJS' => 'startVideo',
								'href' => '#video'.$path,
								'title' => $content,
								'class' => "btn btn-lg btn-default noBorder swipeToPlayListe",
								'data-swipeAction' => 'addVideo'
						)).'</div>';
					}
					echo '</div>'
					.'</div>';
				}
				
				$countElem=count($this->browserContent['son']);
				if($countElem>0){	
					echo '<div class="panel panel-default">'
							.'<div class="panel-heading">'.$countElem.' musiques</div>'
								.'<div class="panel-body">';
						foreach($this->browserContent['son'] as $path => $content){
							echo $hlp->link('startSon', array(
								'lanceurJS' => 'startSon',
								'href' => '#son'.$path,
								'libel' => '<span class="glyphicon glyphicon-music"></span><br />'.$content,
								'title' => $content,
								'class' => "btn btn-lg btn-default noBorder swipeToPlayListe",
								'data-swipeAction' => 'addSon'
							));
						}
					echo '</div>'
					.'</div>';
				}
			}
			
			?>
		</div>
	</div>
</section>
<!-- <script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script> -->