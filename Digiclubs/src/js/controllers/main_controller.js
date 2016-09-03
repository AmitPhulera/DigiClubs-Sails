angular.module('DigiClubs.controllers.Main', [])

.controller('MainController', function($scope,Authenticate){
 	 io.sails.url="http://localhost:1337";
 	// io.sails.connect(io.sails.url);
 	//console.log('Main');
});