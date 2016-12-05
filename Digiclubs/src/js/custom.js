$( document ).ready(function(){
	$(".button-collapse").sideNav({
      menuWidth: 250, 
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    //$('.modal-trigger').leanModal();
    
}); 
document.addEventListener('deviceready', function(){
    // Change the color
    window.plugins.headerColor.tint("#3f51b5");
}, false);