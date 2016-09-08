angular.module('DigiClubs.controllers.Posts', [])

.controller('PostsController', function($scope,Authenticate,$location,$http){
	//console.log(Authenticate.auth);
  if(!Authenticate.get('token')){
      $location.path('/');
      Materialize.toast('Login To Continue!', 3000);
      return;
  }
  var user=Authenticate.getObject('user');
  var theapp="http://localhost:1337/";
  io.sails.url="http://localhost:1337";
  io.sails.connect(io.sails.url);
	$scope.post_list=[];
	

 	$scope.fetch_posts=function(){
 		var headers={Authorization:'JWT '+Authenticate.get('token')};
    $http.get(theapp+'posts').then(function(data){
      console.log(data);
      $scope.post_list=data.data;
      //$scope.$apply();
    }
      ,function(error){
        console.log('error');
        console.log(error);
    });
	};
		io.socket.on('connect', function(){
	      io.socket.on('posts',function(msg){
        console.log(msg);
        if(msg.verb=='created'){
          console.log(msg.data)
          $scope.post_list.push(msg.data);
          //console.log($scope.main.post_list);
          $scope.$apply();
        }

      });
	});
 	
});