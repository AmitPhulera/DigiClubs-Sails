angular.module('DigiClubs.controllers.Clubs', [])

.controller('clubController', function($scope,$http,$location){
	var theapp="http://localhost:1337/";
	$scope.clubs=[];
	$scope.getClubs = function(){
		$http.get(theapp+"roles/list")
			.then(function(response){
				$scope.clubs=response.data;
			},function(err){console.log(err);});
	}
});
	  