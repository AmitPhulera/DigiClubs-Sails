$( document ).ready(function(){
	$(".button-collapse").sideNav({
      menuWidth: 250, 
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    $('.modal-trigger').leanModal();
    
}); 