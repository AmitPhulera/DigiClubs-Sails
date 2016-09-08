angular.module('DigiClubs.controllers.GroupDetails',[])
	.controller('groupDetailsController',function($scope,$http,$location,$routeParams,Authenticate){
		if(!Authenticate.get('token')){
		      $location.path('/');
		      Materialize.toast('Login To Continue!', 3000);
		      return;
		  }
  		var user=Authenticate.getObject('user');
		var theapp="http://localhost:1337/"
		var clubId=$routeParams.club_id;
		$scope.clubPosts=[];
		io.socket.on(clubId,function(msg){
       	  console.log(msg)
          $scope.clubPosts.push(msg);
          //console.log($scope.clubPosts);
          $scope.$apply();
        });

        io.socket.on('comment',function(msg){
       	  console.log(msg)
       	  angular.forEach($scope.clubPosts,function(value,key){
       	  	console.log(value.id)
       	  	if(value.id==msg.post){
       	  		console.log('here')
				value.comments.push(msg);
				$scope.comment='';
       	  	}
       	  });
          $scope.$apply();
        });
		$scope.doComment=function(postId,comment){
			
			//var postId=angular.element().data('id');
			comm={
				data:{
					comment:comment,
					post:postId,
					user:user.id,
					name:user.name
				},
				clubId:clubId
			};
			console.log(comm)
			$http.post(theapp+'comments/saveComment',{data:comm}).then(function(res){
				console.log(res);
			},function(err){
				console.log(err);
			});
			console.log(postId);
		}
		$scope.connect=function(){	//Subscribing user to the club's socket list 
			var id={
				'clubId':clubId
			};
			console.log(id);
			io.socket.get(theapp+'users/subscribe',id,function(err,data){
				if(err){
					Materialize.toast('Error While Connecting!!', 3000);
					$location.path('/');
				}else{
					console.log('User subscribed for the club');
				}
				$http.get(theapp+'clubs/listDetails/?clubId='+clubId+'&userId='+user.id).then(function(response){
					
						console.log(response.data);
						//$scope.clubPosts=response.data;
					}
				);
			});
			$http.get(theapp+'posts/listClubPosts/?clubId='+clubId).then(function(response){
					
						console.log(response.data);
						$scope.clubPosts=response.data;
					}
			);
			

		};
		$scope.insertPost=function(){
			
			var data={
					'data':{
						'post':$scope.post_content,
						'postedIn':clubId,
						'user':user.id,
						'privacy':'public'//ToDO privacy to be changed
					}
			};
			
			io.socket.post(theapp+'posts/savePost',data,function(err,response){
						if(err){
							console.log('err');
							console.log(err)
						}
						else{
							$scope.post_content="";
							console.log(response);

							//$scope.groupPosts.push(response.data);
							//$scope.$apply();
						}
					});
		}
	});