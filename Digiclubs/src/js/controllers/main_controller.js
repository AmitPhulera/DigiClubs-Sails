angular.module('DigiClubs.controllers.Main', [])

.controller('MainController', function($scope,$location,$window,Authenticate,Server){
 	 io.sails.url=Server;
 	 //io.sails.url="http://localhost:1337";
 	//io.sails.connect(io.sails.url);
 	//console.log('Main');
 	$scope.inValidate=function(){
 		Authenticate.clear();
 		$location.path('/');
 	};
 	$scope.reload=function(){
 		$window.location.reload();
 	};

});