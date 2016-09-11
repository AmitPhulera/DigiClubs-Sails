angular.module('DigiClubs.controllers.Profile',[])

.controller('profileController',function($scope,$http,$location,Authenticate){
	if(!Authenticate.get('token'))
	{
		$location.path('/');
		Materialize.toast('Login to Continue',3000)	;
		return;
	}
	var user=Authenticate.getObject('user');
	var theapp='http://localhost:1337/';
	$scope.profile=[];
	$scope.getProfile = function(){
		var data={userId:user.id};
		$http.get(theapp+'users/list?userId='+user.id)
		.then(function(response){
			console.log(response)
			$scope.profile = response.data;

		},function(err){console.log(err);});
	} 
});