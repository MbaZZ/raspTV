//------------------------------------
// Contr�leur javascript
//------------------------------------
function fileBrowser_controller(request, response){
    this.request = request;
    this.response = response;
    this.view = new fileBrowserView();
    this.listener = new fileBrowserListener(this);
}
// M�thode appell�e lors de r�ception de chaque r�ponse
//fileBrowser_controller.prototype.onReceiveNewResponse=function(){
//if(this.response.htmlZoneIdMap && this.response.getControllerName() == "fileBrowser_controller")
//    this.view.mapIdToIdZone = this.response.htmlZoneIdMap;
//};
fileBrowser_controller.prototype.home=function(){
    this.view.home(this.request.getUrl());   
    $('.swipeToPlayListe').on("swipe",function(){
//    	var oldWith = $(this).width();
    	$(this).fadeOut(200).fadeIn(200)
    	
    	Dispatcher.loadListener($(this).attr('data-swipeAction'), 'fileBrowser_controller');
    });
};
//------------------------------------
// Listener
//------------------------------------
function fileBrowserListener(controller){
    this.controller = controller;
    this.mediaPlayer = RaspTVControl.getInstance();  
}
fileBrowserListener.prototype.openFolder=function(oElem, sUrl){
    var rq = new RequestControl();
    rq.setParams(undefined, 'fileBrowser_controller', 'home');    
    var mPath=sUrl.split('dir=');
	if(mPath.length > 0){
		rq.addData('dir', mPath[1]);
	}else{
		rq.addData('dir', sUrl);
	}  
	debugger
	rq.setHistoryUrl(sUrl);
    Dispatcher.jouerRequestAjax(rq);
    return false;//Autorise le suivi du lien
};
fileBrowserListener.prototype.addFolder=function(oElem, sUrl){
	console.log('addFoleder TODO');
	return false;
};
fileBrowserListener.prototype.openImage=function(oElem, sUrl){
    console.log('openImage');
    var path = sUrl.split('#image');
	if(path.length>1){
		console.log('startVideo');
		this.mediaPlayer.addImage(path[1]);	
	}else{
		console.log('erreur parametre incorrecte');
	}
    return false;//Autorise le suivi du lien
};
fileBrowserListener.prototype.addImage=function(oElem, sUrl){
	console.log('addImage TODO');
	return false;
};
fileBrowserListener.prototype.startVideo=function(oElem, sUrl){
	var path = sUrl.split('#video');
	if(path.length>1){
		console.log('startVideo');
		this.mediaPlayer.addVideo(path[1]);	
	}else{
		console.log('erreur parametre incorrecte');
	}	
    return false;//Autorise le suivi du lien
};
fileBrowserListener.prototype.addVideo=function(oElem, sUrl){
	console.log('addVideo TODO');
	return false;
};
fileBrowserListener.prototype.startSon=function(oElem, sUrl){
	console.log('startSon');
	var path = sUrl.split('#son');
	if(path.length>1){
		console.log('startVideo');
		this.mediaPlayer.addSon(path[1]);	
	}else{
		console.log('erreur parametre incorrecte');
	};
    return false;//Autorise le suivi du lien
};
fileBrowserListener.prototype.addSon=function(oElem, sUrl){
	console.log('addSon TODO');
};
//------------------------------------
// Accès aux éléments de la vue
//------------------------------------
function fileBrowserView(){	
}
fileBrowserView.prototype.init=function(data){

};
fileBrowserView.prototype.home=function(data){

};
