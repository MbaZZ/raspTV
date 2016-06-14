RaspTVControl.inst=null;
RaspTVControl.getInstance=function(){
	if(RaspTVControl.inst==null)RaspTVControl.inst = new RaspTVControl();
	return RaspTVControl.inst;	
};

function RaspTVControl(){
	this.listMedia={'image':{'id':0, 'elems':[]},'son':{'id':0, 'elems':[]},'video':{'id':0, 'elems':[]}};
	this.status;
	this.paListeners=[];
	
	try{
		this.socket = io.connect('http://bazzquinrasp:8000/');
		this.socket.on('message', function(message) {
		      console.log('Connecte a bazzquinRasp : ' + message);
		  });
			
		var lothis=this;
		this.socket.on('syncPlaylist', function(data){
			console.log('syncPlaylist en cours');
			for(var i in lothis.paListeners){
				lothis.paListeners[i](data);
			}
			lothis.listMedia = data.listMedia;
			lothis.status = data.status;
		});		
	}catch(e){
		this.showErreurConnect();
	}	
	
	//lynk des methodes avec le socket distant
	var methodeALynk=[
	    'playSelectedVideo',
	    'viderPlayListVideo',
	    'addVideos',
	    'playVideo',
	    'playVideo3dSBS',
	    'playVideo3dTB',
	    'pauseVideo',
	    'stopVideo',
	    'playPrevVideo',
	    'playNextVideo',
	    'arrVideo',
	    'avVideo',
	    'arrAccVideo',
	    'avAccVideo',
	    'volPlus',
	    'volMoins',
	    'nextPisteAudio',
	    'prevPisteAudio',
	    'shutdownRasb',
	    'loadStreaming',
	    'downloadMovie'
	];
	for(var i in methodeALynk){
		var mname=methodeALynk[i];
		eval("RaspTVControl.prototype."+mname+"=function(paParams){try{this.socket.emit('raspControl', {'methode':'"+mname+"','params':paParams})}catch(e){this.showErreurConnect();};};");
	}
	
	this.loadingBox = new LoadingBox();
}
RaspTVControl.prototype.afficherChargement=function(){
	var loThis=this;
	this.socket.on('onload',function(psWhat){
		debugger
		loThis.loadingBox.show('Chargement de la video..');
		var laInfo=psWhat.split('[download]');
		if(laInfo.length>0)		
			loThis.loadingBox.setTextInfo(laInfo[laInfo.length-1]);		
	});
	this.socket.on('onloaded',function(psWhat){
		loThis.loadingBox.hide();
	});
};


RaspTVControl.prototype.addSyncListener=function(pfListener){
	this.paListeners.push(pfListener);
};
RaspTVControl.prototype.showErreurConnect=function(){
	console.log('Impossible de se connecter au raspberry !');
	var message = new MessageBox();
	message.setContent('Impossible de se connecter a BazzQuinRasp ! <br /> Est-il bien démaré ?', 'Erreur de liaison');
	message.show();
};
RaspTVControl.prototype.isEmptyPlayList=function(pType){
	return this.listMedia[pType].elems.length == 0;
};
RaspTVControl.prototype.getPlaylist=function(pType){
	return this.listMedia[pType];
};
//Video
RaspTVControl.prototype.addVideo=function(psPath){
	this.addVideos([psPath]);
};

////////////////////////////////////Chronometre /////////////////////
/**
 * prof : nombre de unité affichées
 * freq : frequence d'indentation du plus petit élément
 */
function Chronometre(prof, freq){
	this.compteurs=[];
	for(var i=0;i<prof;i++){
		this.compteurs[i] = 0;
	}
	
	this.timer;
	this.prof=prof;
	this.freq=freq;
	var loThis=this;
	this.indent = function(li){
		if(li==undefined)li=0;
		if(loThis.compteurs[li] == 59 && li < prof-1){
			loThis.compteurs[li] = 0;
			loThis.indent(li+1);
		}
		else loThis.compteurs[li]++;
	};
}
Chronometre.prototype.start=function(){
	this.timer=setInterval(this.indent, this.freq);
};
Chronometre.prototype.stop=function(){
	clearInterval(this.timer);
};
Chronometre.prototype.reset=function(){
	for(var i=0;i<this.prof;i++){
		this.compteurs[i] = 0;
	}
};
Chronometre.prototype.format=function(){
	lsres='';
	for(var i=0;i<this.prof;i++){
		lsres = this.sur2digit(this.compteurs[i]) +  ':' + lsres;
	}
	return lsres.substr(0, lsres.length-1);
};
Chronometre.prototype.getMinutes=function(){
	if(this.freq == 1000){
		return this.compteurs[1];
	}
};
Chronometre.prototype.getSeconds=function(){
	if(this.freq == 1000){
		return this.compteurs[1];
	}
};
Chronometre.prototype.sur2digit=function(li){
	return li<10?'0'+li:li;
};
