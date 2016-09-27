angular.module('DigiClubs.controllers.GroupDetails', [])
    .controller('groupDetailsController', function($scope,$http, $location, $routeParams, Authenticate,Server) {

        /****************************************************************
                Authentication Wali BAketi !!!
    	*****************************************************************/
        if (!Authenticate.get('token')) {
            $location.path('/');
            Materialize.toast('Login To Continue!', 3000);
            return;
        }
        /*****************************************************************/


        /****************************************************************
        Master Object 'sc' use this to acess elements in every controller
        *****************************************************************/
        var sc = this;
        /*****************************************************************/


        /******************************************************************************
        Object 'user'. Use 'theapp' for api calls to server,returns address to server
        *******************************************************************************/
        var theapp = Server;
        /*****************************************************************************/

        /***********************************************************************
        User Object 'user'. Use this to acess user info in every controller
        ***********************************************************************/
        var user = Authenticate.getObject('user');
        /*****************************************************************/
        
        sc.comment = [];
        
        var clubId = $routeParams.club_id;
        sc.clubPosts = [];
        io.socket.on(clubId, function(msg) {
            console.log(msg);
            sc.clubPosts.push(msg);
            $scope.$apply();

        });

        io.socket.on('comment', function(msg) {
            console.log(msg);
            angular.forEach(sc.clubPosts, function(value, key) {
                if (value.id == msg.post) {
                    console.log('here');
                    value.comments.push(msg);
                    
                }
            });
            
        });
        sc.doComment = function(postId, comment, index) {
			comm = {
                data: {
                    comment: comment,
                    post: postId,
                    user: user.id,
                    name: user.name
                },
                clubId: clubId
            };
            
            $http.post(theapp + 'comments/saveComment', { data: comm }).then(function(res) {
                console.log(res);
                sc.comment[index] = '';
            }, function(err) {
                console.log(err);
            });
            console.log(postId);
        };
        sc.connect = function() { //Subscribing user to the club's socket list 
            var id = {
                'clubId': clubId
            };
            console.log(id);
            io.socket.get(theapp + 'users/subscribe', id, function(err, data) {
                if (err) {
                    Materialize.toast('Error While Connecting!!', 3000);
                    $location.path('/');
                } else {
                    console.log('User subscribed for the club');
                }
                $http.get(theapp + 'clubs/listDetails/?clubId=' + clubId + '&userId=' + user.id).then(function(response) {

                    console.log(response.data);
                    //sc.clubPosts=response.data;
                });
            });
            $http.get(theapp + 'posts/listClubPosts/?clubId=' + clubId).then(function(response) {

                console.log(response.data);
                sc.clubPosts = response.data;
            });


        };
        sc.insertPost = function() {

            var data = {
                'data': {
                    'post': sc.post_content,
                    'postedIn': clubId,
                    'user': user.id,
                    'privacy': 'public' //ToDO privacy to be changed
                }
            };

            io.socket.post(theapp + 'posts/savePost', data, function(err, response) {
                if (err) {
                    console.log('err');
                    console.log(err);
                } else {
                    sc.post_content ='';
                    $('#post_insert').val('');
                    console.log("ye dekho "+sc.post_content);
				}
            });
        };
    });
