angular.module('DigiClubs.controllers.GroupDetails',[])
	.controller('groupDetailsController',function($scope,$http,$location,$routeParams){
		var theapp="http://localhost:1337/"
		var clubId=$routeParams.club_id;
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
				$http.get(theapp+'clubs/listDetails/?clubId='+clubId,function(err,data){
					if(err)
						console.log(err);
					else
						console.log(data);
				});
			});
			

		}
	});