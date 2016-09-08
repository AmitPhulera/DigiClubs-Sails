angular.module('DigiClubs.controllers.Login', [])

.controller('loginController', function($scope,$http,$location,Authenticate){
	  //console.log($window.auth)
	  var theapp="http://localhost:1337/";
	  var user={};
	  if(Authenticate.get('token'))
	  {
	  	user=Authenticate.getObject('user');
	  	console.log(user);
	  	Materialize.toast('Hello '+user.name , 3000);
	  	$location.path('/posts');
	  	return;
	  }
	  // LOGIN Function
	  $scope.try_login=function(){
		console.log($scope.login)
		$http.post(theapp+'auth/signin',$scope.login)
			.then( function a(response) {
	         	console.log('success') ;             
	         	console.log(response);
		         var auth={
		         		user:response.data.user,
		         		token:response.data.token
		         };
		         Materialize.toast('Logging In', 2000);
		         Authenticate.set('token',response.data.token);
		         Authenticate.setObject('user',response.data.user);
		         $location.path('/posts');
		         
	    	},  
	    	function b(response) {
	     		Materialize.toast(response.statusText, 4000);
	            console.log(response)
	     });
    }
});