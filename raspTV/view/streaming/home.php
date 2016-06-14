<?php
	$hlp = $this->getHelper('jsController');
?>

<section class="row" id="<?php echo $hlp->addAjaxZoneElemAndGetId('*'); ?>" >
	<div style="display:table;" class="input-group">
		<?php 
			echo $hlp->openForm(array('id'=>'youtubeSearchForm','action' => '','method'=>'post'));
			echo $hlp->input('youtubeSearch', array('autofocus' => 'autofocus', 'autocomplete' => 'off', 'placeholder' => 'URL streaming', 'class' => 'form-control'));
			echo $hlp->end();
		?>
		<span style="width: 1%;" class="input-group-addon">			
			<button id="playStreaming" class="glyphicon glyphicon-play"></button>
			<button id="downloadMovie" class="glyphicon glyphicon-download-alt"></button>
		</span>
	</div>
</section>
