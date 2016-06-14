//------------------------------------
// Contr�leur javascript
//------------------------------------
function video_controller(request, response){
    this.request = request;
    this.response = response;
    this.view = new videoView();
    this.listener = new videoListener(this);    
}
// M�thode appell�e lors de r�ception de chaque r�ponse
//video_controller.prototype.onReceiveNewResponse=function(){
//if(this.response.htmlZoneIdMap && this.response.getControllerName() == "video_controller")
//    this.view.mapIdToIdZone = this.response.htmlZoneIdMap;
//};

video_controller.prototype.home=function(){
    this.view.home(this.request.getUrl());
};

//------------------------------------
// Listener
//------------------------------------
function videoListener(controller){
    this.controller = controller;
    var view = controller.view;
    this.mediaPlayer = RaspTVControl.getInstance();   
    this.mediaPlayer.addSyncListener(function(data){
    	view.clearPlayList();
    	for(var iType in data.listMedia){
    		for(var iElem in data.listMedia[iType].elems){
    			var elem = data.listMedia[iType].elems[iElem];
    			view.addElemToPlaylist(iType, iElem, elem, iElem == data.listMedia[iType].id);
    		}
    	}
    });
}

videoListener.prototype.selectAndPlayVideo=function(oElem, sIds){
	console.log('ID titre select '+ sIds);
	this.mediaPlayer.playSelectedVideo(sIds);
	
	return false;
};

videoListener.prototype.playVideo=function(po,ps){
	this.mediaPlayer.playVideo();
	return false;
};
videoListener.prototype.playVideo3dTB=function(po,ps){
	this.mediaPlayer.playVideo3dTB();
	return false;
};
videoListener.prototype.playVideo3dSBS=function(po,ps){
	this.mediaPlayer.playVideo3dSBS();
	return false;
};
videoListener.prototype.stopVideo=function(po,ps){
	this.mediaPlayer.stopVideo();
	return false;
};
videoListener.prototype.pauseVideo=function(po,ps){	
	this.mediaPlayer.pauseVideo();
	return false;
};
videoListener.prototype.volMoins=function(po,ps){
	this.mediaPlayer.volMoins();
	return false;
};
videoListener.prototype.volPlus=function(po,ps){	
	this.mediaPlayer.volPlus();
	return false;
};
videoListener.prototype.nextPisteAudio=function(po,ps){	
	this.mediaPlayer.nextPisteAudio();
	return false;
};
videoListener.prototype.prevPisteAudio=function(po,ps){	
	this.mediaPlayer.prevPisteAudio();
	return false;
};
videoListener.prototype.prevVideo=function(po,ps){	
	this.mediaPlayer.playPrevVideo();
	return false;
};
videoListener.prototype.nextVideo=function(po,ps){	
	this.mediaPlayer.playNextVideo();
	return false;
};
videoListener.prototype.arrVideo=function(po,ps){	
	this.mediaPlayer.arrVideo();
	return false;
};
videoListener.prototype.avVideo=function(po,ps){	
	this.mediaPlayer.avVideo();
	return false;
};
videoListener.prototype.viderPlayList=function(po,ps){	
	this.mediaPlayer.viderPlayListVideo();
	return false;
};
videoListener.prototype.delElemPlayList=function(po,ps){	
	alert('vidage');
	return false;
};
videoListener.prototype.shutdownRasb=function(po,ps){
	var q = new QuestionBox();
	q.setTitle('Arrêt du Raspberry');
	q.addQuestion('Est tu sûr de vouloir éteindre BazzQuinRasp ?', ['oui', 'non'], 'shutdownRasbConfirme', 'video', 0);
	q.show();	
	return false;
};
videoListener.prototype.shutdownRasbConfirme=function(selectOption){
	if(selectOption.libelClic=='oui'){
		var m=new LoadingBox();
		m.setTextInfo('BazzQuinRasp est en cours d\'arrêt...');
		m.show();
		setTimeout(function(){
			m.hide();
			m = new MessageBox();
			m.setContent('BazzQuinRasp devrait désormais être arreté !', 'Arrêt du Raspberry terminée !');
			m.addContent('<b>Penses à l\'éteindre electriquement !!<b>');
			m.show();
		}, 10000);
		this.mediaPlayer.shutdownRasb();
	}
	return false;
};
//------------------------------------
// Accès aux éléments de la vue
//------------------------------------
function videoView(){
	this.dateHeureElem=document.getElementById('dateHeure');
	this.chrono=new Chronometre(3,1000);
	var loThis=this;
//	setInterval(function(){
//		loThis.dateHeureElem.html(loThis.chrono.format());
//	}, 1000);
	this.mediaCourrant=$('#mediaCourrant');
	var type=['Video','Image', 'Son'];
	this.playLists=[];
	for(var i in type){
		this.playLists[type[i].toLowerCase()]=$('#playList'+type[i]+' ol');
	}
}
videoView.prototype.home=function(data){
};
videoView.prototype.clearPlayList=function(){
	for(var i in this.playLists)this.playLists[i].html('');
};
videoView.prototype.addElemToPlaylist=function(psType, piId, psTitle, lbCurrent){
	var lsTmp=psTitle.split('/');
	lsTmp=lsTmp[lsTmp.length-1];
	var lsActive='';
	if(lbCurrent){
		lsActive='active';
	}
//	var del='<a href="#deleteVideo'+psTitle+'" onclick=\'return Dispatcher.addListener("#video'+psTitle+'", this,"delElemPlayList","video_controller", "default")\'><span class="glyphicon glyphicon-trash"></span></a>';
	this.playLists[psType].append('<a onclick=\'return Dispatcher.addListener("'+psType+':'+piId+'", this,"selectAndPlayVideo","video_controller", "default")\' href="" class="list-group-item '+lsActive+'" >'+lsTmp+'</a>');
};