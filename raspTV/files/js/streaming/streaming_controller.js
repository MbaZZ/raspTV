//------------------------------------
// Contr�leur javascript
//------------------------------------
function streaming_controller(request, response){
    this.request = request;
    this.response = response;
    this.view = new streamingView();
    this.listener = new streamingListener(this);
}
streaming_controller.prototype.home=function(){
    this.view.home(this.request.getUrl());
};
//------------------------------------
// Listener
//------------------------------------
function streamingListener(controller){
    this.controller = controller;
}
//------------------------------------
// Accès aux éléments de la vue
//------------------------------------
function streamingView(){
	this.raspTVControl = RaspTVControl.getInstance();	
	this.form = new streaming_form(this);
}

streamingView.prototype.home=function(data){

};

//------------------------------------
// Formulaire javascript
//------------------------------------
function streaming_form(view){
	this.view=view;
    this.validatation = new validate_util(this);
    this.streaming_formHtml = $("#youtubeSearchForm");
    this.champ_youtubeSearch = $("#streaming_youtubeSearch");
    var loThis=this;
    this.streaming_formHtml.submit(function(){
    	loThis.view.raspTVControl.addVideo(loThis.champ_youtubeSearch.val());
    	return false;
    });
    $('#playStreaming').click(function(e){
    	loThis.view.raspTVControl.loadStreaming(loThis.champ_youtubeSearch.val());    
    	loThis.view.raspTVControl.afficherChargement();
    	return false;
    });
    $('#downloadMovie').click(function(e){
    	loThis.view.raspTVControl.loadStreaming(loThis.champ_youtubeSearch.val());    
    	loThis.view.raspTVControl.afficherChargement();
    	return false;
    });
};