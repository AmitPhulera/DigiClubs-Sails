angular.module('DigiClubs.controllers.Main', [])

.controller('MainController', function($scope, $location, $window, Authenticate, Server) {
    //io.sails.url = 'http://digiclubs.westus.cloudapp.azure.com';
    document.addEventListener("offline", onOffline, false);
    try{
    window.plugins.headerColor.tint("#3f51b5");
	}catch(e){}
    function onOffline() {
        Materialize.toast('App Offline Due to Network Issues!!', 100000);
    }
    document.addEventListener("online", onOnline, false);

    function onOnline() {
    	try{
    		$('.toast').hide();
    	}catch(e){

    	}
        Materialize.toast('App Online!! Enjoy ', 2000,'rounded');
    } //io.sails.url="http://localhost:1337";
    //io.sails.connect(io.sails.url);
    //console.log('Main');
    $scope.inValidate = function() {
        Authenticate.clear();
        $location.path('/');
    };
    $scope.reload = function() {
        $window.location.reload();
    };

});
