var http = require('http');
var fs = require('fs');
//var omx = require('omx-manager');
// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

var volume=0;

// Chargement de socket.io
var io = require('socket.io').listen(server);
var raspControl = new RaspTVControl();
// Quand on client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !'); 
    socket.join('raspTVChanel');
    socket.broadcast.emit('message', 'un autre utilisateur s\'est connecté !');
    
    socket.emit('syncPlaylist', {'listMedia':raspControl.listMedia, 'status':raspControl.status});
    
    socket.on('raspControl', function (order) {
    	try{
	    	if(raspControl[order.methode]){
	    		console.log('---Deb '+order.methode);
	    		var params;
	    		if(!order.params)params=[];
	    		params = order.params;
	    		raspControl[order.methode](params);
	    		console.log('---Fin '+order.methode);
	    	}else{
	    		socket.emit('message', 'Erreur methode '+order.methode+' introuvable');
	    	}
    	}catch(err){
    		var message = 'Exception : ' + err;
    		console.log(message);
    		socket.emit('message', err);
    	}
    });
});
//Run and pipe shell script output 
function run_shell(cmd, args, cb, end) {
    var spawn = require('child_process').spawn,
        child = spawn(cmd, args),
        me = this;
    child.stdout.on('data', function (buffer) { cb(me, buffer) });
    child.stdout.on('end', end);
}
server.listen(8000);

////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// Surcouche ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
function RaspTVControl(){
	console.log('initialisation du singleton RaspTVControl');
	this.listMedia={'image':{'id':-1, 'elems':[]},'son':{'id':-1, 'elems':[]},'video':{'id':-1, 'elems':[]}};
	this.omx = require('omx-manager');
	this.status = this.omx.getStatus();
//	this.omx.enableMultipleNativeLoop();
	
	this.chrono=new Chronometre(3,1000);	
	this.isPlaying=false;
	this.isPause=false;
	this.playAfterStop=false;	
	
	//set event
	var loThis=this;
//	this.omx.on('load', function(videos, arguments) {
//		loThis.chrono.reset();		
//	});
//    
//	// successfully started a video or resumed from pause 
	this.omx.on('play', function(video) {
		console.log('play success');
	});  
//	    
//	// successfully paused a video 
//	this.omx.on('pause', function() {
//		loThis.chrono.stop();
//		loThis.sendSync();
//	}); 	    
//	// successfully stopped a video (omxplayer process ends) 
	this.omx.on('stop', function() {
		console.log('Stop Success');
		if(loThis.playAfterStop!=false){
			console.log('Starting Video');
			if(loThis.playAfterStop=='playNext'){
				if(!loThis.selectNextElem('video')){
					loThis.stopVideo();
					return;
				}
			}
			loThis.playVideo();
		}
	}); 
//	    
//	// videos to play are ended (never called if you are in looping condition) 
//	this.omx.on('end', function() {
//		loThis.chrono.stop();
//		loThis.sendSync();
//	}); 
	
	
}
RaspTVControl.prototype.shutdownRasb=function(){
	console.log('Arret du raspberry..');
	run_shell('sudo',['halt'],function(){
		
	},
	function(){
		
	});
};
/**
 * Gestion des vidéos
 */
RaspTVControl.prototype.addVideos=function(paPath){
	this.addElems('video', paPath);
	if(!this.isPlaying){
		this.listMedia['video'].id=this.listMedia['video'].elems.length-1;
		this.playVideo();
	}
};
RaspTVControl.prototype.playVideo3dSBS=function(paOptions){
	this.playVideo({'-3':'SBS'});
};
RaspTVControl.prototype.playVideo3dTB=function(paOptions){
	this.playVideo({'-3':'TB'});
};
RaspTVControl.prototype.playVideo=function(paOptions){
	var omxOptions={'-o':'local'};
	if(paOptions!=undefined){
		try{
			for(var i in paOptions){
				omxOptions[i] = paOptions[i];
			}
		}catch(err){
			console.log('RaspTVControl::playVideo, options incorrectes !');
		}
	}

	this.isPlaying=true;
	this.playAfterStop=this.hasNextElems('video')?'playNext':false;
	var path=this.getCurrElem('video');
	console.log('PlayVideo Path = '+path);
	if(path.substring(0,4) == 'http' || path.substring(0,4) == 'HTTP'){
		var loThis=this;
//		this.omx.play('$(youtube-dl -g "'+path+'")', {'-o':'local'});

		var runShell = new run_shell('./omxStreamer.sh',[path],
		        function (me, buffer) { 
		            me.stdout += buffer.toString();
//		            socket.emit("loading",{output: me.stdout});
		            console.log(me.stdout)
		         },
		        function () { 
//		        	 loThis.omx = require('omx-manager');
		        });
				
	}
	else
		this.omx.play(path, omxOptions);
	this.sendSync();
};
RaspTVControl.prototype.pauseVideo=function(){
	console.log('pauseVideo');
	if(!this.isPause){
		this.isPause=true;
		this.omx.pause();		
	}else{
		console.log('play');
		this.playVideo();
		this.isPause=false;
	}
	
	console.log('pause encore !!');
};
RaspTVControl.prototype.stopVideo=function(){
	this.isPlaying=false;
	this.playAfterStop=false;
	console.log('stopVideo');
	this.omx.stop();
};
RaspTVControl.prototype.stopAndStartVideo=function(){
	this.playAfterStop=true;
	console.log('stopAndStartVideo');
	this.omx.stop();
};
RaspTVControl.prototype.viderPlayListVideo=function(){
	this.listMedia['video'].id = -1;
	this.listMedia['video'].elems=[];
	this.sendSync();
};
RaspTVControl.prototype.playPrevVideo=function(){
	this.selectPrevElem('video');
	this.stopAndStartVideo();
	this.sendSync();	
};
RaspTVControl.prototype.playSelectedVideo=function(piId){
	var laId=piId.split(':');
	this.selectElem(laId[0], laId[1])
	this.stopAndStartVideo();
	this.sendSync();	
};

