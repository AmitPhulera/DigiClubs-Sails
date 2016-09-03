angular.module('DigiClubs.controllers.Login', [])

.controller('loginController', function($scope,$http,$location,Authenticate){
	  //console.log($window.auth)
	  var theapp="http://localhost:1337/";
	  if(localStorage.getItem('token'))
	  {
	  	var user=JSON.parse(localStorage.getItem('user'));
	  	Materialize.toast('Hello '+user.username , 3000);
	  	$location.path('/posts');
	  	return;
	  }
	  // LOGIN Function
	  $scope.try_login=function(){
		  		console.log($scope.login)
		  		
		     	$http.post(theapp+'auth/signin',$scope.login).then( function a(response) {
			         console.log('success') ;             
			         console.log(response);
			         var auth={
			         		user:response.data.user,
			         		token:response.data.token
			         	};
			         Materialize.toast('Logging In', 2000);
			         localStorage.setItem('user',JSON.stringify(response.data.user));
			         localStorage.setItem('token',response.data.token);
			         $location.path('/posts');
			         //if(typeof(Storage) !== 'undefined'){
			         	
			         	
			         	
			         	//Authenticate.setInfo(auth);
			         	//io.sails.headers={Authorization:'JWT '+response.data.token};
			         	
			         // }else{
			         // 	// TODO HAVE TO FILL IT UP FOR COOKIE
			         // }
			     },  function b(response) {
			     		Materialize.toast(response.statusText, 4000);
			              console.log(response)
			     });
		    }
});