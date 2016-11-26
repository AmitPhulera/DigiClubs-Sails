angular.module('DigiClubs.controllers.GroupDetails', [])
    .controller('groupDetailsController', function($scope, $http, $location, $routeParams, Authenticate, Server) {

        /****************************************************************
                Authentication Wali BAketi !!!
        *****************************************************************/
        if (!Authenticate.get('token')) {
            $location.path('/');
            Materialize.toast('Login To Continue!', 3000);
            return;
        }
        /*****************************************************************/

        var clubId = $routeParams.club_id;

        /****************************************************************
        Master Object 'sc' use this to acess elements in every controller
        *****************************************************************/
        var sc = this;
        /*****************************************************************/

        /****************************************************************
                    Sokcet Connection Shit
        *****************************************************************/
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
        //looking for new posts and appending to the post array
        io.socket.on(clubId, function(msg) {
            console.log(msg);
            sc.clubPosts.push(msg);
            $scope.$apply();

        });
        //looking for new comments and appending to respective posts
        io.socket.on('comment', function(msg) {
            console.log(msg);

            angular.forEach(sc.clubPosts, function(value, key) {
                if (value.id == msg.post) {
                    console.log('here');
                    value.comments.push(msg);
                    $scope.$apply();

                }
            });

        });

        io.socket.on('posts', function(msg) {
            console.log(msg);
            if (msg.verb == 'created') {
                console.log(msg.data);
                sc.post_list.push(msg.data);
                //console.log($scope.main.post_list);
                $scope.$apply();
            }
        });
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
        var stream = ['CS', 'ECE', 'Mechanical', 'All'];
        sc.clubLead = "";
        sc.clubPosts = [];
        sc.nameListShow=1;
        sc.doComment = function(comment, index, postId, privacy) {
            comm = {
                data: {
                    comment: comment,
                    post: postId,
                    user: user.id,
                    name: user.name
                },
                club: clubId,
                privacy: privacy
            };

            $http.post(theapp + 'comments/saveComment', { data: comm }).then(function(res) {
                console.log(res);
                sc.comment[index] = '';
            }, function(err) {
                console.log(err);
            });
            console.log(postId);
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
                    sc.post_content = '';
                    $('#post_insert').val('');
                    console.log("ye dekho " + sc.post_content);
                }
            });
        };
        sc.addEvent = function() {

            branch = [];
            for (i = 0; i <= stream.length; i++) {
                if (sc.branch[i])
                    branch.push(stream[i]);
            }
            sc.event.branch = branch;
            sc.clubs = clubId;
            console.log(sc.event);
            $http.post(theapp + 'events/create', sc.event)
                .then(function(res) {
                    aterialize.toast(sc.event.name + 'added as new event.', 3000);
                    console.log('success');
                    console.log(res);
                }, function(err) {
                    console.log(err);
                });
        };
        sc.addClub = function() {
            branch = [];
            for (i = 0; i <= stream.length; i++) {
                if (sc.Cbranch[i])
                    branch.push(stream[i]);
            }
            sc.club.branches = branch;
            sc.club.lead=sc.clubLead_id;
            $http.post(theapp + 'clubs/add', sc.club)
                .then(function(res) {
                    Materialize.toast(sc.club.name + 'added as new club', 3000);
                    console.log('success');
                    console.log(res);
                }, function(err) {
                    console.log(err);
                });
        };
        sc.assign=function(id,name){
            sc.clubLead_id=id;
            sc.clubLead=name;
            sc.nameListShow=0;
        };
        sc.listNames = function() {
            var auto=[];
            console.log('check it out');
            $http.post(theapp + 'users/search', { name: sc.clubLead })
                .then(function(res) {
                    sc.nameList=res.data;
                    sc.nameListShow=1;
                    console.log('success');
                    console.log(res);
                }, function(err) {
                    console.log(err);
                });

        };

    });
