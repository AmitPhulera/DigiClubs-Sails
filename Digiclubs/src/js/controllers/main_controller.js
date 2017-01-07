angular.module('DigiClubs.controllers.Main', [])

.controller('MainController', function($scope, $location, $window, Authenticate, Server) {
    //io.sails.url = 'http://digiclubs.westus.cloudapp.azure.com';
    document.addEventListener("offline", onOffline, false);
    document.addEventListener('deviceready', pushConfigure, false);
    var theapp = Server;
    try {
        window.plugins.headerColor.tint("#3f51b5");
    } catch (e) {}

    function onOffline() {
        Materialize.toast('App Offline Due to Network Issues!!', 100000);
    }
    document.addEventListener("online", onOnline, false);

    function onOnline() {
        try {
            $('.toast').hide();
        } catch (e) {

        }
        Materialize.toast('App Online!! Enjoy ', 2000, 'rounded');
    }

    function pushConfigure() {
        
            // Change the color
            window.plugins.headerColor.tint("#3f51b5");
            //Configuration for setting up push notifications 
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
                Authenticate.setItem('push_regId', data.registrationId);
                if (Authenticate.get('token')) {
                    user=Authenticate.get('user');
                    $http.put(theapp+'users/'+user.id,{pushRegistrationId:data.registrationId}).then(function(data){
                        console.log('Added UserId In Server');
                    },
                    function(err){
                        console.log('Error adding User Id')
                    });
                }
                push.subscribe('digiclubs', function() {
                        console.log("User Subscribed");
                    },
                    function(error) {
                        console.log('Error In Subscribing ');
                        console.log(error)
                    })
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

        }
    

    $scope.inValidate = function() {
        Authenticate.clear();
        $location.path('/');
    };
    $scope.reload = function() {
        $window.location.reload();
    };

});