RaspTVControl.prototype.playNextVideo=function(){
	this.selectNextElem('video');
	this.stopAndStartVideo();
	this.sendSync();	
};
RaspTVControl.prototype.arrVideo=function(){
	this.omx.seekBackward();
};
RaspTVControl.prototype.avVideo=function(){
	this.omx.seekForward();
};
RaspTVControl.prototype.arrAccVideo=function(){
	this.omx.seekFastBackward();
};
RaspTVControl.prototype.avAccVideo=function(){
	this.omx.seekFastForward();
};
//Son
RaspTVControl.prototype.volPlus=function(){
	this.omx.increaseVolume();
};
RaspTVControl.prototype.volMoins=function(){
	this.omx.decreaseVolume();
}
RaspTVControl.prototype.nextPisteAudio=function(){
	this.omx.nextAudioStream();
};
RaspTVControl.prototype.prevPisteAudio=function(){
	this.omx.previousAudioStream();
};
//Image
RaspTVControl.prototype.addImage=function(paPath){
	this.addElems('image', [paPath]);
};

//Son
RaspTVControl.prototype.addSon=function(paPath){
	this.addElems('son', [paPath]);
};

//streaming
RaspTVControl.prototype.loadStreaming=function(paPath){
	addVideos([paPath])
};
	
RaspTVControl.prototype.downloadMovie=function(paPath){
    var url = paPath, loThis=this, dstDir='/media/nfs/video/DL/';
    var isLoaded=false;
    var fileName='notFound';
    var laTmp=[];
//    var runShell = new run_shell('youtube-dl',['--no-part', '-o',id,'-f','/18/22',url],
//    var runShell = new run_shell('youtube-dl',['--restrict-filenames', '--no-part','-f','/18/22',url],
   	var runShell = new run_shell('./youtubeDL.sh',[url],
        function (me, buffer) { 
            me.stdout = buffer.toString();            
            if(fileName=='notFound'){
            	laTmp=me.stdout.split('Destination: ');
            	if(laTmp.length>1){
            		fileName=dstDir+laTmp[laTmp.length-1].replace(' ', '').replace('\n', '').replace("\n", "");
            	}
            }else{            	
	            if(!isLoaded){
	            	if(me.stdout.search('1%')>0){
		            	loThis.addVideos([fileName]);
		            	 isLoaded=true;
	            	}
	            } 	
            }
                      
            
//            socket.emit("loading",{output: me.stdout});
              io.to('raspTVChanel').emit('onload', me.stdout);
            console.log(me.stdout)
         },
        function () { 
            //child = spawn('omxplayer',[id+'.mp4']);
        	 if(!isLoaded){
        		 loThis.addVideos([fileName]);
        		 isLoaded=true;
        	 }
        	 io.to('raspTVChanel').emit('onloaded','');
        });
//    this.addVideos([paPath]);
    
};

///////////////
//Collections//
///////////////

RaspTVControl.prototype.selectPrevElem=function(pType){
	var media=this.listMedia[pType];
	if(media.id==0){
		console.log('Action impossible : Aucun element avant !');
	}else{
		media.id--;
	}
};
RaspTVControl.prototype.selectNextElem=function(pType){
	var media=this.listMedia[pType];
	if(media.id >= media.elems.length-1){
		console.log('Action impossible : Aucun element après !');
		return false;
	}else{
		this.listMedia[pType].id++;
		return true;
	}	
};
RaspTVControl.prototype.isEmptyPlayList=function(pType){
	return this.listMedia[pType].elems.length == 0;
};
RaspTVControl.prototype.addElems=function(pType, paElems){
	for(var i in paElems){
		console.log('ajout de "'+paElems[i]+'"')
		this.listMedia[pType].elems.push(paElems[i]);
	}
	this.sendSync();
};
RaspTVControl.prototype.isElemsPresent=function(pType, psPath){
	var trouve=false;
	var media=this.listMedia[pType];
	for(var i in media.elems){
		if(media.elems[i]==psPath){
			console.log('isElemsPresent : Yes');
			return i;
		}
	}
	return false;
};
//selectionne l'element dans la playlist, si introuvable l'ajoute et le selectione
RaspTVControl.prototype.selectElem=function(pType, piId){
	console.log('selectElem ' +pType + ' - '  + piId + ' title ' + this.getCurrElem(pType));
	this.listMedia[pType].id = piId;
};
RaspTVControl.prototype.getCurrElem=function(pType){
	return this.listMedia[pType].elems[this.listMedia[pType].id];
};
RaspTVControl.prototype.sendSync=function(){
	this.status = this.omx.getStatus();
	io.to('raspTVChanel').emit('syncPlaylist', {'listMedia':this.listMedia, 'status':this.status, 'position':this.chrono});
};
RaspTVControl.prototype.hasNextElems=function(pType){
	return this.listMedia[pType].id < this.listMedia[pType].elems.length;
};

///////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////Chronometre (unused) /////////////////////
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
