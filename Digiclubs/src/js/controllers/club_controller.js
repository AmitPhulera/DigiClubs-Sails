angular.module('DigiClubs.controllers.Clubs', [])

.controller('clubController', function($http,$location,Authenticate){
	if(!Authenticate.get('token')){
      $location.path('/');
      Materialize.toast('Login To Continue!', 3000);
      return;
  }
  var user=Authenticate.getObject('user');
	var theapp="http://localhost:1337/";
	
	var sc=this;
	sc.getClubs = function(){
		$http.get(theapp+"roles/list")
			.then(function(response){
				sc.clubs=response.data;
			},function(err){console.log(err);});
	};
});
	  