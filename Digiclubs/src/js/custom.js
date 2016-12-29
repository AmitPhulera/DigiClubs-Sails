$( document ).ready(function(){
	$(".button-collapse").sideNav({
      draggable: true,
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    //$('select').material_select();
    //$('.modal-trigger').leanModal();
    
}); 
document.addEventListener('deviceready', function(){
    // Change the color
    window.plugins.headerColor.tint("#3f51b5");
    var push = PushNotification.init({
            android: {
                senderID: "565734768883"
            },
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },
            windows: {}
        });

        push.on('registration', function(data) {
            // data.registrationId
        });

        push.on('notification', function(data) {
            // data.message,
            // data.title,
            // data.count,
            // data.sound,
            // data.image,
            // data.additionalData
            alert(data.message);
        });

        push.on('error', function(e) {
            // e.message
            alert(e.message);
        });

}, false);
