//------------------------------------
// Contr�leur javascript
//------------------------------------
function local_controller(request, response){
    this.request = request;
    this.response = response;
    this.view = new localView();
    this.listener = new localListener(this);
}
local_controller.prototype.home=function(){
    this.view.home(this.request.getUrl());
};
//------------------------------------
// Listener
//------------------------------------
//1           decrease speed
//2           increase speed
//<           rewind
//>           fast forward
//z           show info
//j           previous audio stream
//k           next audio stream
//i           previous chapter
//o           next chapter
//n           previous subtitle stream
//m           next subtitle stream
//s           toggle subtitles
//w           show subtitles
//x           hide subtitles
//d           decrease subtitle delay (- 250 ms)
//f           increase subtitle delay (+ 250 ms)
//q           exit omxplayer
//p / space   pause/resume
//-           decrease volume
//+ / =       increase volume
//left arrow  seek -30 seconds
//right arrow seek +30 seconds
//down arrow  seek -600 seconds
//up arrow    seek +600 seconds


function localListener(controller){
    this.controller = controller;
    var loRaspTVControl=RaspTVControl.getInstance();
    var keyPress = function(e){
    	e.preventDefault();
    	console.log('keyPresse ' + e.charCode + ' key ' + e.key);
    	var res='';
    	switch(e.charCode){
//    	case 39:loRaspTVControl.avVideo();break;
//    	case 37:loRaspTVControl.arrVideo();break;
    	case 118:case 32:loRaspTVControl.pauseVideo();break;
    	case 27:loRaspTVControl.stopVideo();break;//esc
//    	case 116:loRaspTVControl.volPlus();break;
//    	case 115:loRaspTVControl.volMoins();break;
//    	case 119:loRaspTVControl.playNextVideo();break;
//    	case 117:loRaspTVControl.playPrevVideo();break;
    	}
    	
    	switch(e.key){
    	case'Right':case'ArrowRight':loRaspTVControl.avVideo();break;
    	case'Left':case'ArrowLeft':loRaspTVControl.arrVideo();break;
    	case'Up':case'ArrowUp':loRaspTVControl.avAccVideo();break;
    	case'Down':case'ArrowDown':loRaspTVControl.arrAccVideo();break;
    	case'VolumeDown':loRaspTVControl.volMoins();break;
    	case'VolumeUp':loRaspTVControl.volPlus();break;
    	case'MediaNextTrack':loRaspTVControl.playNextVideo();break;
    	case'MediaPreviousTrack':loRaspTVControl.playPrevVideo();break;
    	case'MediaPlay':loRaspTVControl.pauseVideo();break;
        }
    	return false;
    };
    
    
    
    document.addEventListener("keypress", keyPress);
//    $("body").bind("keyup", function(e){
//    	e.preventDefault();
//    	console.log('keyPresse ' + e.keyCode);
//    	return false;
//    });
    
}
//------------------------------------
// Accès aux éléments de la vue
//------------------------------------
function localView(){
	this.raspTVControl=RaspTVControl.getInstance();
	
	var loThis=this;
	this.raspTVControl.addSyncListener(function(paData){
//		for(var iType in paData.listMedia){
//    		for(var iElem in paData.listMedia[iType].elems){
//    			var elem = paData.listMedia[iType].elems[iElem];
//    			view.addElemToPlaylist(iType, elem, iElem == paData.listMedia[iType].id);
//    		}
//    	}
		
		if(paData.status){
			if(paData.status.playing){
				loThis.displayPlaying(paData.status.current);
			}else{
				loThis.displayPlaying('');
			}
		}
		debugger
	});
}
localView.prototype.displayPlaying=function(lsTitle){
	var laTitle=lsTitle.split('/');
	if(laTitle.length>0){
		var lsContent='';
		var indente='';
		for(var i in laTitle){
			var lsc=laTitle[i];
			if(lsc!='media' && lsc!='nfs' && lsc!='zikBazzquinPart'){
				if(i==laTitle.length-1)
					lsContent = lsContent + indente + '<b>' + lsc + '</b>';
				else
					lsContent = lsContent + indente + lsc + '<br />';
				
				indente+='&nbsp;&nbsp;&nbsp;&nbsp;';
			}
		}
	
		$('#activite').html(lsContent);
	}else
		$('#activite').html('');
	
	
	
};
localView.prototype.getMonth=function(im){
	im++;
	var res=im;
	switch(im){
		case 1:res='Janvier';break;
		case 2:res='Février';break;
		case 3:res='Mars';break;
		case 4:res='Avril';break;
		case 5:res='Mai';break;
		case 6:res='Juin';break;
		case 7:res='Juillet';break;
		case 8:res='Aout';break;
		case 9:res='Septembre';break;
		case 10:res='Octobre';break;
		case 11:res='Novembre';break;
		case 12:res='Décembre';break;
	}	
	return res;
};
localView.prototype.getDay=function(id){
	var res=id;
	switch(id){
		case 1:res='Lundi';break;
		case 2:res='Mardi';break;
		case 3:res='Mercredi';break;
		case 4:res='Jeudi';break;
		case 5:res='Vendredi';break;
		case 6:res='Samedi';break;
		case 7:res='Dimanche';break;
		
	}	
	return res;
};
localView.prototype.home=function(data){
	var loThis=this;
	setInterval(function(){
		var date=new Date();
		$('#date').html(loThis.getDay(date.getDay())+' '+Utils.getNumber2digits(date.getDate())+' '+loThis.getMonth(date.getMonth())+' '+date.getFullYear());
		$('#heure').html(Utils.getNumber2digits(date.getHours())+'h'+Utils.getNumber2digits(date.getMinutes())+'<span class="small">:'+Utils.getNumber2digits(date.getSeconds())+'</span>');
	}, 100);
	
	

};
